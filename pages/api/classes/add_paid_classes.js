import { db } from '@/utils/firebase';
import { collection, updateDoc, query, where, getDocs } from 'firebase/firestore';

export default async function (req, res) {
    const tutor_email = req.query.tutor_email;
    const student_email = req.query.student_email;
    const nClasses = req.query.nClasses;

    const studentsRef = collection(db, 'students');
    const studentQuery = query(studentsRef, where('email', '==', student_email));
    const studentQuerySnapshot = await getDocs(studentQuery);
    try {
        studentQuerySnapshot.forEach((doc) => {
            const studentDocRef = doc.ref
            const paidClasses = doc.data().paid_classes
            let tutorValue = paidClasses[tutor_email]
            const updatedPaidClasses = {
                ...paidClasses,
                [tutor_email]: parseInt(tutorValue) + parseInt(nClasses),
            }
            updateDoc(studentDocRef, { paid_classes: updatedPaidClasses });
            res.status(200).json({ classesAdded: true })
        })
    
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}