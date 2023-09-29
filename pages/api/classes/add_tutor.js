import {db} from '@/utils/firebase'
import { collection, updateDoc, arrayUnion, query, where, getDocs} from "firebase/firestore"; 

export default async function (req, res) {
    const matchTutor = req.query.matchTutor
    const email = req.query.email
    
    const studetRef = collection(db, "students")
    const studentSnap = query(studetRef, where("email", "==", email))
    const queryStudentSnap = await getDocs(studentSnap)
    
    const tutorRef = collection(db, "tutors")
    const tutorSnap = query(tutorRef, where("email", "==", matchTutor))
    const queryTutorSnap = await getDocs(tutorSnap)
    
    try {
        const updateStudents = [];
        const updateTutors = [];


        queryStudentSnap.forEach((doc) => {
            const updatePromise = updateDoc(doc.ref, {
                tutors: arrayUnion(matchTutor) 
            })
            updateStudents.push(updatePromise)
        })
        await Promise.all(updateStudents)

        queryTutorSnap.forEach((doc) => {
            const updatePromise = updateDoc(doc.ref, {
                students: arrayUnion(email) 
            })
            updateTutors.push(updatePromise)
        })
        await Promise.all(updateTutors)

        res.status(200).json({ tutorAdded: true })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Server error!" })
    }
}