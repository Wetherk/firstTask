const addBtn = document.getElementById('add_btn');
const sortByNameBtn = document.getElementById('name_sort');
const sortBySurNameBtn = document.getElementById('surname_sort');
const sortByDateBtn = document.getElementById('date_sort');
const sortByWeightBtn = document.getElementById('weight_sort');
const table = document.getElementById('info_table');
let personArr = [];
let defaultArr = [];
let sortPropCheck = 0;
let sortStatus = 0;

// functions
function addInfoToObj() {
 const nameInput = document.getElementById('name_input');
 const surNameInput = document.getElementById('surname_input');
 const dateInput = document.getElementById('date_input');
 const weightInput = document.getElementById('weight_input');
 let personObj = {};

 personObj.name = nameInput.value;
 personObj.surname = surNameInput.value;
 personObj.dateofbirth = dateInput.value;
 personObj.weight = weightInput.value;

 return personObj;
}

function tableCreate(arr){
 for (let i = 0; i < arr.length; i++) {
  let row = table.insertRow(i + 1);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  cell1.innerHTML = arr[i].name;
  cell2.innerHTML = arr[i].surname;
  cell3.innerHTML = arr[i].dateofbirth;
  cell4.innerHTML = arr[i].weight;
  // Delete btn
  let btn = document.createElement('button');
  btn.innerHTML = 'x';
  btn.classList.add('delete_btn')
  btn.addEventListener('click', () => deletingRow(btn));
  row.appendChild(btn);
 }
}

function deletingRow(r) {
 let i = r.parentNode.rowIndex;
 table.deleteRow(i);
 personArr = personArr.reverse();
 personArr.splice([i - 1], 1);
 personArr = personArr.reverse();
 defaultArr = [...personArr];
}

function deleteTable(length){
 for (let i = length; i > 0;i--){
  table.deleteRow(i);
 }
}

function check(arr) {
 if (arr.length > 6) {
  console.log('too many users. removing first added');
  personArr.shift();
 }
}

function sortArr(arr, prop) {
 if (prop != sortPropCheck) sortStatus = 0;

 if (arr.length > 1
   && sortStatus != 'sorted1'
   && sortStatus !='sorted2'){
  arr.sort((a, b) => (a[prop] > b[prop]) ? 1 : -1);
  sortStatus = 'sorted1';
  sortPropCheck = prop;
  return arr;
 }

 if (sortStatus === 'sorted1'){
  sortStatus = 'sorted2'
  return arr.reverse();
 }

 if (sortStatus === 'sorted2') {
  sortStatus = 0;
  return defaultArr;
 }
}

// Core code
addBtn.addEventListener('click',()=>{
 personArr.push(addInfoToObj());
 if (personArr.length > 1) deleteTable(personArr.length-1);
 check(personArr);
 defaultArr = [...personArr];
 tableCreate(personArr);
})

sortByNameBtn.addEventListener('click',()=>{
 if (personArr.length > 1) {
  deleteTable(personArr.length);
  tableCreate(sortArr(personArr, 'name'));
 }
})

sortBySurNameBtn.addEventListener('click',()=>{
 if (personArr.length > 1){
  deleteTable(personArr.length);
  tableCreate(sortArr(personArr, 'surname'));
 } 
})

sortByDateBtn.addEventListener('click',()=>{
 if (personArr.length > 1){
  deleteTable(personArr.length);
  tableCreate(sortArr(personArr, 'dateofbirth'));
 } 
})

sortByWeightBtn.addEventListener('click',()=>{
 if (personArr.length > 1){
  deleteTable(personArr.length);
  tableCreate(sortArr(personArr, 'weight'));
 } 
})
