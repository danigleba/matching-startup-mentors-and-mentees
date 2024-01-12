import { useRouter } from "next/router"
import { Livvic } from "next/font/google"

const livvic = Livvic({ subsets: ["latin"], weight: "700"})

export default function FinalCTA() {
    const router = useRouter()
    return (
        <>
            <div className="flex flex-col justify-center items-center mx-8 md:mx-120 pt-24 pb-12">
                <p className={`${livvic.className} text-center text-2xl md:text-3xl mb-12`}>Listen to your users and build something people want 👇</p>
                <button onClick={() => router.push("/read")}>Filter my comment section</button>
            </div>
        </> 
    )
}