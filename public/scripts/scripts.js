const priceModal = document.querySelector("#price-modal");
const successModal = document.querySelector("#success-modal");
const modal = document.querySelector(".modal");
const closeModalbutton = document.querySelector(".modal-popup > img");
const navExpand = document.querySelector("#nav-expand");
const navToggle = document.querySelector(".nav-toggle");
const lottieAnimation = document.querySelector("#lottie-animation");
const initialInputValue = [25, 75, 200];

var currentSelected = null;

const slideDown = (element) =>
  (element.style.height = `${element.scrollHeight+2}px`);
const slideUp = (element) => (element.style.height = "0px");

const slideUpCurrentSelected = () => {

  currentSelected.classList.remove("selected");
  const pledge = currentSelected.querySelector(".pledge-container");
  const radio = currentSelected.querySelector(".inner-radio");

  slideUp(pledge);
  radio.classList.remove("selected");
  currentSelected = null;
}

const resetInput = () => {
  const inputBox = document.querySelectorAll("input[type=text]");

  inputBox.forEach((input, index) => {
    input.value = initialInputValue[index];
  })
}

document.querySelectorAll(".btn-cyan").forEach((btn) => {
  if (btn.id === "success-button") {
    return;
  }

  if (btn.classList.contains("disabled")) return;

  btn.addEventListener("click", function () {
    priceModal.classList.add("show");
    modal.classList.add("show");
  });
});

document.querySelectorAll(".modal-screen").forEach((e) => {
  e.addEventListener("click", function (event) {
    if (event.target.classList.contains("modal-screen")) {

      if (this.id === "lottie-animation") return;

      navExpand.classList.remove("show");
      navExpand.classList.remove("absolute");
      navToggle.classList.remove("expand");
      navExpand.querySelector(".modal-popup").classList.remove("expand");
      this.classList.remove("show");
      modal.classList.remove("show");

      if (this.id === "success-modal") resetInput();
    }
  });
});

closeModalbutton.addEventListener("click", function () {
  priceModal.classList.remove("show");
  modal.classList.remove("show");
});

document.querySelectorAll("#price-modal .product-card").forEach((card) => {

  if (card.classList.contains("disabled")) return;

  card.addEventListener("click", function () {

      if(this === currentSelected) return;

      if (currentSelected) {
        slideUpCurrentSelected();
      }

      currentSelected = this;
      this.classList.add("selected");
      const pledge = this.querySelector(".pledge-container");
      const radio = this.querySelector(".inner-radio");
      
      if (this.id !== "free") {
        const inputBox = this.querySelector("input[type=text]");

        const currentValue = inputBox.value;
        inputBox.value = "";
        window.setTimeout(function () {
            inputBox.focus();
        }, 0);
        inputBox.value = currentValue;
      }
      slideDown(pledge);
      radio.classList.add("selected");
    },
    { capture: true }
  );
});

document.querySelectorAll("#price-modal button").forEach((button) => {

  if (button.classList.contains("disabled")) return;

  button.addEventListener("click", function () {
    priceModal.classList.remove("show");
    lottieAnimation.classList.add("show");


    setTimeout(() => {
      lottieAnimation.classList.remove("show");

      setTimeout(() => {
        successModal.classList.add("show");
      }, 1000);

    }, 5000)

    slideUpCurrentSelected();
  });
});

successModal.querySelector("button").addEventListener("click", function () {
  successModal.classList.remove("show");
  modal.classList.remove("show");
  resetInput();
});

document.querySelectorAll("input[type=text]").forEach((e) => {
  e.addEventListener("input", function () {
    this.value = this.value.toString().replace(/[^0-9]/g, "");
  });
});

navToggle.addEventListener("click", function () {
  modal.classList.toggle("show");
  navExpand.classList.toggle("absolute");
  this.classList.toggle("expand");
  navExpand.classList.toggle("show");
  navExpand.querySelector(".modal-popup").classList.toggle("expand");
});
