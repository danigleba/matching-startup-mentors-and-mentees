import {db} from '@/utils/firebase'
import { collection, query, where, getDocs} from "firebase/firestore"; 

export default async function (req, res) {
    const tutor = req.query.tutor

    const tutortRef = collection(db, "tutors")
    const tutorSnap = query(tutortRef, where("username", "==", tutor))
    const queryTutorSnap = await getDocs(tutorSnap)
    
    try {
        const tutors = []
        queryTutorSnap.forEach((doc) => {
            tutors.push({
                id: doc.id,
            ...doc.data(),
            })
        })
        res.status(200).json({ data: tutors })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error."})
    }
}