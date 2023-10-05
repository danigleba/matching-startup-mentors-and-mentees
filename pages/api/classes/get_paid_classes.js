import { db } from '@/utils/firebase'
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore'

export default async function (req, res) {
  const tutor_email = req.query.tutor_email
  const student_email = req.query.student_email

  const studentRef = collection(db, 'students')
  const studentSnap = query(studentRef, where('email', '==', student_email))
  const queryStudentSnap = await getDocs(studentSnap)

  try {
    let tutorValue = null

    queryStudentSnap.forEach(async (doc) => {
      const studentDocRef = doc.ref
      const paidClasses = doc.data().paid_classes

      if (paidClasses && tutor_email in paidClasses) {
        tutorValue = paidClasses[tutor_email];
        res.status(200).json({ data: tutorValue })
      } else {
        const updatedPaidClasses = {
          ...paidClasses,
          [tutor_email]: 0,
        }
        await updateDoc(studentDocRef, { paid_classes: updatedPaidClasses });
        tutorValue = updatedPaidClasses[tutor_email];
        res.status(200).json({ data: tutorValue })
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error.' })
  }
}
