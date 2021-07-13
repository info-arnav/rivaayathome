import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";
import axios from "axios";
import { ObjectID } from "bson";

const CheckoutForm = ({ paymentIntent, id, ids }) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [checkoutError, setCheckoutError] = useState();
  const [checkoutSuccess, setCheckoutSuccess] = useState();
  const [value, setValue] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        error,
        paymentIntent: { status },
      } = await stripe.confirmCardPayment(paymentIntent.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) throw new Error(error.message);

      if (status === "succeeded") {
        setCheckoutSuccess(true);
        destroyCookie(null, "paymentIntentId");
      }
    } catch (err) {
      alert(err.message);
      setCheckoutError(err.message);
    }
  };

  if (checkoutSuccess)
    axios
      .post("/api/orders", {
        username: id,
        id: ids,
        address: value,
      })
      .then((e) => router.push(`/orders/${id}`));

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        width={"100%"}
        value={value}
        style={{
          backgroundColor: "transparent",
          width: "100%",
          color: "white",
          height: "100px",
        }}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Address"
      ></textarea>
      <br></br>
      <br></br>
      <CardElement />
      <button
        className="btn"
        type="submit"
        disabled={!stripe}
        style={{ width: "100%" }}
      >
        Pay now
      </button>
      {checkoutError && <span style={{ color: "red" }}>{checkoutError}</span>}
    </form>
  );
};

export default CheckoutForm;
