// FIREBASE CONFIG

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
	apiKey: "AIzaSyD6kuenL1aIE8q6xBSDuOkdDuYyjPAOxY4",
	authDomain: "potato-website.firebaseapp.com",
	projectId: "potato-website",
	storageBucket: "potato-website.appspot.com",
	messagingSenderId: "408853772610",
	appId: "1:408853772610:web:4494a586e4440b12b930db",
	measurementId: "G-XE17SX486W",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Initialize Cloud Firestore and Authentication
const db = firebase.firestore();
const auth = firebase.auth();

// *** Navigation Menu ****
const hamburgerButton = document.querySelector(".nav_button svg");
const navigation = document.querySelector("nav ul");

hamburgerButton.addEventListener("click", function () {
	navigation.classList.toggle("nav_trans");
});

// Selectors

const logForm = document.querySelector(".log_form");

const logDate = document.querySelector("form .log_date");
const logTime = document.querySelector("form .log_time");
const logActivity = document.querySelector("form .log_activity");
const logComment = document.querySelector("form .log_comment");

const logArray = [logDate, logTime, logActivity, logComment];

const logButton = document.querySelector(".log_button");
const logContainer = document.querySelector(".log_container");
const logList = document.querySelector(".log_list");

const filterOption = document.querySelector(".filter_log");

// Login Selectors
const headerDiv = document.querySelector("div.header");
const main = document.querySelector("main");
const loginModal = document.querySelector(".login_modal");
const loginSubmit = document.querySelector(".login_modal button");
const loginClose = document.querySelector(".login_modal .close_modal");
const loginForm = document.querySelector(".login_modal form");
const loginButtons = document.querySelector("ul.auth");
let loginButton;
let logoutButton;

// AUTHENTICATION FUNCTIONS

// Listen for Auth Status Changes

auth.onAuthStateChanged((user) => {
	if (user) {
		console.log("user logged in: ", user);
		loginStatus(true);
	} else {
		console.log("user logged out");
		loginStatus(false);
	}
});

// Login function
loginForm.addEventListener("submit", (e) => {
	e.preventDefault();

	// get user info
	const email = loginForm["login_email"].value;
	const password = loginForm["login_password"].value;

	auth.signInWithEmailAndPassword(email, password)
		.then((cred) => {
			console.log(cred.user);

			// close login modal
			loginModal.className = "login_modal modal";
			headerDiv.className = "header";
			main.className = "";

			// reset login modal
			loginForm.reset();
		})
		.catch((error) => {
			let errorCode = error.code;
			let errorMessage = error.message;
			if (errorCode === "auth/user-not-found") {
				alert("User Not Found.");
			} else {
				alert(errorMessage);
			}
			console.log(error);
		});
});

// END of AUTHENTICATION FUNCTIONS

// *** Login Modals ***

// load up login buttons
const loginStatus = (data) => {
	if (data === true) {
		loginButtons.innerHTML = `
		<li class="logged-in">
			<button class="logout">Logout</button>
		</li>
		`;
	} else {
		loginButtons.innerHTML = `
		<li class="logged-out">
			<button class="login">Login</button>
		</li>
		`;
	}
	loginButton = document.querySelector("button.login");
	logoutButton = document.querySelector("button.logout");

	console.log(loginButton, logoutButton);

	// Open the login modal

	loginButton.addEventListener("click", () => {
		setTimeout(function () {
			headerDiv.className += " blurred";
			main.className += " blurred";
			loginModal.className += " visible";
		}, 100);
	});

	// Logout function
	logoutButton.addEventListener("click", (e) => {
		e.preventDefault();
		auth.signOut().then(() => {
			alert("Successfully signed out");
		});
	});
};

// Close the login modal when clicking the X button

loginClose.addEventListener("click", () => {
	loginModal.className = "login_modal modal";
	headerDiv.className = "header";
	main.className = "";
});

// Closes the login modal when clicking outside of the modal

window.addEventListener("click", (e) => {
	if (!e.target.closest(".login_modal")) {
		loginModal.className = "login_modal modal";
		headerDiv.className = "header";
		main.className = "";
	}
});

// *** END of Login Modals ***

// FIRESTORE FUNCTIONS

// LOADING DATA

function loadLogEntries(doc) {
	// Create log entry container and items
	let logDiv = document.createElement("div");
	let date = document.createElement("li");
	let time = document.createElement("li");
	let activity = document.createElement("li");
	let comment = document.createElement("li");

	logDiv.classList.add("log_entry");
	logDiv.setAttribute("data-id", doc.id);

	// converting date

	let rawDate = doc.data().datetime.toDate().toDateString();
	let rawMonth = rawDate.slice(4, 7);
	switch (rawMonth) {
		case "Jan":
			rawMonth = "1";
			break;
		case "Feb":
			rawMonth = "2";
			break;
		case "Mar":
			rawMonth = "3";
			break;
		case "Apr":
			rawMonth = "4";
			break;
		case "May":
			rawMonth = "5";
			break;
		case "Jun":
			rawMonth = "6";
			break;
		case "Jul":
			rawMonth = "7";
			break;
		case "Aug":
			rawMonth = "8";
			break;
		case "Sep":
			rawMonth = "9";
			break;
		case "Oct":
			rawMonth = "10";
			break;
		case "Nov":
			rawMonth = "11";
			break;
		case "Dec":
			rawMonth = "12";
			break;
		default:
			console.log(
				"Something went wrong while loading the date for the log entries"
			);
			break;
	}

	let rawDay = rawDate.slice(8, 10);
	let rawYear = rawDate.slice(13, 15);

	date.textContent = `${rawMonth}/${rawDay}/${rawYear}`;
	date.className = "log_date";

	// converting time

	let rawTime = doc.data().datetime.toDate().toLocaleTimeString();
	if (rawTime.slice(1, 2) === ":") {
		time.textContent = `${rawTime.slice(0, 4)} ${rawTime.slice(8, 10)}`;
	} else {
		time.textContent = `${rawTime.slice(0, 5)} ${rawTime.slice(9, 11)}`;
	}
	time.className = "log_time";

	// activity

	if (doc.data().activity !== "") {
		// removing underscores from activity text (NEED TO FIND A BETTER WAY)
		let rawActivity = doc.data().activity.split("_");
		if (rawActivity.length < 3) {
			text = rawActivity[0] + " " + rawActivity[1];
		} else {
			text = rawActivity[0] + " " + rawActivity[1] + " " + rawActivity[2];
		}

		// adding text
		activity.textContent = text;
		activity.className = "log_activity";
	}

	// optional comment
	if (doc.data().comment !== "") {
		comment.textContent = doc.data().comment;
		comment.className = "log_comment";
	}

	// Create Trash Button
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash_btn");

	// append items
	let logElements = [date, time, activity, comment, trashButton];

	logElements.forEach((element) => {
		if (element.textContent !== "") {
			logDiv.appendChild(element);
		} else if (element.className === "trash_btn") {
			logDiv.appendChild(element);
		}
	});

	// Append to List
	logList.insertBefore(logDiv, logList.firstChild);

	// DELETING DATA
	trashButton.addEventListener("click", (e) => {
		e.stopPropagation();
		let id = e.target.parentElement.getAttribute("data-id");
		let confirmation = confirm("Delete?");
		if (confirmation) {
			db.collection("log").doc(id).delete();
		}
	});
}

// REAL TIME LISTENER
db.collection("log")
	.orderBy("datetime")
	.onSnapshot((snapshot) => {
		let changes = snapshot.docChanges();
		changes.forEach((change) => {
			if (change.type == "added") {
				loadLogEntries(change.doc);
			} else if (change.type == "removed") {
				let logDiv = document.querySelector(
					"[data-id=" + change.doc.id + "]"
				);
				logList.removeChild(logDiv);
			}
		});
	});

// END of LOADING DATA

// SAVING DATA

logForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let date = new Date(`${logDate.value}T${logTime.value}:00`);
	let timestamp = firebase.firestore.Timestamp.fromDate(date);
	console.log(timestamp);
	db.collection("log").add({
		datetime: timestamp,
		activity: logForm.activity.value,
		comment: logForm.comment.value,
	});
	logForm.comment.value = "";
	alert("Entry Submitted");
});

// END of SAVING DATA
// END of FIRESTORE FUNCTIONS

// setting Default Time and Date
let currentTimeDate = new Date();
let defMonth;
let defDay;
let defYear;
let defHour;
let defMinute;
// default month
if (currentTimeDate.getMonth() < 9) {
	defMonth = "0" + (currentTimeDate.getMonth() + 1).toString();
} else {
	defMonth = (currentTimeDate.getMonth() + 1).toString();
}
// default day
if (currentTimeDate.getDate() < 10) {
	defDay = "0" + currentTimeDate.getDate().toString();
} else {
	defDay = currentTimeDate.getDate().toString();
}
// default year
defYear = currentTimeDate.getFullYear().toString();

// default hour
if (currentTimeDate.getHours() < 10) {
	defHour = "0" + currentTimeDate.getHours().toString();
} else {
	defHour = currentTimeDate.getHours().toString();
}
// default minutes
if (currentTimeDate.getMinutes() < 10) {
	defMinute = "0" + currentTimeDate.getMinutes().toString();
} else {
	defMinute = currentTimeDate.getMinutes().toString();
}

// Event Listeners

window.addEventListener("load", function defaultDateTime() {
	logDate.value = defYear + "-" + defMonth + "-" + defDay;

	logTime.value = defHour + ":" + defMinute;
});

filterOption.addEventListener("click", filterLog);

// Functions

function filterLog(e) {
	// child elements of logList
	const logEntries = logList.childNodes;
	// for all children of logList
	logEntries.forEach(function (logEntry) {
		// child elements of individual logEntry
		const logListItems = logEntry.childNodes;
		// show list items based on filter option
		switch (e.target.value) {
			case "all":
				logEntry.style.display = "flex";
				break;
			case "with_comment":
				for (const logLi of logListItems) {
					if (logLi.classList.contains("log_comment")) {
						logEntry.style.display = "flex";
						break;
					} else if (logLi.classList.contains("trash_btn")) {
						logEntry.style.display = "none";
					}
				}
				break;
		}
	});
}
