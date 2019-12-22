const hostURL = "https://nameless-wave-18089.herokuapp.com/";

async function fetchTransaction() {   // return todo data object
    //   console.log('fetching all todos');
    let res = await fetch(hostURL +"api/transaction/");
    let data = await res.json();
    // console.log(data);
    return data
  }

async function displayTransaction(){
  let transactionData = await fetchTransaction();
  let transactionList = transactionData.data;
  transactionList.forEach(createTransaction);
}


async function createTransaction(transaction){

    let table = document.getElementById('main-table');
    let row = document.createElement('tr');
    let source = document.createElement('td');
    source.innerText = transaction.source;
    let description = document.createElement('td');
    description.innerText = transaction.description;
    let type = document.createElement('td');
    type.innerText = transaction.type;
    let amount = document.createElement('td');
    amount.innerText = transaction.amount;
    let timestamp = document.createElement('td');
    timestamp.innerText = transaction.timestamp;
    row.append(source);
    row.appendChild(description);
    row.appendChild(type);
    row.appendChild(amount);
    row.appendChild(timestamp);
    table.appendChild(row);

}

displayTransaction();
