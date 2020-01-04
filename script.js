const hostURL = "https://nameless-wave-18089.herokuapp.com/";
// const hostURL = "https://localhost:3000/" // local host
const mainTable = document.getElementById("main-table");
const incomeTable = document.getElementById("income-table");
const expenseTable = document.getElementById("expense-table");

async function fetchTransaction(projectId = " ", type = " ") {
  // return todo data object
  let res = await fetch(
    hostURL +
      "api/transaction?" +
      "projectId=" +
      projectId.toString() +
      "&type=" +
      type
  );
  let data = await res.json();
  // console.log(data);
  return data;
}

async function displayTransaction() {
  let transactionData = await fetchTransaction(12345);
  let transactionList = transactionData.data;
  transactionList.forEach(createTransaction);
}

async function displayIncome() {
  console.log("income requested");
  let transactionData = await fetchTransaction(12345, "income");
  let transactionList = transactionData.data;
  transactionList.forEach(createIncome);
}

async function displayExpense() {
  console.log("expense requested");
  let transactionData = await fetchTransaction(12345, "expense");
  let transactionList = transactionData.data;
  transactionList.forEach(createExpense);
}

async function createTransaction(transaction) {
  let table = document.getElementById("main-table");
  let row = document.createElement("tr");
  let source = document.createElement("td");
  source.innerText = transaction.source;
  let description = document.createElement("td");
  description.innerText = transaction.description;
  let type = document.createElement("td");
  type.innerText = transaction.type;
  let amount = document.createElement("td");
  amount.innerText = transaction.amount + "  ₹";
  let timestamp = document.createElement("td");
  if (transaction.type == "income") {
    amount.classList.add("income");
  }
  if (transaction.type == "expense") {
    amount.classList.add("expense");
  }
  timestamp.innerText = transaction.timestamp;
  row.append(source);
  row.appendChild(description);
  row.appendChild(type);
  row.appendChild(amount);
  row.appendChild(timestamp);
  table.appendChild(row);
}

async function createIncome(transaction) {
  let table = document.getElementById("income-table");
  let row = document.createElement("tr");
  let source = document.createElement("td");
  source.innerText = transaction.source;
  let description = document.createElement("td");
  description.innerText = transaction.description;
  let type = document.createElement("td");
  type.innerText = transaction.type;
  let amount = document.createElement("td");
  amount.innerText = transaction.amount + "  ₹";
  let timestamp = document.createElement("td");
  amount.classList.add("income");
  timestamp.innerText = transaction.timestamp;
  row.append(source);
  row.appendChild(description);
  row.appendChild(type);
  row.appendChild(amount);
  row.appendChild(timestamp);
  table.appendChild(row);
}

async function createExpense(transaction) {
  let table = document.getElementById("expense-table");
  let row = document.createElement("tr");
  let source = document.createElement("td");
  source.innerText = transaction.source;
  let description = document.createElement("td");
  description.innerText = transaction.description;
  let type = document.createElement("td");
  type.innerText = transaction.type;
  let amount = document.createElement("td");
  amount.innerText = transaction.amount + "  ₹";
  let timestamp = document.createElement("td");
  amount.classList.add("expense");
  timestamp.innerText = transaction.timestamp;
  row.append(source);
  row.appendChild(description);
  row.appendChild(type);
  row.appendChild(amount);
  row.appendChild(timestamp);
  table.appendChild(row);
}

displayTransaction();
displayIncome();
displayExpense();

async function cashInHand(projectId) {
  // console.log(hostURL+"api/transaction?projectId="+projectId)
  let projData = await fetch(
    hostURL + "api/transaction?projectId=" + projectId
  );
  let projDataJson = await projData.json();
  console.log(projDataJson);
  let cash = 0;
  let income = 0;
  let expense = 0;
  projDataJson.data.forEach(data => {
    // console.log(data);
    if (data.type == "income") {
      income = income + Number(data.amount);
    } else {
      expense = expense + Number(data.amount);
    }
  });
  cash = income - expense;
  let profitPer = ((cash / income) * 100).toFixed(2);
  document.getElementById("balance").innerText = cash.toString() + "  ₹";
  document.getElementById("cash-bar").value = cash.toString();
  document.getElementById("cash-bar").max = income.toString();
  document.getElementById("profit").innerText = profitPer.toString() + " %";
  document.getElementById("totalIncome").innerText = income.toString() + "  ₹";
  document.getElementById("totalExpense").innerText =
    expense.toString() + "  ₹";

  return cash;
}

cashInHand("12345");

const sliderBtn = document.getElementById("btn-slider");
function showAll() {
  mainTable.style.left = "0vw";
  incomeTable.style.left = "100vw";
  expenseTable.style.left = "200vw";
  sliderBtn.style.left = "0px";
}
function showIncome() {
  mainTable.style.left = "-100vw";
  incomeTable.style.left = "0vw";
  expenseTable.style.left = "100vw";
  sliderBtn.style.left = "90px";
}
function showExpense() {
  mainTable.style.left = "-200vw";
  incomeTable.style.left = "-100vw";
  expenseTable.style.left = "0vw";
  sliderBtn.style.left = "200px";
}

var modal = document.getElementById("new-transaction-modal");

// Get the button that opens the modal
var btn = document.getElementById("add-transaction");

// Get the <close> element that closes the modal
var close = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
};

// When the user clicks on <close> (x), close the modal
close.onclick = function() {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let transForm = document.getElementById("transactionForm");
transForm.addEventListener("submit", submitForm);

async function submitForm() {
  event.preventDefault();
  let formElem = document.forms.transactionForm.elements;

  try {
    console.log("adding transaction");

    let data = JSON.stringify({
      project_id: formElem.project_id.value,
      type: formElem.type.value,
      amount: formElem.amount.value,
      description: formElem.description.value,
      source: formElem.source.value
    });
    let res = await fetch(hostURL + "api/transaction/", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    });
    let dataJson = await res.json();
    console.log("Success:", JSON.stringify(dataJson));
    // return dataJson;
  } catch (error) {
    console.error("Error:", error);
  }
  
  modal.style.display = "none";
  window.location.reload();
}
