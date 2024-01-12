import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from '@/utils/firebase'
import { Inter } from "next/font/google"
import Features from '@/components/Features'
import FeaturedOn from '@/components/FeaturedOn'
import Pricing from '@/components/Pricing'
import FinalCTA from "@/components/FinalCTA"
import Hero from '@/components/Hero'

const inter = Inter({ subsets: ["latin"]})

export default function Home() {
  const [user, setUser] = useState({})

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } 
    })    
  }, [])

  return (
    <>
      <Head>
      </Head>
      <main className={`${inter.className} bg-[#212121]`} >
        <Header user={user} />
        {/*Hero*/}
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
