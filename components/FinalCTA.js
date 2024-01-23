import { useRouter } from "next/router"
import Link from "next/link"
import { Livvic } from "next/font/google"

const livvic = Livvic({ subsets: ["latin"], weight: "700"})

export default function FinalCTA() {
    const router = useRouter()
    return (
        <div className="final-cta">
            <h2 className="mb-12">Get your Startup to $10k MRR</h2>
            <Link className="flex justify-center items-center w-full" href="https://pqqg8ji8pbd.typeform.com/to/WKNxkfX8" target="_blank">
                <button>Find my mentor</button>
            </Link>
        </div>
    )
}