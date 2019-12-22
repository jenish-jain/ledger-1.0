const express = require('express');
const middlewares = require("./routes/middleware");
const routes = require('./routes/routes.js');
const mongodb = require('mongodb');
const DB_URI = 'mongodb+srv://jenish:Juju6397@cluster0-e1fiw.mongodb.net/test?retryWrites=true&w=majority';
const app = express();

const port = process.env.PORT || 3000;

//defining midlewares

app.use(express.json());
app.use(middlewares.preventCROS);

// app.get('/',(req,res)=>{
//     res.sendFile('E:/juju/Newton School/Assignments/ledger/index.html');
// });

console.log('checking connecton to DB...');
mongodb.MongoClient.connect(DB_URI,(error,dbClient)=>{
    if(error){
        console.log('error coneecting to dbClient ', error);
        return
    }
    //on successful connnection
    console.log('Successfully connected to database');
    const database = dbClient.db('ledger'); // database name
    routes(app,database)
    app.listen(port,()=>{
        console.log(`Listening to server at ${port}`);
    })
})