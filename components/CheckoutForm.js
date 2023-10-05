import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {useRouter} from 'next/router'

export default function CheckoutForm({ clientSecret, student_email, tutor_email, nClasses}) {
  const router = useRouter()
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    //const router = useRouter()
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      console.log("Payment successful!");

      //send emails to teacher and student
      const url = "/api/classes/add_paid_classes?student_email=" + student_email + "&tutor_email=" + tutor_email + "&nClasses=" + nClasses
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
      const data = await response.json()
      if (data.classesAdded == true) {
        router.reload()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
