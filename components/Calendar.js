import { useEffect, useState } from 'react'
import Image from 'next/image'
import { FiArrowRight } from 'react-icons/fi'
import { FiArrowLeft } from 'react-icons/fi'

export default function Calendar(props) {
    const [classes, setClasses] = useState([])
    const months = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "sebtiembre", "octubre", "noviembre", "diciembre"]
    const [type, setType] = useState("Month")

  useEffect(() => {
    let url
    if (type == "Week") {
        url = "/api/classes/get_classes_week?student_email=" + props?.user?.email
    } else if (type == "Month") {
        url = "/api/classes/get_classes_month?student_email=" + props?.user?.email
    } else {
        url = "/api/classes/get_classes?student_email=" + props?.user?.email
    }
    if (url) {
        fetch(url)
        .then(response => response.json())
        .then(data => setClasses(data.data))
    }
  }, [props?.user, type])
  return (
    <main className="pt-8 overflow-hidden">
      <h2 className='px-8'>Clases programadas</h2>
      <div className='flex gap-4 px-8'>
            <button onClick={() => setType("All")} className='bg-gray-200 px-4 py-2 rounded-full'>Todas</button>
            <button onClick={() => setType("Week")}  className='bg-gray-200 px-4 py-2 rounded-full'>Esta semana</button>
            <button onClick={() => setType("Month")}  className='bg-gray-200 px-4 py-2 rounded-full'>Este mes</button>
      </div>
        {type}
      <div className="flex w-screen items-center">
        <div className="px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {classes.map((item) => (
            <a key={item.id}>
              <div className='w-full bg-white shadow-[0_0px_50px_rgb(0,0,0,0.08)] rounded-xl p-6'>
                <div className="flex justify-between pb-8">
                  <div className="flex gap-4">
                    <Image className='rounded-full' alt="Student's profile picture" height={50} width={50} src={item?.tutor_profile} />
                    <div>
                      <p className="font-bold">{item?.day.substr(-2)} de {months[parseInt(item?.day.slice(5, 7)) - 1]}, {item?.start_time} h</p>
                      <p className="font-light">Con {item.tutor_name}</p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-4'>
                  <button className='bg-black font-medium text-white py-2 rounded-md hover:bg-[#f4f4f4] hover:text-black duration-200'>Empezar clase</button>
                  <button className='border-2 border-red-400 font-medium text-red-400 py-1.5 rounded-md hover:bg-red-400 hover:text-white duration-200'>Cancelar clase</button>
                </div>
              </div>
            </a>
          ))}
        </div>
        </div>
    </main>
  )
}

