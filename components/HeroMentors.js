import { useRouter } from "next/router"
import { IoIosArrowRoundForward } from "react-icons/io"
import Link from "next/link"

export default function HeroMentors() {
    const router = useRouter()
    return (
        <div className="hero bg-[#f4f4f4] py-48 lg:py-0 lg:h-screen">
            <div className="mx-8 md:ml-20 md:mr-10">
                <div>
                    <p className="font-medium md:text-lg text-center lg:text-left text-[#222222]">Mentor an entrepreneur on the come-up and</p>
                    <h1 className="z-50 text-3xl md:text-5xl" style={{ lineHeight: "1.1" }}>Turn your knowledge into <a className="bg-[#52b788] text-white px-2">cash</a></h1>                    <p className="text-[#222222] text-center lg:text-left md:text-lg">Get equity in early-stage startups by mentoring their founders. Help them get Product-Market-Fit and turn your experience into an asset.</p>
                </div>
                <div className="md:flex justify-center lg:justify-start items-end gap-6 w-full pt-12">
                    <Link href="https://forms.gle/4sNT8ivcD9xVitxLA" target="_blank">
                        <button>Find a startup</button>
                    </Link>
                    <button onClick={() => router.push("/")} className="flex justify-center items-center gap-2 bg-transparent hover:bg-transparent font-normal text-[#222222] px-0 pt-6 lg:pt-0 hover:gap-4 duration-200 ease-in-out">I'm looking for a mentor<IoIosArrowRoundForward size={25}/></button>
                </div>
            </div>
            <div className="hidden lg:block w-full h-full bg-[#222222] bg-cover bg-bottom bg-[url('/mentors-bg.webp')]"></div>
        </div>
    )
}