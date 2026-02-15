import { Wallet, CreditCard, PlayCircle, LucideIcon } from "lucide-react"

export interface PlatformItem {
  id: string
  name: string
  description: string
  url: string
  icon: LucideIcon
  buttonLabel: string
}

export interface TutorialItem {
  id: string
  title: string
  description: string
  url: string // Lien vers la vidéo ou la page
  buttonLabel: string
}

export const cryptoPlatforms: PlatformItem[] = [
  {
    id: "finchpay",
    name: "FinchPay",
    description: "Buy and Sell Cryptocurrency for Fiat with Ease. Simple interface for beginners.",
    url: "https://finchpay.io",
    icon: Wallet,
    buttonLabel: "Get Started",
  },
  {
    id: "guardarian",
    name: "Guardarian",
    description: "Buy, Sell, and Swap crypto with Fiat On/Off Ramp & Best rates in the market.",
    url: "https://guardarian.com",
    icon: CreditCard,
    buttonLabel: "Get Started",
  },
]

export const cryptoTutorials: TutorialItem[] = [
  {
    id: "cashapp",
    title: "How to Buy Crypto on CashApp",
    description: "Learn how to purchase Bitcoin and other cryptocurrencies using CashApp",
    url: "https://youtu.be/v8mbVa__sWA", // Remplace par ton lien réel
    buttonLabel: "Watch Tutorial",
  },
  {
    id: "revolut",
    title: "How to Buy Crypto on Revolut",
    description: "Complete guide to buying cryptocurrency through your Revolut account",
    url: "https://www.youtube.com/watch?app=desktop&v=luZv1aQtcCU", // Remplace par ton lien réel
    buttonLabel: "Watch Tutorial",
  },
]