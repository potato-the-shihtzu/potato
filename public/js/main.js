// *** Navigation Menu ****
const hamburgerButton = document.querySelector(".nav_button svg");
const navigation = document.querySelector("nav ul");

hamburgerButton.addEventListener("click", function () {
	navigation.classList.toggle("nav_trans");
});

// *** Dog Log ***

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

// Initialize Cloud Firestore
var db = firebase.firestore();

// Selectors

const logDate = document.querySelector("form .log_date");
const logTime = document.querySelector("form .log_time");
const logActivity = document.querySelector("form .log_activity");
const logComment = document.querySelector("form .log_comment");

const logArray = [logDate, logTime, logActivity, logComment];

const logButton = document.querySelector(".log_button");
const logContainer = document.querySelector(".log_container");
const logList = document.querySelector(".log_list");

const filterOption = document.querySelector(".filter_log");

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
	time.textContent = `${rawTime.slice(0, 5)} ${rawTime.slice(9, 11)}`;
	time.className = "log_time";

	// activity

	if (doc.data().emoji !== "" && doc.data().activity !== "") {
		activity.textContent = `${doc.data().emoji} ${doc.data().activity}`;
		activity.className = "log_activity";
	}

	// optional comment

	comment.textContent = doc.data().optional_comment;
	comment.className = "log_comment";

	// Create Trash Button
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash_btn");

	// append items
	let logElements = [date, time, activity, comment, trashButton];

	logElements.forEach((element) => {
		if (element.textContent !== "") {
			logDiv.appendChild(element);
		}
	});

	logList.insertBefore(logDiv, logList.firstChild);

	// // Create each element of logItem
	// for (let i = 0; i < logArray.length; i++) {
	// 	const newLogItem = document.createElement("li");
	// 	if (logArray[i].value !== "") {
	// 		// For date
	// 		if (logArray[i] === logDate) {
	// 			let valYear = logDate.value.slice(2, 4);
	// 			let valMonth = parseInt(logDate.value.slice(5, 7)).toString();
	// 			let valDay = parseInt(logDate.value.slice(8, 10)).toString();
	// 			let formattedDate = valMonth + "/" + valDay + "/" + valYear;
	// 			newLogItem.innerHTML = formattedDate;
	// 			console.log("Current Date: " + formattedDate);
	// 		}
	// 		// for time
	// 		else if (logArray[i] === logTime) {
	// 			let ampm;
	// 			let valHour = logTime.value.slice(0, 2);
	// 			let valMinute = logTime.value.slice(3, 5);
	// 			if (valHour === "00") {
	// 				valHour = "12";
	// 				ampm = "AM";
	// 			} else if (valHour === "12") {
	// 				valHour = "12";
	// 				ampm = "PM";
	// 			} else if (parseInt(valHour, 10) > 12) {
	// 				valHour = (parseInt(valHour, 10) - 12).toString();
	// 				ampm = "PM";
	// 			} else {
	// 				valHour = valHour.slice(1);
	// 				ampm = "AM";
	// 			}
	// 			let formattedTime = valHour + ":" + valMinute + " " + ampm;
	// 			newLogItem.innerHTML = formattedTime;
	// 			console.log("Current Time: " + formattedTime);
	// 		}
	// 		// for activity
	// 		else if (logArray[i] === logActivity) {
	// 			newLogItem.innerHTML = logActivity.value.replace(/_/g, " ");
	// 		}
	// 		// for optional comment
	// 		else if (logArray[i] === logComment) {
	// 			newLogItem.innerHTML = logComment.value;
	// 		}
	// 		newLogItem.classList.add(logArray[i].className);
	// 		logDiv.appendChild(newLogItem);
	// 	}
	// }

	// Append to List
	logList.insertBefore(logDiv, logList.firstChild);
}
db.collection("log")
	.get()
	.then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			loadLogEntries(doc);
			console.log(doc.data().datetime.toDate().toDateString());
			console.log(doc.data().datetime.toDate().toLocaleTimeString());
		});
	});
// SAVING DATA

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
// logButton.addEventListener("click", addLogEntry);
logList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterLog);

// Functions

function deleteCheck(event) {
	const logItem = event.target;
	// Delete logEntry
	if (logItem.classList[0] === "trash_btn") {
		var confirmation = confirm("Are you sure you want to delete?");
		if (confirmation) {
			const parentLogItem = logItem.parentElement;
			// Animation
			parentLogItem.classList.add("fall");
			window.setTimeout(function () {
				parentLogItem.remove();
			}, 1000);
		}
	}
}

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
