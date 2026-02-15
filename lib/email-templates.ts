import { formatCurrency } from "@/lib/utils"

interface OrderDetails {
  orderId: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: {
      street: string
      apartment?: string
      city: string
      state: string
      zipCode: string
      country: string
    }
  }
  items: {
    productName: string
    variantName: string
    quantity: number
    price: number
    total: number
  }[]
  subtotal: number
  discountAmount: number
  discountLabel: string
  shipping: number
  tax: number
  total: number
  paymentMethod: string
  paymentInstructions?: any
  note?: string
}

// ==========================================
// 1. ADMIN EMAIL (DESIGN FACTURE PRO)
// ==========================================
export function generateAdminEmail(data: OrderDetails) {
  const { 
    orderId, customer, items, total, subtotal, 
    discountAmount, discountLabel, shipping, tax, 
    paymentMethod, note, paymentInstructions 
  } = data

  // Couleur du badge selon le paiement
  const paymentColor = paymentMethod === 'crypto' ? '#166534' : '#1e40af';
  const paymentBg = paymentMethod === 'crypto' ? '#dcfce7' : '#dbeafe';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .header { background-color: #1a1a1a; color: #ffffff; padding: 30px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 300; letter-spacing: 1px; }
        .header p { margin: 5px 0 0; color: #888; font-size: 14px; }
        
        .content { padding: 30px; }
        
        .info-grid { display: table; width: 100%; margin-bottom: 30px; }
        .info-col { display: table-cell; width: 50%; vertical-align: top; }
        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 5px; font-weight: bold; }
        .value { font-size: 14px; color: #333; line-height: 1.5; }
        
        .badge { display: inline-block; background-color: ${paymentBg}; color: ${paymentColor}; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th { text-align: left; padding: 12px; border-bottom: 2px solid #eee; color: #888; font-size: 12px; text-transform: uppercase; }
        td { padding: 12px; border-bottom: 1px solid #eee; vertical-align: top; }
        .text-right { text-align: right; }
        .item-name { font-weight: bold; color: #333; }
        .item-variant { font-size: 12px; color: #666; }
        
        .totals { width: 100%; }
        .totals td { border: none; padding: 5px 12px; }
        .total-final td { border-top: 2px solid #333; padding-top: 15px; padding-bottom: 0; font-size: 18px; font-weight: bold; color: #000; }
        
        .note-box { background: #fff8dc; border-left: 4px solid #f5c71a; padding: 15px; margin-bottom: 30px; font-size: 14px; }
        
        .footer { background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eee; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- HEADER -->
        <div class="header">
          <h1>NEW ORDER RECEIVED</h1>
          <p>Order Reference: #${orderId}</p>
        </div>

        <div class="content">
          
          <!-- INFO GRID -->
          <div class="info-grid">
            <div class="info-col">
              <div class="label">Customer Details</div>
              <div class="value">
                <strong>${customer.firstName} ${customer.lastName}</strong><br>
                ${customer.email}<br>
                ${customer.phone}
              </div>
              <br>
              <div class="label">Billing / Shipping</div>
              <div class="value">
                ${customer.address.street} ${customer.address.apartment || ''}<br>
                ${customer.address.city}, ${customer.address.state} ${customer.address.zipCode}<br>
                ${customer.address.country}
              </div>
            </div>
            <div class="info-col" style="text-align: right;">
              <div class="label">Payment Method</div>
              <div style="margin-bottom: 10px;">
                <span class="badge">${paymentMethod.toUpperCase().replace('_', ' ')}</span>
              </div>
              <div class="label">Date</div>
              <div class="value">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
            </div>
          </div>

          <!-- NOTE -->
          ${note ? `
            <div class="note-box">
              <strong>📝 Customer Note:</strong><br>
              ${note}
            </div>
          ` : ''}

          <!-- ITEMS TABLE -->
          <table>
            <thead>
              <tr>
                <th width="50%">Item Description</th>
                <th width="15%" class="text-right">Price</th>
                <th width="10%" class="text-right">Qty</th>
                <th width="25%" class="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>
                    <div class="item-name">${item.productName}</div>
                    <div class="item-variant">${item.variantName}</div>
                  </td>
                  <td class="text-right">${formatCurrency(item.price)}</td>
                  <td class="text-right">${item.quantity}</td>
                  <td class="text-right"><strong>${formatCurrency(item.total)}</strong></td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- TOTALS -->
          <table class="totals">
            <tr>
              <td class="text-right" width="75%">Subtotal</td>
              <td class="text-right" width="25%">${formatCurrency(subtotal)}</td>
            </tr>
            
            ${discountAmount > 0 ? `
            <tr>
              <td class="text-right" style="color: #166534;">${discountLabel}</td>
              <td class="text-right" style="color: #166534;">-${formatCurrency(discountAmount)}</td>
            </tr>
            ` : ''}
            
            <tr>
              <td class="text-right">Shipping</td>
              <td class="text-right">${shipping === 0 ? 'Free' : formatCurrency(shipping)}</td>
            </tr>
            <tr>
              <td class="text-right">Tax (Est.)</td>
              <td class="text-right">${formatCurrency(tax)}</td>
            </tr>
            <tr class="total-final">
              <td class="text-right">TOTAL</td>
              <td class="text-right">${formatCurrency(total)}</td>
            </tr>
          </table>

        </div>
        
        <div class="footer">
          System generated email. Verify payment before shipping.
        </div>
      </div>
    </body>
    </html>
  `
}

// ==========================================
// 2. CUSTOMER EMAIL (Gardé simple et propre)
// ==========================================
export function generateCustomerEmail(data: OrderDetails) {
  const { orderId, items, total, paymentMethod, paymentInstructions, subtotal, shipping, tax, discountAmount, discountLabel } = data

  let messageBlock = ""

  if (paymentMethod === 'crypto' && paymentInstructions?.address) {
    messageBlock = `
      <div style="background-color: #f0fdf4; border: 1px solid #166534; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #166534; margin-top:0;">Crypto Payment Required</h3>
        <p>Please send exactly <strong>${formatCurrency(total)}</strong> in <strong>${paymentInstructions.coin}</strong> to:</p>
        <div style="background: #fff; padding: 15px; font-weight: bold; text-align: center; border: 1px dashed #166534; word-break: break-all;">
          ${paymentInstructions.address}
        </div>
      </div>
    `
  } else {
    messageBlock = `
      <div style="background-color: #eff6ff; border: 1px solid #1e40af; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1e40af; margin-top:0;">Order Received - Pending Payment</h3>
        <p>You have selected to pay via <strong>${paymentMethod.toUpperCase().replace('_', ' ')}</strong>.</p>
        <p>An agent will contact you shortly via <strong>Email or WhatsApp</strong> to provide the secure payment details and finalize your order.</p>
      </div>
    `
  }

  return `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto;">
      <h1 style="text-align:center;">Thank you for your order!</h1>
      <p style="text-align:center; font-size: 16px; color: #666;">Order #${orderId}</p>
      
      ${messageBlock}

      <div style="background: #fafafa; padding: 20px; border-radius: 8px; margin-top:20px;">
        <h3 style="margin-top:0; border-bottom:1px solid #ddd; padding-bottom:10px;">Order Summary</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${items.map(item => `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                <strong>${item.productName}</strong><br/>
                <small style="color:#666">${item.variantName}</small>
              </td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">
                ${formatCurrency(item.total)}
              </td>
            </tr>
          `).join('')}
        </table>

        <div style="text-align: right; margin-top: 20px;">
          <p style="margin: 5px 0;">Subtotal: ${formatCurrency(subtotal)}</p>
          ${discountAmount > 0 ? `<p style="margin: 5px 0; color: green;">${discountLabel}: -${formatCurrency(discountAmount)}</p>` : ''}
          <p style="margin: 5px 0;">Shipping: ${formatCurrency(shipping)}</p>
          <p style="margin: 5px 0;">Tax: ${formatCurrency(tax)}</p>
          <h3 style="margin: 10px 0; border-top: 1px solid #ddd; padding-top: 10px;">Total: ${formatCurrency(total)}</h3>
        </div>
      </div>
    </div>
  `
}