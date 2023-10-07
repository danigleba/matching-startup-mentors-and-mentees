import { db } from '@/utils/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default async function handler(req, res) {
 
    const day = req.query.day
    const time = req.query.time
    const selectedTime = new Date(`${day}T${time}:00`)
    const currentTime = new Date();

    const selectedEndTime = new Date(selectedTime)
    selectedEndTime.setHours(selectedEndTime.getHours() + 1)

    const classesRef = collection(db, 'classes')
    const dayQuery = query(classesRef, where('day', '==', day))
    const dayQuerySnapshot = await getDocs(dayQuery)
    let isAvailable = true
    try {
      dayQuerySnapshot.forEach((doc) => {
        const startTime = new Date(`${day}T${doc.data().start_time}:00`)
        const endTime = new Date(`${day}T${doc.data().end_time}:00`)

        if ((startTime <= selectedTime && selectedTime <= endTime) || (startTime <= selectedEndTime && selectedEndTime <= endTime) || (selectedTime <= currentTime)) {
          isAvailable = false
        } 
      })
      res.status(200).json({ data: isAvailable })

  } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' })
  }
}

