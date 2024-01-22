import Head from "next/head"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Features from "@/components/Features"
import FeaturedOn from "@/components/FeaturedOn"
import Pricing from "@/components/Pricing"
import FinalCTA from "@/components/FinalCTA"
import Hero from "@/components/Hero"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"]})

export default function Index() {
  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Every successful entrepreneur had a mentor to show them the path. Get mentored by other entrepreneurs making $10k+ MRR and take your Startup to the next level."/>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Plato | Get your Startup to $10k MRR ASAP" />
        <meta property="og:description" content="YEvery successful entrepreneur had a mentor to show them the path. Get mentored by other entrepreneurs making $10k+ MRR and take your Startup to the next level." />
        <meta property="og:image" content="/icon.png" />
        <meta property="og:url" content="plato.danigleba.com" />
        <meta property="og:type" content="website" />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Plato | Get your Startup to $10k MRR ASAP" />
        <meta name="twitter:description" content="Every successful entrepreneur had a mentor to show them the path. Get mentored by other entrepreneurs making $10k+ MRR and take your Startup to the next level." />
        <meta name="twitter:image" content="/icon.png" />
        {/* Favicon */}
        <link rel="icon" href="/icon.png" />
        {/* Page Title */}
        <title>Plato | Get your Startup to $10k MRR ASAP</title>
      </Head>
      <main className={`${inter.className}`} >
        <Header/>
        <Hero />     
        <FeaturedOn />
        <Features />  
        <FinalCTA />
        <Footer />
      </main>
    </>
  )
}
