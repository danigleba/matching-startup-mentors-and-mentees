import { HiOutlinePlus } from 'react-icons/hi'
import {useRouter} from 'next/router'

export default function AddStudentButton(props) {
  const router = useRouter()
    return (
        <main className="h-max flex items-center">
                <button onClick={() => router.push("/book")} className="hover:bg-[#d63c4f] duration-200 flex items-center gap-2 bg-[#eb4c60] rounded-md text-xs md:text-sm py-2 px-4 text-white font-semibold">
                    <HiOutlinePlus strokeWidth={3} />
                    <p>Reservar clases</p>
            </button>
        </main>
    )
}