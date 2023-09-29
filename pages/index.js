import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'
import {onAuthStateChanged} from "firebase/auth"
import {auth} from '@/utils/firebase'

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
      students
    </main>
  )
}
