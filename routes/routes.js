const ObjectID = require("mongodb").ObjectID;
const PROJECT = "project-collection";
const TRANSACTION = "transaction-collection";
const USER = "user-collection";

module.exports = function(app, db) {
    

  /*-------------------------- PROJECT---------------------------------- */

  // post request to create new project
  app.post("/api/project", (req, res) => {
    const body = req.body;
    if (body && body.projectName && body.startDate && body.users) {
      const collection = db.collection(PROJECT);
      collection
        .insert({
          projectName: body.projectName,
          startDate: body.startDate,
          users: body.users, // array of users
          isCompleted: false
        }) // insert
        .then(result => {
          res.send({
            status: "success",
            message: "new project created"
          });
          console.log(result);
        })
        .catch(err => {
          res.status(400).send({
            status: "db_error", // check if it will be called a db error or not
            message: err
          });
        });
    } else {
      res.status(400).send({
        status: "error",
        message: "required fields cannot be empty"
      });
    }
  });

  // get request to get individual or group project data
  app.get("/api/project/:projectId?", (req, res) => {
    const collection = db.collection(PROJECT);
    const projectId = req.params.projectId;
    if (projectId) {
      const projObj = { _id: new ObjectID(projectId) };

      collection
        .find(projObj)
        .toArray()
        .then(data => {
          res.send({
            message: "success",
            data: data
          });
        })
        .catch(err => {
          res.status(400).send({
            status: "error",
            message: err
          });
        });
    } else {
      // if project id is not defined
      collection
        .find({})
        .toArray()
        .then(data => {
          res.send({
            message: "success",
            data: data
          });
        });
    }
  });

  app.put("/api/project/:projectId", (req, res) => {
    const body = req.body;
    const projectid = req.params.projectId;
    console.log("body is =" + body);
    if (body) {
      const collection = db.collection(PROJECT);
      collection
        .updateOne(
          { _id: new ObjectID(projectid) }, // filter
          { $set: { isCompleted: body.isCompleted }
         },
        )
        .then(result => {
          res.status(200).send({
            message: "successfully updated",
            data: result
          });
        })
        .catch(error => {
          res.status(400).send({
            message: "update failed",
            error: error
          });
        });
    }
  });

  // delete api

  app.delete("/api/project/:projectId?", (req, res) => {
    // get from DB when no ID is there
    const collection = db.collection(PROJECT);
    const projectId = req.params.projectId;
    if (projectId) {
      const delObj = { _id: new ObjectID(projectId) };
      collection
        .deleteOne(delObj)
        .then(
          res.send({
            message: "success",
            deletedCount: "1"
          })
        )
        .catch(err => {
          res.status(400).send({
            status: "error",
            message: err
          });
        });
    } else {
      collection.remove({}).then(
        res.send({
          status: "success",
          message: "all projects cleared"
        })
      );
    }
  });

  /*-------------------------- TRANSACTION ---------------------------------- */

  // post request to create new transaction
  app.post("/api/transaction", (req, res) => {
    const body = req.body;
    if (body && body.project_id) {
      const collection = db.collection(TRANSACTION);
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();

      let Timestamp = mm + "/" + dd + "/" + yyyy;
      collection
        .insert({
          project_id: body.project_id,
          description: body.description,
          type: body.type,
          amount: body.amount,
          source: body.source,
          timestamp: Timestamp
        }) // insert
        .then(result => {
          res.send({
            status: "success",
            message: "new transaction added"
          });
          console.log(result);
        })
        .catch(err => {
          res.status(400).send({
            status: "db_error", // check if it will be called a db error or not
            message: err
          });
        });
    } else {
      res.status(400).send({
        status: "error",
        message: "required fields cannot be empty"
      });
    }
  });

  // get request to get individual or project transaction
  app.get(
    "/api/transaction/:transactionId?/:projectId?/:type?/",
    (req, res) => {
      const collection = db.collection(TRANSACTION);
      const transactionId = req.query.transactionId;
      const projectId = req.query.projectId;
      const type = req.query.type;

      if (transactionId) {
        const transId = { _id: new ObjectID(transactionId) };

        collection
          .find(transId)
          .toArray()
          .then(data => {
            res.send({
              message: "success",
              data: data
            });
          })
          .catch(err => {
            res.status(400).send({
              status: "error",
              message: err
            });
          });
      }
      if (projectId && type) {
        const searchObj = { project_id: projectId, type: type };
        collection
          .find(searchObj)
          .toArray()
          .then(data => {
            res.send({
              message: "success",
              data: data
            });
          })
          .catch(err => {
            res.status(400).send({
              status: "error",
              message: err
            });
          });
      }
      if (projectId) {
        const projObj = { project_id: projectId };
        collection
          .find(projObj)
          .toArray()
          .then(data => {
            res.send({
              message: "success",
              data: data
            });
          })
          .catch(err => {
            res.status(400).send({
              status: "error",
              message: err
            });
          });
      }
      if (type) {
        const tranType = { type: type };
        collection
          .find(tranType)
          .toArray()
          .then(data => {
            res.send({
              message: "success",
              data: data
            });
          })
          .catch(err => {
            res.status(400).send({
              status: "error",
              message: err
            });
          });
      } else {
        // if project id is not defined
        collection
          .find({})
          .toArray()
          .then(data => {
            res.send({
              message: "success",
              data: data
            });
          });
      }
    }
  );

  app.put("/api/transaction/:transactionId", (req, res) => {
    const body = req.body;
    const transactionId = req.params.transactionId;
    if (body) {
      const collection = db.collection(TRANSACTION);
      collection
        .updateOne(
          { _id: new ObjectID(transactionId) }, // filter
          { $set: { amount: body.amount } }
        )
        .then(result => {
          res.status(200).send({
            message: "successfully updated",
            data: result
          });
        })
        .catch(error => {
          res.status(400).send({
            message: "update failed",
            error: error
          });
        });
    }
  });

  // delete api

  app.delete("/api/transaction/:transactionId?", (req, res) => {
    // get from DB when no ID is there
    const collection = db.collection(TRANSACTION);
    const transactionId = req.params.transactionId;
    if (transactionId) {
      const delObj = { _id: new ObjectID(transactionId) };
      collection
        .deleteOne(delObj)
        .then(
          res.send({
            message: "success",
            deletedCount: "1"
          })
        )
        .catch(err => {
          res.status(400).send({
            status: "error",
            message: err
          });
        });
    } else {
      collection.remove({}).then(
        res.send({
          status: "success",
          message: "all transactions cleared"
        })
      );
    }
  });

/*--------------------------USER------------------------- */
db.createCollection( "user-collection", {
    validator: { $jsonSchema: {
       bsonType: "object",
       required: [ "username","email", "password" ],
       properties: {
          username: {
             bsonType: "string",
             description: "must be a string and is required"
          },
          email: {
             bsonType : "string",
             pattern : "@ledger\.com$", //"@mongodb\.com$"
             description: "must be a string and match the regular expression pattern"
          },
          password: {
            bsonType: "string",
            description: "must be a string and is required"
          },
          projects:{
            bsonType:"array",
            description: "must be a object"
          }
       }
    } },
    validationAction: "error" // "warn" to allow wrong entries with warning
 } )
 db.collection('user-collection').createIndex( { "email": 1 }, { unique: true } )

    app.post('/api/user/login',(req,res)=>{
        let email = req.body.email;
        let password = req.body.password;
  
        const collection = db.collection(USER);
        collection.findOne({email:email, password:password}, (err,user)=>{
            if(err){
                console.log(err);
                return res.status(500).send(err);
            }

            if(!user){
                return res.status(404).send("please register first");
            }
            req.session.user = user;
            return res.status(200).send("Successful login");
        })

    })

    app.get('/api/user/logout/', (req,res)=>{
        req.session.destroy();
        return res.status(200).send("user session killed");
    })
  
    app.post("/api/user/register",(req,res)=>{

        let body =  req.body;

        const collection = db.collection(USER);
        collection.insertOne({
            username:body.username,
            email:body.email,
            password:body.password,
        })
        .then(result =>{
          res.send({
            status:"success",
            message:"new user added",
          });
            console.log(result);
        })
        .catch(err =>{
            res.status(400).send({
                status:"db_error",
                message: err
            })
        })
    })

    app.get('/api/user/dashboard',(req,res)=>{
        if(!req.session.user){
            return res.status(401).send("Session Expired");
        }

        return res.status(200).send(req.session.user);
    })

    app.put('/api/user',(req,res)=>{
    const body = req.body;
    const userId = body.userId;
    const name = body.name;
    const startDate =Date.now();
    const status = "ongoing"
    if (body) {
      const collection = db.collection(USER);
      collection
        .updateOne(
          { _id: new ObjectID(userId) }, // filter
          { $push: { projects:{
            // id: new ObjectID(_id)
            name:name,
            startDate:startDate,
            status:status
          }} }
        )
        .then(result => {
          res.status(200).send({
            message: "new project added sucessfully",
            data: result
          });
        })
        .catch(error => {
          res.status(400).send({
            message: "update failed",
            error: error
          });
        });
    }
    })


  /*------------------------TOOLS------------------------- */

  // app.get('api/tools/profitLoss/:projectId',(req,res)=>{
  //     const collection = db.collection(TRANSACTION);
  //     const projectId = req.params.projectId;

  //     if(projectId){
  //         const projObj = {'project_id': projectId};
  //         collection.find(projObj).toArray().then(data =>{
  //             // data.forEach(element => {
  //                 // console.log(element);
  //                 res.send({
  //                     message:'success',
  //                     data:data
  //                 })
  //             // });
  //         })
  //     }
  // })

  
};
