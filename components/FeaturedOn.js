import Image from "next/image"

export default function FeaturedOn() {
    return (  
        <div className="flex items-center justify-center pt-12 pb-6 mx-8 md:mx-20">
            <div className="flex flex-wrap justify-center items-center w-full gap-6 md:gap-12">
                <p className="text-[#222222] font-medium md:text-base">Featured on</p>
                <div>
                    <Image alt="Product Hunt logo" width={130} height={130} src="/logos/producthunt.png" />
                </div>
                <div>
                    <Image alt="Hacker News logo" width={80} height={130} src="/logos/hackernews.png" />
                </div>                
                <div>
                    <Image alt="X logp" width={35} height={35} src="/logos/x.webp" />
                </div>                
                <div>
                    <Image alt="Reddit logo" width={100} height={100} src="/logos/reddit.png" />
                </div>            
            </div>
        </div>
    )
}