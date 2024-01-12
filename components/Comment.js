import Image from "next/image"

export default function Comment(props) {
    return (  
        <div className="flex gap-4 items-start justify-start bg-white pl-5 pr-8 w-full lg:w-max py-3 border border-[#dddddd] rounded-lg">
            <div>
                <Image 
                    src={props.image}
                    alt="User Image"
                    width={250}
                    height={250}
                    className="w-12 aspect-square rounded-full bg-white"
                />
            </div>
            <div className="flex flex-col w-full"> 
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-black">{props.username}</p>
                    <p className="text-xs text-gray-500">{props.time}</p>
                </div>
                <div className="max-w-full">
                    <p className="text-sm text-black break-words">{props.comment}</p>
                </div>
            </div>
        </div>      
    )
}