import { useRouter } from "next/router"
import Link from "next/link"
import { IoIosArrowRoundForward } from "react-icons/io"

export default function Hero(props) {
    const router = useRouter()
    return (
        <div className="hero bg-[#f4f4f4] py-48 lg:py-0 lg:h-screen">
            <div className="mx-8 md:ml-20 md:mr-10">
                <div>
                    <p className="font-medium md:text-lg text-center lg:text-left text-[#222222]">Find a mentor who's already done it, and</p>
                    <h1>Get your Startup to $10k MRR <a className="bg-[#52b788] text-white px-2"> ASAP</a></h1>
                    <p className="text-[#222222] text-center lg:text-left md:text-lg">Every successful entrepreneur had a mentor to show them the path. Get mentored by other entrepreneurs making $10k+ MRR and take your Startup to the next level.</p>
                </div>
                <div className="md:flex justify-center lg:justify-start items-end gap-6 w-full pt-12">
                    <Link href="https://forms.gle/AJSp2CoqsAWoEjqXA" target="_blank">
                        <button>Find my mentor</button>
                    </Link>
                    <button onClick={() => router.push("/mentors")} className="flex justify-center items-center gap-2 bg-transparent hover:bg-transparent font-normal text-[#222222] px-0 pt-6 lg:pt-0 hover:gap-4 duration-200 ease-in-out">I'm a mentor<IoIosArrowRoundForward size={25}/></button>
                </div>
            </div>
            <div className="hidden lg:block w-full h-full bg-[#222222] bg-cover bg-bottom bg-[url('/mentee-bg.png')]"></div>
        </div>
    )
}