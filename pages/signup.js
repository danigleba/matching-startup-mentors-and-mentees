import { Inter } from 'next/font/google'
import { auth } from '@/utils/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    const googleProvider = new GoogleAuthProvider()

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider)
            const url = "/api/auth/signup?profile_url=" + auth.currentUser.photoURL + "&email=" + auth.currentUser.email + "&username=" + auth.currentUser.displayName
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await response.json()
            if (data.studentCreated == true) {
                router.push("/book")
            }
          } catch (error) {
                console.error("Google login error:", error);
          }    
    }
    return (
        <main className="mx-6">
            <h2>Crea tu cuenta</h2>
                <div className="flex-1 flex flex-col items-center pt-2">
                    <button onClick={handleGoogleSignIn} className="px-4 py-2 bg-white shadow-md flex items-center justify-center rounded-xl py-2 text-[#333533] font-bold">
                        Usar mi cuenta de Google
                    </button>
                </div>
        </main>
    )
}