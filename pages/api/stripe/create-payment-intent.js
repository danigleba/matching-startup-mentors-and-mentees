import { stripe } from "@/utils/stripe"
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '@/utils/firebase'

export default async function handler(req, res) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const tutor_email = req.query.tutor_email
    const student_email = req.query.student_email
    const price = req.query.price

    try {
      // Create a Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ["card"],
        amount: price, 
        currency: "eur", 
        metadata: {
            tutor_email,
            student_email,
        },
      })
      res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: "Failed to create Payment Intent" })
    }
  
}
