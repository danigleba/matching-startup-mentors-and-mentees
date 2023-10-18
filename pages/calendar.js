import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useEffect } from 'react'
import {onAuthStateChanged} from "firebase/auth"
import {auth} from '@/utils/firebase'
import Calendar from '@/components/Calendar'
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
      <Calendar user={user}/>
      <BottomNavBar page={"calendar"}/>
      <Footer />
    </main>
  )
}
