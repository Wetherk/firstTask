const addBtn = document.getElementById("add_btn");
const form = document.getElementById("form");

// technical variables
let personArr = [];
let defaultArr = [];
let sortPropCheck = 0;
let sortStatus = 0;

// functions
function addInfoToObj() {
	const nameInput = document.getElementById("name_input").value;
	const surNameInput = document.getElementById("surname_input").value;
	const dateInput = document.getElementById("date_input").value;
	const weightInput = document.getElementById("weight_input").value;
	let personObj = {};

	for (let i = 0; i < personArr.length; i++) {
		if (
			personArr[i].name === nameInput &&
			personArr[i].surname === surNameInput &&
			personArr[i].dateofbirth === dateInput &&
			personArr[i].weight === weightInput
		) {
			return "error";
		}
	}

	if (nameInput && surNameInput && dateInput && weightInput) {
		personObj.name = nameInput;
		personObj.surname = surNameInput;
		personObj.dateofbirth = dateInput;
		personObj.weight = weightInput;

		return personObj;
	}
	return 0;
}

function tableCreate(arr) {
	// Create Header
	let header = document.createElement("h2");
	let headerText = document.createTextNode("Added People:");
	let tableBox = document.getElementById("header_div");
	let tableRow = document.createElement("tr");

	header.setAttribute("id", "table_header");
	header.appendChild(headerText);
	tableBox.appendChild(header);

	// Create Table
	let tableCell1 = document.createElement("th");
	let tableCell2 = document.createElement("th");
	let tableCell3 = document.createElement("th");
	let tableCell4 = document.createElement("th");

	let infoBox = document.getElementById("info_table");

	let nameSortBtn = document.createElement("button");
	let surNameSortBtn = document.createElement("button");
	let dateSortBtn = document.createElement("button");
	let weightSortBtn = document.createElement("button");

	let text1 = document.createTextNode("FirstName");
	let text2 = document.createTextNode("LastName");
	let text3 = document.createTextNode("DateOfBirth");
	let text4 = document.createTextNode("Weight");

	nameSortBtn.innerHTML = "Sort";
	nameSortBtn.classList.add("sort_btn");
	tableCell1.appendChild(nameSortBtn);

	surNameSortBtn.innerHTML = "Sort";
	surNameSortBtn.classList.add("sort_btn");
	tableCell2.appendChild(surNameSortBtn);

	dateSortBtn.innerHTML = "Sort";
	dateSortBtn.classList.add("sort_btn");
	tableCell3.appendChild(dateSortBtn);

	weightSortBtn.innerHTML = "Sort";
	weightSortBtn.classList.add("sort_btn");
	tableCell4.appendChild(weightSortBtn);

	tableCell1.appendChild(text1);
	tableCell2.appendChild(text2);
	tableCell3.appendChild(text3);
	tableCell4.appendChild(text4);

	tableRow.appendChild(tableCell1);
	tableRow.appendChild(tableCell2);
	tableRow.appendChild(tableCell3);
	tableRow.appendChild(tableCell4);

	infoBox.appendChild(tableRow);

	nameSortBtn.addEventListener("click", () => {
		if (personArr.length > 1) {
			deleteTable(personArr.length);
			tableCreate(sortArr(personArr, "name"));
		}
	});

	surNameSortBtn.addEventListener("click", () => {
		if (personArr.length > 1) {
			deleteTable(personArr.length);
			tableCreate(sortArr(personArr, "surname"));
		}
	});

	dateSortBtn.addEventListener("click", () => {
		if (personArr.length > 1) {
			deleteTable(personArr.length);
			tableCreate(sortArr(personArr, "dateofbirth"));
		}
	});

	weightSortBtn.addEventListener("click", () => {
		if (personArr.length > 1) {
			deleteTable(personArr.length);
			tableCreate(sortArr(personArr, "weight"));
		}
	});
	for (let i = 0; i < arr.length; i++) {
		let row = infoBox.insertRow(i + 1);

		let cell1 = row.insertCell(0);
		let cell2 = row.insertCell(1);
		let cell3 = row.insertCell(2);
		let cell4 = row.insertCell(3);

		cell1.innerHTML = arr[i].name;
		cell2.innerHTML = arr[i].surname;
		cell3.innerHTML = arr[i].dateofbirth;
		cell4.innerHTML = arr[i].weight;

		// Delete btn
		let btn = document.createElement("button");
		btn.innerHTML = "x";
		btn.classList.add("delete_btn");
		btn.addEventListener("click", () => {
			deletingRow(btn);
			if (personArr.length === 0) deleteTable(0);
		});
		row.appendChild(btn);
	}
}

function deletingRow(r) {
	const table = document.getElementById("info_table");
	let i = r.parentNode.rowIndex;
	table.deleteRow(i);
	personArr.splice([i - 1], 1);

	defaultArr = [...personArr];
	localStorage.clear();
	localStorageAdd(personArr);
}

function deleteTable(length) {
	const table = document.getElementById("info_table");
	const tableHeader = document.getElementById("table_header");

	for (let i = length; i >= 0; i--) {
		table.deleteRow(i);
	}
	tableHeader.remove();
}

function check(arr) {
	if (arr.length > 6) {
		console.log("too many users. removing first added");
		personArr.shift();
	}
}

function sortArr(arr, prop) {
	if (prop != sortPropCheck) sortStatus = 0;

	if (
		arr.length > 1 &&
		sortStatus != "sorted1" &&
		sortStatus != "sorted2"
	) {
		arr.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
		sortStatus = "sorted1";
		sortPropCheck = prop;
		if (prop == "weight" || prop == "date") {
			arr.reverse();
		}
		return arr;
	}

	if (sortStatus === "sorted1") {
		sortStatus = "sorted2";
		return arr.reverse();
	}

	if (sortStatus === "sorted2") {
		sortStatus = 0;
		return defaultArr;
	}
}

function localStorageAdd(arr) {
	for (let i = 0; i < arr.length; i++) {
		localStorage.setItem(`user${i}`, JSON.stringify(personArr[i]));
	}
}

function localStorageGet() {
	if (localStorage.length > 0) {
		let arr = [];
		for (let i = 0; i < localStorage.length; i++) {
			arr.push(JSON.parse(localStorage.getItem(`user${i}`)));
		}
		return arr;
	}
}

// Core code
if (localStorage.length > 0 && personArr.length === 0) {
	personArr = [...localStorageGet()];
	defaultArr = [...personArr];
	tableCreate(personArr);
}

form.onsubmit = (event) => {
	if (addInfoToObj() === "error") {
		const errorDiv = document.getElementById("error");
		const error = document.createElement("p");
		const errorText = document.createTextNode(
			"Person Already exists!!!"
		);

		if (!errorDiv.hasChildNodes()) {
			error.classList.add("error_style");
			error.appendChild(errorText);
			errorDiv.appendChild(error);
		}

		event.preventDefault();
		return 0;
	}
	personArr.push(addInfoToObj());
	if (personArr.length > 0) {
		if (personArr.length > 1) deleteTable(personArr.length - 1);
		check(personArr);
		defaultArr = [...personArr];
		localStorage.clear();
		localStorageAdd(personArr);
		if (personArr.length > 0) {
			tableCreate(personArr);
		}
	}
};
