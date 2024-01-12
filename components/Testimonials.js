import { FaStar } from "react-icons/fa";

export default function Testimonials() {
    return (
        <>
            <div className="lg:flex items-center justify-start pt-12 md:gap-6">
                <div className="flex justify-center lg:justify-start relative">
                    <div className="w-16 aspect-square rounded-full bg-white bg-cover border-4 border-[#212121] bg-[url('/profiles/4.png')]"></div>
                    <div className="w-16 aspect-square rounded-full bg-white bg-cover border-4 border-[#212121] bg-center bg-[url('/profiles/2.jpg')]" style={{ marginLeft: '-20px', zIndex: '1' }}></div>
                    <div className="w-16 aspect-square rounded-full bg-white bg-cover border-4 border-[#212121] bg-center bg-[url('/profiles/5.jpg')]" style={{ marginLeft: '-20px', zIndex: '2' }}></div>
                    <div className="w-16 aspect-square rounded-full bg-white bg-cover border-4 border-[#212121] bg-center bg-[url('/profiles/1.jpg')]" style={{ marginLeft: '-20px', zIndex: '3' }}></div>
                    <div className="w-16 aspect-square rounded-full bg-white bg-cover border-4 border-[#212121] bg-center bg-[url('/profiles/3.jpg')]" style={{ marginLeft: '-20px', zIndex: '4' }}></div>
                </div>
                <div className="pt-3 lg:pt-0 text-lg w-full space-x-1 space-y-2 lg:mr-12">
                    <div className="flex justify-center lg:justify-start pt-3 lg:pt-0 text-yellow-400 text-lg w-full space-x-1">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </div>
                    <p className="text-sm text-center lg:text-left"><i>"Our comment section is now our top source of feedback!"</i></p>
                </div>
            </div>
        </>
    )
}