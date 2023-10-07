import Image from 'next/image'
import { useEffect } from 'react'
import { auth } from '@/utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/router'

export default function Header(props) {
    const router = useRouter()
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (!user) {
            router.push("/login")
          } 
        })    
      }, [])
    return (
        <main className="my-4 h-max flex justify-between items-center px-8">
            <div>
                <p className='font-bold text-xl'>cornelio</p>
            </div>
            <div className="flex items-center gap-4">
                <div>
                    <p className="font-bold text-lg">{props?.user?.displayName}</p>
                </div>
                <Image className='rounded-full' alt="Tutor's profile picture" height={50} width={50} src={props?.user?.photoURL}/>
            </div>
        </main>
    )
}