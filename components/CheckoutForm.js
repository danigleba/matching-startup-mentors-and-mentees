import Image from "next/image";
import { PaymentElement, useStripe, useElements, CardElement, stripe} from "@stripe/react-stripe-js"
import { useRouter } from "next/router"
import { useEffect, useState  } from "react";

export default function CheckoutForm({ clientSecret, price, email }) {
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!stripe) {
      return;
    }

    //const clientSecret2 = clientSecret

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });
  
    const paymentElementOptions = {
      layout: "tabs",
    };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="flex flex-col justify-center">
      <span>Payment details</span>
      <div>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <img className="w-full pt-3" alt="Stripe badge" src="/stripe/stripe-badge.png"/>
      </div>
      <button type="submit" disabled={!stripe} className={` bg-gradient-to-r from-rose-400 to-orange-300 text-[#212121] w-full hover:scale-100 mt-12`}>
        Checkout ${price}
      </button>
    </form>
  );
}
}
