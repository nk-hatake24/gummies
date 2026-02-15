import { NextResponse } from "next/server"
import { siteConfig, CRYPTO_WALLETS } from "@/config/site.config"
import { generateAdminEmail, generateCustomerEmail } from "@/lib/email-templates"
import { Resend } from 'resend'
import { client } from "@/sanity/lib/client"

const resend = new Resend(process.env.RESEND_API_KEY)

function generateOrderNumber() {
  return `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random()*1000)}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customer, items, paymentMethod, paymentDetails, note } = body

    // 1. Récupération des produits depuis Sanity
    // On extrait tous les IDs possibles
    const productIds = items.map((item: any) => item.productId || item.id || item._id).filter(Boolean)
    
    // On fetch les vrais produits
    const sanityProducts = await client.fetch(
      `*[_type == "product" && _id in $ids]{
        _id,
        name,
        variants
      }`,
      { ids: productIds }
    )

    let subtotal = 0
    const orderItems: any[] = []

    // 2. BOUCLE HYBRIDE (Sanity + Fallback Frontend)
    for (const item of items) {
      // On cherche dans Sanity
      const targetId = item.productId || item.id || item._id
      const realProduct = sanityProducts.find((p: any) => p._id === targetId)
      
      let finalPrice = 0
      let productName = item.product?.name || "Unknown Product"
      let variantName = item.variant?.name || "Standard"

      if (realProduct) {
        // Produit trouvé, on cherche le vrai prix
        const realVariant = realProduct.variants?.find((v: any) => 
           v.id === item.variantId || v._key === item.variantId || v.id === item.variant?.id
        )

        if (realVariant) {
             finalPrice = realVariant.price
             variantName = realVariant.name
             productName = realProduct.name
        } else {
             // Variante introuvable -> Fallback Frontend
             
             

             
             finalPrice = item.price || item.variant?.price || 0
        }
      } else {
        // Produit introuvable dans Sanity -> Fallback Frontend
        console.warn("Produit introuvable dans DB, utilisation prix frontend")
        finalPrice = item.price || item.variant?.price || 0
        
        if (item.product) productName = item.product.name
        if (item.variant) variantName = item.variant.name
      }

      // Sécurité ultime pour éviter le $0.00
      if (finalPrice === 0 && item.price) finalPrice = item.price

      const lineTotal = finalPrice * item.quantity
      subtotal += lineTotal

      orderItems.push({
        productName,
        variantName,
        quantity: item.quantity,
        price: finalPrice,
        total: lineTotal
      })
    }

    // 3. CALCULS
    let discountAmount = 0
    let discountLabel = ""

    if (paymentMethod === "crypto") {
        discountAmount = subtotal * (siteConfig.crypto.discountPercent / 100)
        discountLabel = `Crypto (-${siteConfig.crypto.discountPercent}%)`
    } else if (paymentMethod === "revolut") {
        discountAmount = subtotal * (siteConfig.revolut.discountPercent / 100)
        discountLabel = `Revolut (-${siteConfig.revolut.discountPercent}%)`
    }

    const shipping = subtotal >= siteConfig.shipping.freeShippingThreshold ? 0 : siteConfig.shipping.standardRate
    const taxableAmount = Math.max(0, subtotal - discountAmount)
    const tax = taxableAmount * siteConfig.taxRate
    const total = taxableAmount + shipping + tax
    const orderNumber = generateOrderNumber()

    // 4. Instructions de Paiement (Seulement Crypto)
    let paymentInstructions: any = null
    if (paymentMethod === 'crypto' && paymentDetails?.cryptoCurrency) {
        const coinKey = paymentDetails.cryptoCurrency as keyof typeof CRYPTO_WALLETS
        paymentInstructions = {
            type: 'crypto',
            coin: coinKey.toUpperCase(),
            address: CRYPTO_WALLETS[coinKey],
        }
    } 

    // 5. Structure Email Data
    const emailData = {
        orderId: orderNumber,
        customer: {
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            address: {
                street: customer.address.street,
                apartment: customer.address.apartment || "",
                city: customer.address.city,
                state: customer.address.state,
                zipCode: customer.address.zipCode,
                country: customer.address.country || "US"
            }
        },
        items: orderItems,
        subtotal,
        discountAmount,
        discountLabel,
        shipping,
        tax,
        total,
        paymentMethod,
        paymentInstructions,
        note: note || ""
    }

    // 6. Envoi
    await resend.emails.send({
      from: 'Bulk Vapes <orders@resend.dev>',
      to: 'bulkvapes47@gmail.com',
      subject: `[New Order] ${orderNumber} - ${paymentMethod.toUpperCase()}`,
      html: generateAdminEmail(emailData)
    });

    await resend.emails.send({
      from: 'Bulk Vapes <orders@resend.dev>',
      to: 'bulkvapes47@gmail.com', // En prod : customer.email
      subject: `Order Confirmation ${orderNumber}`,
      html: generateCustomerEmail(emailData)
    });

    return NextResponse.json({ success: true, orderNumber }, { status: 201 })

  } catch (error) {
    console.error("API ERROR:", error)
    return NextResponse.json({ error: "Server Error" }, { status: 500 })
  }
}