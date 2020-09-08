// *** Navigation Menu ****
const hamburgerButton = document.querySelector(".nav_button svg");
const navigation = document.querySelector("nav ul");

hamburgerButton.addEventListener("click", function () {
	navigation.classList.toggle("nav_trans");
});

// *** Dog Log ***

// Selectors
const logDate = document.querySelector(".log_date");
const logTime = document.querySelector(".log_time");
const logActivity = document.querySelector(".log_activity");
const logComment = document.querySelector(".log_comment");

const logEntry = [logDate, logTime, logActivity, logComment];

const logButton = document.querySelector(".log_button");
const logContainer = document.querySelector(".log_container");
const logList = document.querySelector(".log_list");

// Event Listeners
logButton.addEventListener("click", addLogEntry);
logList.addEventListener("click", deleteCheck);
// Functions
function addLogEntry(event) {
	// Prevent form from submitting
	event.preventDefault();
	// Create logEntry div
	const logDiv = document.createElement("div");
	logDiv.classList.add("log_entry");

	// Create each element of logItem
	for (var i = 0; i < logEntry.length; i++) {
		if (logEntry[i].value !== "") {
			const newLogItem = document.createElement("span");
			console.log((newLogItem.innerHTML = logEntry[i].value.replace("_", " ")));
			console.log(newLogItem.classList.add("log_item"));
			console.log(logDiv.appendChild(newLogItem));
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
	for (var i = 0; i < logEntry.length; i++) {
		logEntry[i].value = "";
	}
}

function deleteCheck(event){
	const item = event.target;
	// Delete logEntry
	if (item.classList[0] === "trash_btn")

}
