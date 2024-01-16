import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Livvic } from "next/font/google"
import { IoIosArrowRoundBack } from "react-icons/io";

const livvic = Livvic({ subsets: ["latin"], weight: "700"})

export default function TOS() {
    const router = useRouter()
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
            <meta property="og:url" content="getcornelio.com/terms-of-service" />
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
        <main className="bg-[#212121]" >
            <Header />
            <div className="flex justify-center items-center w-full px-8 md:px-20">
                <div className='flex justify-center items-center w-full'>
                    <div className='space-y-6 w-full md:w-2/3 '>
                        <button onClick={() => router.push("/")} className='flex items-center text-sm gap-2 bg-gradient-to-r from-[#212121] to-[#212121] bg-[#[#212121] font-medium  text-white w-max hover:scale-100 px-4 py-2'>
                            <IoIosArrowRoundBack />
                            Go back
                        </button>
                        <p className={`${livvic.className} font-bold text-2xl md:text-3xl`}>Terms of service</p>
                        <div >
                            <p className={`${livvic.className} legal-title`}>Overview</p>
                            <p className='legal-text'>Thank you for using Cornelio ("we," "us," or "our"), a Software as a Service (SaaS) platform available at getcornelio.com. By accessing or using our services, you agree to comply with and be bound by these Terms of Service.
                            </p>
                        </div>
                        <div>
                            <p className={`${livvic.className} legal-title`}>User Agreement</p>
                            <p className='legal-text'>By using Cornelio, you affirm that you are at least 18 years old and capable of entering into a legally binding agreement.</p>
                        </div>
                        <div >
                            <p className={`${livvic.className} legal-title`}>SaaS Subscription</p>
                            <p className='legal-text'>Cornelio offers SaaS subscriptions, accessible through getcornelio.com. Payments for subscriptions are processed through Stripe. By subscribing, you agree to Stripe's terms and conditions.</p>
                        </div>
                        <div >
                            <p className={`${livvic.className} legal-title`}>Payment and Billing</p>
                            <p className='legal-text'>All payments are processed securely through Stripe. You agree to provide accurate and complete billing information. Cornelio is not responsible for any charges or fees imposed by your financial institution.</p>
                        </div>
                        <div >
                            <p className={`${livvic.className} legal-title`}>Termination</p>
                            <p className='legal-text'>We reserve the right to terminate or suspend your account at our discretion, without notice, if we believe you have violated these Terms of Service.</p>
                        </div>
                        <div >
                            <p className={`${livvic.className} legal-title`}>Privacy Policy</p>
                            <p className='legal-text'>Your use of Cornelio is also governed by our Privacy Policy. Please review the policy at <a href="getcornelio.com/pp" className='underline'>getcornelio.com/pp</a>.</p>
                        </div>
                        <div >
                            <p className={`${livvic.className} legal-title`}>Intellectual Property</p>
                            <p className='legal-text'>Cornelio and its content are protected by intellectual property laws. You may not use, reproduce, or distribute any part of the service without our express written permission.</p>
                        </div>
                        <div >
                            <p className={`${livvic.className} legal-title`}>Limitation of Liability</p>
                            <p className='legal-text'>Cornelio is provided "as is," and we disclaim any warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of Cornelio.</p>
                        </div>
                        <div >
                            <p className={`${livvic.className} legal-title`}>Governing Law</p>
                            <p className='legal-text'>These Terms of Service are governed by the laws of Spain. Any disputes shall be resolved in the courts of Spain.</p>
                        </div>
                        <div className='pb-4'>
                            <p className={`${livvic.className} legal-title`}>Contact Information:</p>
                            <p className='legal-text'>Email: daniglebapuig@gmail.com <br/><br/>For any questions or concerns regarding these Terms of Service, please contact us at the provided email address. <br/><br/> Thank you for using Cornelio!</p>
                            <p className='legal-text pt-6'>Last updated: 31.12.2023</p>
                        </div>
                        <button onClick={() => router.push("/")} className='flex items-center gap-2 text-sm bg-gradient-to-r from-[#212121] to-[#212121] bg-[#[#212121] font-medium  text-white w-max hover:scale-100 px-4 py-2'>
                            <IoIosArrowRoundBack />
                            Go back
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
        </>
    )
}
