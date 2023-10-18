import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import {onAuthStateChanged} from "firebase/auth"
import {auth} from '@/utils/firebase'
import NextClasses from '@/components/NextClasses'
import Files from '@/components/Files'
import BottomNavBar from '@/components/BottomNavBar'

const inter = Inter({ subsets: ['latin'] })

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
    <main>
      <Header user={user} />
      <NextClasses user={user}/>
      <div className='my-16'></div>
      <Files user={user} />
      <BottomNavBar page={"index"} />
      <Footer />
    </main>
  )
}
