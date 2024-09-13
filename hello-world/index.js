let form = document.getElementById("forms");
form.addEventListener("submit", saveData);

displayData();
let entries = retriveData();

/* Save Data to localStorage */
function saveData(event) {
    entries = retriveData();
  event.preventDefault();

  let userName = document.getElementById("name").value;
  let userEmail = document.getElementById("email").value;
  let userPass = document.getElementById("password").value;
  let userDOB = document.getElementById("dob").value;

  let checkBoxs = document.getElementById("user-check").checked;

  let objs = {
    userName,
    userEmail,
    userPass,
    userDOB,
    checkBoxs,
  };

//   console.log(objs.checkBoxs);
// console.log(entries);
// console.log(typefories);

entries.push(objs);
entries = JSON.stringify(entries);
  localStorage.setItem("user-datas", entries);
  displayData();
//   dateCAlculator();
}

//Retrive data forn localstorege
function retriveData() {
  let Entrys = localStorage.getItem("user-datas");

  if (Entrys) {
    Entrys = JSON.parse(Entrys);
  } else {
    Entrys = [];
  }
  return Entrys;
}

// calculate age
function dateCAlculator(Today, enterDate) {
  let y2 = Today.getFullYear();
  let y1 = enterDate.getFullYear();

  let m2 = Today.getMonth();
  let m1 = Today.getMonth();

  let d2 = Today.getDate();
  let d1 = enterDate.getDate();

  let age = y2 - y1;
  m3 = m2 - m1;
  if (m3 < 0 || (m3 === 0 && d2 < d1)) {
    age--;
  }
  return age;
}

let dates = document.getElementById("dob");
dates.addEventListener("change", () => {
  let [year, month, date] = document
    .getElementById("dob")
    .value.split("-");

  let enterDate = new Date(year, month, date);
  let Today = new Date();
  let age = dateCAlculator(Today, enterDate);

  if (age < 18 || age > 55) {
    dates.setCustomValidity("Your age is must be in between of 18 and 55");
    return;
  } else {
    dates.setCustomValidity("");
  }
});

//Display date int table from in page
function displayData() {
  Entrys = retriveData();
  console.log(Entrys);

  let tableData = Entrys.map((entry) => {
    const row = `<tr>
            <td>${entry.userName}</td>
            <td>${entry.userEmail}</td>
            <td>${entry.userPass}</td>
            <td>${entry.userDOB}</td>
            <td>${entry.checkBoxs}</td>
            </tr>`;

    return row;
  }).join("\n");

  let div = document.getElementById("tableData");
  div.innerHTML = `<table class="table" border="2">
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>dob</th>
    <th>accepted terms?</th>
    </tr>
    ${tableData}
    </table>`;
}
