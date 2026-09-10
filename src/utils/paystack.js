// Paystack integration notes for Amaranth
//
// There are two separate flows here, and only one of them can run
// purely client-side:
//
// 1. GRANTING a wish (money coming IN) — this can run entirely in the
//    browser using Paystack's Inline/Popup script. That's what
//    payWithPaystack() below does.
//
// 2. PAYING OUT to a wisher's bank account (money going OUT) — this
//    CANNOT be done from the browser. It requires your Paystack SECRET
//    key, which must never be shipped in frontend code. This needs a
//    small backend — a Firebase Cloud Function is the natural fit
//    since you're already on Firebase:
//      - one function to create a Paystack "Transfer Recipient" when a
//        wisher submits their bank details (store the returned
//        recipient_code in Firestore, NOT the raw account number)
//      - one function to trigger a Paystack Transfer to that recipient
//        once a wish is fully funded
//    Both are simple HTTPS Cloud Functions that call the Paystack API
//    server-side with your secret key from Firebase's environment config.

// TODO: replace with your real Paystack public key
const PAYSTACK_PUBLIC_KEY = 'pk_test_YOUR_PUBLIC_KEY'

export function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve()
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

// amountNaira: whole naira amount the granter is contributing
// email: granter's email (Paystack requires one, can be a throwaway/anon one)
// onSuccess(reference): called with the transaction reference after payment
export async function payWithPaystack({ amountNaira, email, onSuccess }) {
  await loadPaystackScript()

  const handler = window.PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email,
    amount: amountNaira * 100, // Paystack expects kobo
    currency: 'NGN',
    callback: (response) => {
      onSuccess(response.reference)
    },
    onClose: () => {
      // granter closed the popup without paying — no action needed
    },
  })
  handler.openIframe()
}
