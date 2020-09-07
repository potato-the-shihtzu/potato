// Navigation Menu
const hamburgerButton = document.querySelector("nav div svg");
const navigation = document.querySelector("nav ul");

hamburgerButton.addEventListener("click", function () {
    navigation.classList.toggle("nav_trans");
});
