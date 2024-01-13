import { stripe } from "@/utils/stripe"

export default async function handler(req, res) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KE_TESTY)
    const tutor_email = req.query.tutor_email
    const student_email = req.query.student_email
    const price = req.query.price

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        payment_method_types: ["card"],
        amount: 250, 
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