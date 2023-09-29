import { db } from '@/utils/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default async function (req, res) {
  const tutor_email = req.query.tutor_email
  const student_email = req.query.student_email

  const studentRef = collection(db, 'students')
  const studentSnap = query(studentRef, where('email', '==', student_email))
  const queryStudentSnap = await getDocs(studentSnap)

  try {
    let tutorValue = null;

    queryStudentSnap.forEach((doc) => {
      const paidClasses = doc.data().paid_classes

      if (paidClasses && tutor_email in paidClasses) {
        tutorValue = paidClasses[tutor_email]
        return
      }
    });

    if (tutorValue !== null) {
      res.status(200).json({ data: tutorValue })
    } else {
      res.status(404).json({ message: 'Tutor not found for the given student.' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error.' })
  }
}
