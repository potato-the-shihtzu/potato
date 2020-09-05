// Navigation Menu
const hamburgerButton = document.querySelector("nav div svg");
const navigation = document.querySelector("nav ul");

hamburgerButton.addEventListener("click", function () {
	if (navigation.style.visibility === "hidden") {
		navigation.style.visibility = "visible";
	} else {
		navigation.style.visibility = "hidden";
	}
});
