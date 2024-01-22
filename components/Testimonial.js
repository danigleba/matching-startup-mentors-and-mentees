import Image from "next/image";

export default function Testimonial(props) {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-5 hover:scale-105 duration-200 ease-in-out">
      <div className="flex items-start space-x-4 pb-4">
        <div className="relative w-14 h-14">
          <Image
            src={props.image}
            alt="User Image"
            width={250}
            height={250}
            className="object-cover w-full h-full rounded-xl"
          />
        </div>
        <div className="w-3/5">
          <p className="text-lg font-semibold text-[#52b788] truncate">{props.name}</p>
          <p className="font-extralight text-gray-600 truncate">{props.title}</p>
        </div>
      </div>
      <p className="font-base text-gray-800">{props.quote}</p>
    </div>
  );
}

