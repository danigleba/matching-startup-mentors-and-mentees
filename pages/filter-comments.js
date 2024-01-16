import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Header from "@/components/HeaderApp"
import Footer from "@/components/Footer"
import { Inter } from "next/font/google"
import { Livvic } from "next/font/google"
import { FaPaste } from "react-icons/fa6"
import { CardElement, PaymentElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js"
import { stripe } from "@stripe/stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "@/components/CheckoutForm"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST)
const livvic = Livvic({ subsets: ["latin"], weight: "700"})
const inter = Inter({ subsets: ["latin"]})

export default function Read() {
    const router = useRouter()
    const [link, setLink] = useState("")
    const [loading, setLoading] = useState(false)
    const [videoId, setVideoId] = useState('')
    const [video, setVideo] = useState(null)
    const [clientSecret, setClientSecret] = useState()

   // const stripe = useStripe()
    //const elements = useElements()
    const appearance = {
        theme: 'night',
        variables: {
            colorPrimary: '#ee9d83',
          }

    }
    const loader = 'auto'
    const options = {
        clientSecret,
        appearance,
        loader
    }

    const CreatePaymentIntent = async () => {
        const stripe = await stripePromise
        const url = "/api/stripe/create-payment-intent?numberOfComments=" + video?.numberOfComments
            const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                }
            })
        const data = await response.json()
        setClientSecret(data.clientSecret)
    }
  

    function extractVideoId(url) {
        const match = url?.match(/[?&]v=([^?&]+)/)
        if (match && match[1]) setVideoId(match[1])
        else setVideoId("")
    }

    const pasteClipboard = async () => {
        const textFromClipboard = await navigator.clipboard.readText()
        setLink(textFromClipboard)
    }

    const getVideo = async () => {
        setLoading(true)
        try {
            const response = await fetch(`/api/youtube/getVideo?video_id=${videoId}`)
            if (!response.ok) {
              setErrorMsg("We didn't found that video 🤷‍♀️. Try a different URL")
            }
            const data = await response.json()
            setVideo(data)
          } catch (error) {
            setErrorMsg("We didn't found that video 🤷‍♀️. Try a different URL")
        }
    }

    useEffect(() => {
        if (video && loading) {
            setLoading(false)
            CreatePaymentIntent()
        }
    }, [video])

    useEffect(() => {
        extractVideoId(link)
    }, [link])

    const paymentElementOptions = {
        layout: "tabs",
      }
  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Your YouTube videos' comment section is filled with great user insight. But filtering the thousands of meaningless comments is too time-consuming. Let our AI do that for you and get all that user feedback, questions and bug reports in your inbox."/>
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="Cornelio | Filter user feedback from your comment section" />
        <meta property="og:description" content="Your YouTube videos' comment section is filled with great user insight. But filtering the thousands of meaningless comments is too time-consuming. Let our AI do that for you and get all that user feedback, questions and bug reports in your inbox." />
        <meta property="og:image" content="/icon.png" />
        <meta property="og:url" content="getcornelio.com/filter-comments" />
        <meta property="og:type" content="website" />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cornelio | Filter user feedback from your comment section" />
        <meta name="twitter:description" content="Your YouTube videos' comment section is filled with great user insight. But filtering the thousands of meaningless comments is too time-consuming. Let our AI do that for you and get all that user feedback, questions and bug reports in your inbox." />
        <meta name="twitter:image" content="/icon.png" />
        {/* Favicon */}
        <link rel="icon" href="/icon.png" />
        {/* Page Title */}
        <title>Cornelio | Filter user feedback from your comment section</title>
      </Head>
      <main className={`${inter.className} bg-[#212121]`} >
        <Header />
            <div className={`flex flex-col items-center justify-center w-full px-8 md:px-20 ${!video ? "h-96" : ""}`}>
                {!video && (
                    <>
                    <p className={`${livvic.className} text-center text-2xl md:text-3xl pb-6`}>Paste a YouTube link</p>
                        <div className='w-full md:w-2/3 px-0 lg:px-20'>
                            <div className='flex justify-center gap-4 w-full'>
                                <input onChange={(e) => setLink(e.target.value)} value={link} placeholder="Paste your link here" className="w-full py-3 px-3 rounded-md bg-white text-[#212121] text-sm md:text-md" />
                                <button onClick={() => pasteClipboard()} className="px-4 w-max md:w-max  bg-gradient-to-r from-[white] to-[white] hover:from-rose-400 hover:to-orange-300 hover:scale-100 text-[#0f0f0f] hover:text-white duration-0 ease-linear"><FaPaste /></button>
                            </div>
                            <button onClick={() => {videoId != "" ?  getVideo() : ""}} className={`flex justify-center items-center gap-4 px-4 w-full mt-4 ${loading ? "cursor-auto" : ""} ${videoId == "" ? "bg-gradient-to-r from-[#0f0f0f] to-[#0f0f0f] text-white cursor-auto" : ""} hover:scale-100`}>
                                {!loading && videoId != "" &&( <p>Scan my video</p>)}
                                {!loading && videoId == "" &&( <p>Paste a YouTube URL 👆</p>)}
                                {loading && (
                                    <>
                                        <p>Loading...</p>
                                        <div role="status">
                                            <svg aria-hidden="true" className="w-6 h-6 text-white animate-spin fill-[#212121]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                        </div>
                                        </>
                                )}
                            </button>
                        </div>
                    </>
                )}
                {video && (
                    <>
                        <p className={`${livvic.className} text-center text-2xl md:text-3xl pb-12`}>Checkout to get {video?.authorName} users' feedback</p>
                        <div className='flex grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 md:gap-24 items-start justify-center'>
                                {/*Checkout Form*/}
                                <div className="w-full space-y-6 order-2">
                                    
                                    {clientSecret && (
                                    
                                            <Elements options={options} stripe={stripePromise} >
                                                <CheckoutForm clientSecret={clientSecret} numberOfComments={video?.numberOfComments} videoId={videoId}/>
                                            </Elements>
                                        
                                    )}
                                </div>
                                <div className='flex flex-col items-center justify-center'>
                                    <div className="w-full aspect-video rounded-lg overflow-hidden">
                                        <img
                                            className="w-full h-auto"
                                            src={video.thumbnail}
                                            alt="Sample Image"/>                            
                                    </div>
                                    <div className='flex gap-4 pt-4 w-full'>
                                        <div className='text-left'>
                                            <p className='font-semibold break-words'>{video.title}</p>
                                            <p className='text-gray-500'>{video.authorName}</p>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </>
                )}   
            </div>
            
        <Footer />
      </main>
    </>
  )
}
