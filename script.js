/* ================= PAYMENT MODAL ================= */

const payBtn = document.getElementById("payBtn");
const paymentModal = document.getElementById("paymentModal");
const closeBtn = document.getElementById("closeBtn");

const continueBtn = document.getElementById("continueBtn");

const paymentPage = document.getElementById("paymentPage");
const codePage = document.getElementById("codePage");

const backBtn = document.getElementById("backBtn");
const redeemCode = document.getElementById("redeemCode");
const newCodeBtn = document.getElementById("newCodeBtn");


/* Open QR popup */

payBtn.addEventListener("click", () => {
    paymentModal.classList.add("active");
});


/* Close QR popup */

closeBtn.addEventListener("click", () => {
    paymentModal.classList.remove("active");
});


/* Close popup by clicking outside */

paymentModal.addEventListener("click", (event) => {

    if (event.target === paymentModal) {
        paymentModal.classList.remove("active");
    }

});


/* ================================================= */
/* CONTINUE IS CURRENTLY LOCKED                     */
/* ================================================= */

/*
   IMPORTANT:

   The Continue button stays disabled until the payment
   is actually verified.

   Later, when Razorpay is integrated, successful payment
   verification will run:

       continueBtn.disabled = false;
       continueBtn.classList.add("payment-success");

   Do NOT unlock the page using a fake payment button.
*/


continueBtn.addEventListener("click", () => {

    if (continueBtn.disabled) {
        return;
    }

    paymentModal.classList.remove("active");

    paymentPage.style.display = "none";

    codePage.classList.add("active");

    createNewCode();
});


/* ================= BACK BUTTON ================= */

backBtn.addEventListener("click", () => {

    codePage.classList.remove("active");

    paymentPage.style.display = "block";

});


/* ================= REDEEM CODE ================= */

const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";


function createNewCode() {

    let code = "";

    for (let i = 0; i < 16; i++) {

        const randomIndex =
            Math.floor(Math.random() * characters.length);

        code += characters[randomIndex];
    }

    redeemCode.textContent = code;
}


/* Create new code */

newCodeBtn.addEventListener("click", () => {

    createNewCode();

});


/* Initial code */

createNewCode();


/* ================= 10 MINUTE TIMER ================= */

let timeLeft = 10 * 60;

const timer = document.getElementById("timer");


function updateTimer() {

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    timer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    if (timeLeft > 0) {
        timeLeft--;
    }

}


updateTimer();

setInterval(updateTimer, 1000);