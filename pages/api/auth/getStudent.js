import {db} from '@/utils/firebase'
import { collection, addDoc, query, where, getDocs} from "firebase/firestore"; 

export default async function (req, res) {
    const email = req.query.email

    const studetRef = collection(db, "students")
    const studentSnap = query(studetRef, where("email", "==", email))
    const queryStudentSnap = await getDocs(studentSnap)
    try {
        queryStudentSnap.forEach((doc) => {
            if (doc.id !== "") {
                res.status(200).json({data: doc.data()})
        }})
    } catch (error) {
        res.status(500).json(error)
    }
}