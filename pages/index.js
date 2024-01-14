import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Inter } from "next/font/google"
import Features from '@/components/Features'
import FeaturedOn from '@/components/FeaturedOn'
import Pricing from '@/components/Pricing'
import FinalCTA from "@/components/FinalCTA"
import Hero from '@/components/Hero'
import { useEffect } from 'react'

const inter = Inter({ subsets: ["latin"]})

export default function Home() {
  return (
    <>
      <Head>
      </Head>
      <main className={`${inter.className} bg-[#212121]`} >
        <Header/>
        <Hero />     
        <FeaturedOn />
        <Features />  
        <Pricing /> 
        <FinalCTA />
        <Footer />
      </main>
    </>
  )
}
