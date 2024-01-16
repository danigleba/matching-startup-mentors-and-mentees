import { useRouter } from "next/router"
import { Livvic } from "next/font/google"

const livvic = Livvic({ subsets: ["latin"], weight: "700"})

export default function FinalCTA() {
    const router = useRouter()
    return (
        <div className="final-cta">
            <p className={`${livvic.className} text-center text-2xl md:text-3xl mb-12`}>Listen to your users and build something people want 👇</p>
            <button onClick={() => router.push("/filter-comments")}>Filter my comment section</button>
        </div>
    )
}