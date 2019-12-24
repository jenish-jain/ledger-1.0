Ledger
======

application feature
-------------------
- [ ] add a home pade to describe the application

- [x]  allows users to make different project
  
- [x]  allows user to maintain seperate records for income and expense in
    individual tables

- [ ]  calculates profit / loss for the overall project

- [ ]  allows mixed view , expense view, income view as filter selected

- [x]  records time stamp for individual entries automatically/ but also editable[not editabletime stamp]


### optional features

- [ ] allows transaction to be associated with custom tags

- [ ] support multiple project screens

- [ ] allow multi user/ teams login


data format
-----------

### for storing user transactions

```json

{   
    // "project-id": [number/string],
    "project_id":[number],
    "currency":[rupee/usd],
    "data":[
        {
            "transaction_id": [integer],
            "descripton":[string],
            "type": [income/expense],
            "amount":[float],
            "currency":[rupee/usd], ? should add this here or define globally
            "source":[string], // for income
            "recipient": [string], // for expense
            "timestamp":[data/time],
        },
    ],
    "message": "success";
}

```

### for storing user/ project info

```json
{
    "team_id":[number],
    "project_id":[number],
    "project_name":[string],
    "start_date":[date],
    "status":[ongoing/completed],
    "end_date":[date] // after completion
}
```
### data structure


>> ## PROJECT
>>> ### Project-info
>>>> project id
>>>> start date
>>>> completion status
>>>> users associated array
>>> ### Users [object]
>>>> username
>>>> userid
>>>> email id
>>>> project id array
>>> ### Transaction [object]
>>>> project id
>>>> user id
>>>> transactionId
>>>> type
>>>> tag
>>>> source / recipent

