import { db } from '@/utils/firebase';
import { collection, updateDoc, query, where, getDocs } from 'firebase/firestore';

export default async function (req, res) {
    const tutor_email = req.query.tutor_email
    const student_email = req.query.student_email
    const nBooked = req.query.nBooked
    const recurring = req.query.recurring

    const studentsRef = collection(db, 'students');
    const studentQuery = query(studentsRef, where('email', '==', student_email));
    const studentQuerySnapshot = await getDocs(studentQuery);
    try {
        studentQuerySnapshot.forEach((doc) => {
            const studentDocRef = doc.ref
            const paidClasses = doc.data().paid_classes
            let tutorValue = paidClasses[tutor_email]
            if (recurring == "false") {
                const updatedPaidClasses = {
                    ...paidClasses,
                    [tutor_email]: parseInt(tutorValue) - 1,
                }
                updateDoc(studentDocRef, { paid_classes: updatedPaidClasses });
                res.status(200).json({ classesAdded: true })
            } else {
                const updatedPaidClasses = {
                    ...paidClasses,
                    [tutor_email]: parseInt(tutorValue) - parseInt(nBooked),
                }
                updateDoc(studentDocRef, { paid_classes: updatedPaidClasses });
                res.status(200).json({ classesAdded: true })
            }
            
        })
    
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}