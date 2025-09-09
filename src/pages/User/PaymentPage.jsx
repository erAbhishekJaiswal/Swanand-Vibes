// PaymentPage.js
import React from "react";
import axios from "axios";

const PaymentPage = () => {
  const handlePayment = async () => {
    try {
      // Step 1: Get order from backend
      const { data: order } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: 500, // ₹500
      });

      // Step 2: Open Razorpay checkout
      const options = {
        key: "rzp_test_R8Ij82dWVJ1p71", // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "My Shop",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          // Step 3: Verify payment on backend
          const verify = await axios.post("http://localhost:5000/api/payment/verify", response);
          if (verify.data.success) {
            alert("Payment Successful ✅");
          } else {
            alert("Payment Verification Failed ❌");
          }
        },
        prefill: {
          name: "Abhishek Jaiswal",
          email: "abhishek@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Buy Product</h2>
      <button
        style={{
          padding: "10px 20px",
          background: "#3399cc",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handlePayment}
      >
        Pay ₹500
      </button>
    </div>
  );
};

export default PaymentPage;
