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
import Footer from '@/components/Footer'
import BottomNavBar from '@/components/BottomNavBar'
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
        if (allowBooking) {
            if (day != "" && time != "") {
                const url = "/api/classes/add_classes?tutor_email=" + matchTutor?.email + "&tutor_profile=" + matchTutor?.profile_url + "&tutor_username=" + matchTutor?.username + "&student_email=" + user?.email  + "&student_username=" + user?.username + "&time=" + time + "&profile_url=" + user?.profile_url  + "&day=" + day + "&recurring=" + recurring + "&nRecurring=" + nRecurring
                fetch(url)
                    .then(response => response.json())
                    .then(data => setPaidClasses(data.data))

                const url2 = "/api/classes/delete_paid_classes?tutor_email=" + matchTutor?.email + "&student_email=" + user?.email + "&nBooked=" + nRecurring + "&recurring=" + recurring
                fetch(url2)
                    .then(response => response.json())
                    .then(data => setPaidClasses(data.data)) 
            }
        } else {
            console.log("Esta hora ya esta reservada")
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
        console.log(data)
        if (data.isAvailable == false) {
            setAllowBooking(false)
        } else {
            setAllowBooking(true)
        }
    }

     useEffect(() => {
        if (day != "" && time != "") {
            checlAvailability()
        }
     }, [day, time])
   return (
    <main>
        <Header user={auth.currentUser}/>
        <div className='flex justify-center'>
            {state == "Find tutor" ? (
                <div className="flex flex-col items-center">
                    <h2 className="mb-2 flex items-center">¿Con quién quieres hacer clases?</h2>
                    <input onChange={(e) => setTutor(e.target.value)} placeholder="Nombre Apellido" className="placeholder-[#c9c9c9] border border-[#333533] text-gray-900 sm:text-sm rounded-xl block w-full p-2.5"/>
                    {matchTutor ? (
                        <button onClick={addTutor} className='w-full mt-2 p-8 bg-[#6156f6] rounded-md hover:shadow-[0_3px_10px_rgb(0,0,0,0.25)] shadow-[0_3px_10px_rgb(0,0,0,0.15)]'>
                            <div className="flex items-center gap-4 justify-center">    
                                <Image className='rounded-full' alt="Tutor's profile picture" height={50} width={50} src={matchTutor?.profile_url}/>
                                <div>
                                    <p className="font-bold text-lg text-white">{matchTutor?.username}</p>
                                </div>
                            </div>
                        </button>
                    ) : (<></>)}
                </div>
            ) : (<></>)}
            {state == "Find spot" ? (
                <div className='flex flex-col gap-12'>
                    {allowBooking}
                    <p className='font-bold text-xl bg-12'>Tienes {paidCalsses} pagadas con {matchTutor.username}</p>
                    <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                        </svg>
                    </div>
                        <input onChange={(e) => setDay(e.target.value)}  datepicker type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />
                    </div>

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
        </div>
        <BottomNavBar />
        <Footer />
    </main>
  )
}
