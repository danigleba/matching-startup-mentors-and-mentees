import {db} from '@/utils/firebase'
import { collection, addDoc, query, where, getDocs} from "firebase/firestore"; 

export default async function (req, res) {
    const profile_url = req.query.profile_url
    const email = req.query.email
    const username = req.query.username

    //Check if user already exists
    const studetRef = collection(db, "students")
    const studentSnap = query(studetRef, where("email", "==", email))
    const queryStudentSnap = await getDocs(studentSnap)
    let studentExists = false
    
    queryStudentSnap.forEach((doc) => {
        if (doc.id !== "") {
            studentExists = true
        }})

    if (studentExists) {
        res.status(200).json({studentCreated: true})
    } else {
        try {
            const newStudent = await addDoc(collection(db, "students"), {
                    email: email,
                    username: username,
                    profile_url: profile_url,
                    tutors: [],
                    paid_classes: {}
                })
            res.status(200).json({studentCreated: true})
        } catch (error) {
            res.status(500).json(error)
        }
    }
}