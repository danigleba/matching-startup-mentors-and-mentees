import { useEffect, useState } from 'react'

export default function Files(props) {
    const [files, setFiles] = useState([])
  
    useEffect(() => {
        fetch("/api/files/get_files?student_email=" + props?.user?.email)
        .then(response => response.json())
        .then(data => setFiles(data.data))
    }, [props?.user])
  return (
    <main className="pt-8 overflow-hidden">
      <p>Documentos</p>
      {files?.map((item) => (
            <a target="_blank" href={item.downloadURL} key={item.id}>
              <div className='w-max w-full bg-red-200 shadow-[0_0px_50px_rgb(0,0,0,0.08)] rounded-xl p-6'>
                {item.name}
              </div>
            </a>
          ))}   
    </main>
  )
}