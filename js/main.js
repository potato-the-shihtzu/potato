// *** Navigation Menu ****
const hamburgerButton = document.querySelector(".nav_button svg");
const navigation = document.querySelector("nav ul");

hamburgerButton.addEventListener("click", function () {
	navigation.classList.toggle("nav_trans");
});

// *** Dog Log ***

// Selectors

const logDate = document.querySelector("form .log_date");
const logTime = document.querySelector("form .log_time");
const logActivity = document.querySelector("form .log_activity");
const logComment = document.querySelector("form .log_comment");

const logParamaters = [logDate, logTime, logActivity, logComment];

const logButton = document.querySelector(".log_button");
const logContainer = document.querySelector(".log_container");
const logList = document.querySelector(".log_list");

const filterOption = document.querySelector(".filter_log");

// Event Listeners
window.addEventListener("load", defaultDateTime);
logButton.addEventListener(
	"click",
	addLogEntry(e, formattedDate, formattedTime)
);
logList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterLog);

// Functions

function defaultDateTime() {
	// setting Default Time and Date
	let currentTimeDate = newDate();

	if (currentTimeDate.getMonth() < 9) {
		let month = 0(currentTimeDate.getMonth() + 1);
	}
	// setting formatted Time and Date
	let formattedDate = "";
	return formattedDate, formattedTime;
}

function addLogEntry(event, formattedDate, formattedTime) {
	// Prevent form from submitting
	event.preventDefault();
	// Create logEntry div
	const logDiv = document.createElement("div");
	logDiv.classList.add("log_entry");

	// Create each element of logItem

	for (let i = 0; i < logParamaters.length; i++) {
		const newLogItem = document.createElement("li");
		if (logParamaters[i].value !== "") {
			// For date
			if (logParamaters[i] === logDate) {
				newLogItem.innerHTML = formattedDate;
			}
			// for time
			else if (logParamaters[i] === logTime) {
				newLogItem.innerHTML = formattedTime;
			}
			// for activity
			else if (logParamaters[i] === logActivity) {
				newLogItem.innerHTML = logActivity.value.replace(/_/g, " ");
			}
			// for optional comment
			else if (logParamaters[i] === logComment) {
				newLogItem.innerHTML = logComment.value;
			}
			newLogItem.classList.add(logParamaters[i].className);
			logDiv.appendChild(newLogIem);
		}
	}

	// Create Trash Button
	const trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add("trash_btn");
	logDiv.appendChild(trashButton);
	// Append to List
	logList.appendChild(logDiv);

	// Clear log input value
	// for (let i = 0; i < logParamaters.length; i++) {
	// 	logParamaters[i].value = "";
	// }
}

function deleteCheck(event) {
	const logItem = event.target;
	// Delete logEntry
	if (logItem.classList[0] === "trash_btn") {
		const parentLogItem = logItem.parentElement;
		// Animation
		parentLogItem.classList.add("fall");
		window.setTimeout(function () {
			parentLogItem.remove();
		}, 1000);
	}
}

function filterLog(e) {
	// child elements of logList
	const logEntries = logList.childNodes;
	// for all children of logList
	logEntries.forEach(function (logEntry) {
		// child elements of individual logEntry
		const logListItems = logEntry.childNodes;
		console.log(logEntry);
		console.log(logListItems);
		console.log(e.target.value);
		// show list items based on filter option
		switch (e.target.value) {
			case "all":
				logEntry.style.display = "flex";
				break;
			case "with_comment":
				for (const logLi of logListItems) {
					console.log(logLi);
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
