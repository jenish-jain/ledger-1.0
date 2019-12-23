const hostURL = "https://nameless-wave-18089.herokuapp.com/";
// const hostURL = "https://localhost:3000/"

async function fetchTransaction(filter) {   // return todo data object
    //   console.log('fetching all todos');
    let res = await fetch(hostURL +"api/transaction?");
    let data = await res.json();
    // console.log(data);
    return data
  }

async function displayTransaction(){
  let transactionData = await fetchTransaction("projectId=12345");
  let transactionList = transactionData.data;
  transactionList.forEach(createTransaction);
}

async function createTransaction(transaction){

    let table = document.getElementById("main-table");
    let row = document.createElement('tr');
    let source = document.createElement('td');
    source.innerText = transaction.source;
    let description = document.createElement('td');
    description.innerText = transaction.description;
    let type = document.createElement('td');
    type.innerText = transaction.type;
    let amount = document.createElement('td');
    amount.innerText = transaction.amount + "  ₹";
    let timestamp = document.createElement('td');
    if(transaction.type == "income"){
      amount.classList.add("income");
    }if(transaction.type == "expense"){
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

displayTransaction();


async function cashInHand(projectId){
  console.log(hostURL+"api/transaction?projectId="+projectId)
  let projData = await fetch(hostURL + "api/transaction?projectId=" + projectId);
  let projDataJson = await projData.json();
  console.log(projDataJson);
  let cash = 0;
  let income = 0;
  let expense = 0;
  projDataJson.data.forEach(data =>{
    // console.log(data);
    if(data.type == "income"){
      income = income + Number(data.amount);
    }else{
      expense = expense + Number(data.amount);
    }
  })
  cash = income - expense;
  document.getElementById("cash-in-hand").innerText = cash.toString();
  document.getElementById("cash-bar").value = cash.toString();
  document.getElementById("cash-bar").max = income.toString();
  return cash;
}

cashInHand("12345");
