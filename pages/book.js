import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import { useState, useEffect } from 'react'
import {onAuthStateChanged} from "firebase/auth"
import {auth} from '@/utils/firebase'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { stripe } from "@stripe/stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from '@/components/CheckoutForm'

const inter = Inter({ subsets: ['latin'] })
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function Home() {
    const router = useRouter()
    const [state, setState] = useState("Find tutor")
    const [user, setUser] = useState({})
    const [tutor, setTutor] = useState("")
    const [matchTutor, setMatchTutor] = useState({})
    const [paidCalsses, setPaidClasses] = useState()
    const [price, setPrice] = useState(0)
    const [nClasses, setNClasses] = useState()
    const [clientSecret, setClientSecret] = useState()
    const [allowBooking, setAllowBooking] = useState(false)

    //Class booking 
    const [day, setDay] = useState("")
    const [time, setTime] = useState("")
    const [recurring, setRecurring] = useState(false)
    const [nRecurring, setNRecurring] = useState(0)

    //Booking classes
    const findTutor = async () => {
        const url = "/api/classes/find_tutor?tutor=" + tutor   
        fetch(url)
            .then(response => response.json())
            .then(data => setMatchTutor(data.data[0]))    
    }

    const addTutor = async () => {
        const url = "/api/classes/add_tutor?matchTutor=" + matchTutor.email + "&email=" + user?.email
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        
        const url2 = "/api/classes/get_paid_classes?tutor_email=" + matchTutor?.email + "&student_email=" + user?.email
        fetch(url2)
            .then(response => response.json())
            .then(data => setPaidClasses(data.data))
    }

    const bookClasses = async () => {
        if (day != "" && time != "") {
            const url = "/api/classes/add_classes?tutor_email=" + matchTutor?.email + "&student_email=" + user?.email + "&time=" + time + "&profile_url=" + user?.profile_url  + "&day=" + day + "&recurring=" + recurring + "&nRecurring=" + nRecurring
            fetch(url)
                .then(response => response.json())
                .then(data => setPaidClasses(data.data))

            const url2 = "/api/classes/delete_paid_classes?tutor_email=" + matchTutor?.email + "&student_email=" + user?.email + "&nBooked=" + nRecurring + "&recurring=" + recurring
            fetch(url2)
                .then(response => response.json())
                .then(data => setPaidClasses(data.data)) 
        }

    }

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
            const url = "/api/auth/getStudent?email=" + auth.currentUser.email
            fetch(url)
                .then(response => response.json())
                .then(data => setUser(data.data))     
        } 
      })    
    }, [])

    useEffect(() => {
        findTutor()
      }, [tutor])

      useEffect(() => {
        if (price == (1*matchTutor?.prices?.one_class * 100)) {
            setNClasses(1)
        } else if (price == (10*matchTutor?.prices?.ten_classes * 100)) {
            setNClasses(10)
        } else if (price == (20*matchTutor?.prices?.twenty_classes * 100)) {
            setNClasses(20)
        }
    }, [price])

    useEffect(() => {
        if (paidCalsses > 0) {
            setState("Find spot")
        } else if (paidCalsses == 0) {
            setState("Buy classes")
        }
    }, [paidCalsses])
      
    //Buying classes
    const createPaymentIntent = async () => {
        if (price > 0) {
            const stripe = await stripePromise

            const url = "/api/stripe/create-payment-intent?tutor_email=" + matchTutor?.email + "&student_email" + user?.email + "&price=" + price
            const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                }
            })
            const data = await response.json()
            setClientSecret(data.clientSecret)
        }   
    }

    useEffect(() => {
        if (nRecurring < 2) {
            setNRecurring(2)
        }
        if (nRecurring > paidCalsses) {
            setNRecurring(paidCalsses)
        }
     }, [nRecurring])

     const checlAvailability = async () => {
        const url = "/api/classes/check_availability?day=" + day + "&time=" + time
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        if (data.isAvailable == false) {
            setAllowBooking(false)
        }
    }

     useEffect(() => {
        checlAvailability()
     }, [day, time])


    const tryCalendarAPI = async () => {
        const idToken = await auth.currentUser.getIdToken();
        const url = "/api/classes/add_event?tutor_email=" + matchTutor?.email + "&student_email=" + user?.email 
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`, 
            },
            body: JSON.stringify(auth.currentUser),
        })
        const data = await response.json()
    }
   return (
    <main>
        <Header user={auth.currentUser}/>
        {state == "Find tutor" ? (
             <div className="flex flex-col">
                <label className="block mb-2 text-sm font-medium">Con quién quieres hacer clases</label>
                <input onChange={(e) => setTutor(e.target.value)} placeholder="Nombre Apellido" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5"/>
                {matchTutor ? (
                    <button onClick={addTutor} className='p-8 bg-white shadow-md'>
                        <div className="flex items-center gap-4 justify-center">
                            <div>
                                <p className="font-bold text-lg">{matchTutor?.username}</p>
                            </div>
                            <Image className='rounded-full' alt="Tutor's profile picture" height={50} width={50} src={matchTutor?.profile_url}/>
                        </div>
                    </button>
                ) : (<></>)}
            </div>
        ) : (<></>)}
        {state == "Find spot" ? (
            <div className='flex flex-cols gap-12'>
                <p className='font-bold text-xl bg-12'>Tienes {paidCalsses} pagadas con {matchTutor.username}</p>
                <input onChange={(e) => setDay(e.target.value)} type="date"></input>
                <input onChange={(e) => setTime(e.target.value)} type="time"></input>
                <p>Cada semana?</p>
                <input onChange={(e) => setRecurring(!recurring)} type="checkbox"></input>
                {recurring ? (
                    <div>
                        <p>cuantas clases quieres reservar</p>
                        <input onChange={(e) => setNRecurring(e.target.value)} max={paidCalsses} placeholder={2} min={2} type="number"></input>
                    </div>
                ) : (<></>)}
                <button onClick={bookClasses} className='p-3 bg-blue-200'>Reservar classes</button>
                </div>
                ) : (<></>)}
        {state == "Buy classes" ? (
            <div>
                <p>No te quedan clases con {matchTutor.username}, comprar más para reservar clases</p>
                <div>
                    <button className='px-4 py-2 bg-red-200 rounded' onClick={() => setPrice(1*matchTutor.prices.one_class * 100)} type="submit">Checkout 1 class</button>
                    <button className='px-4 py-2 bg-blue-200 rounded' onClick={() => setPrice(10*matchTutor.prices.ten_classes * 100)} type="submit">Checkout 10 classes</button>
                    <button className='px-4 py-2 bg-green-200 rounded' onClick={() => setPrice(20*matchTutor.prices.twenty_classes * 100)} type="submit">Checkout 20 class</button>

                </div>
                <button onClick={createPaymentIntent}>Chektou</button>

                <Elements stripe={stripePromise}>
                    <CheckoutForm nClasses={nClasses} clientSecret={clientSecret} student_email={user?.email} tutor_email={matchTutor?.email} />
                </Elements>
             </div>
        ) : (<></>)}
        <div className='pt-40'>
            <button onClick={tryCalendarAPI} className='bg-red-200'>Try Calendar API</button>
        </div>
    </main>
  )
}
