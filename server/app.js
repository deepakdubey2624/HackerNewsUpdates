const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const Datastore = require('nedb');
const database = new Datastore('users.db');
const db = new Datastore("./database.db");
database.loadDatabase();
db.loadDatabase();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/register', function(req, res) {
    const { fullname, email, password } = req.body;
// database.findOne({ email: email }, function(err, doc) {
//     if (err) {
//         console.log("Error ocured while finding user",err);
//         res.status(500).send("Error finding user please try again.");
//       }else{
//         console.log('Found user:', doc);
//         res.status(200).send("User Already Exist!");
//         return;
//       }
    
// });

    database.insert({fullname,email, password},function(err, doc) {
        if (err) {
            console.log("Error ocured while Register",err);
            res.status(500).send("Error registering new user please try again.");
          } else {
            console.log('Inserted', doc, 'with ID', doc._id);
            res.status(200).send("Welcome to the club!");
          }
        
    });

  });


app.post('/api/login', function(req, res) {
    const { email, password } = req.body;
    database.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user || user.password !== password) {
        res.status(401)
          .json({
          error: 'Incorrect email or password'
        });
      } else {
        console.log("Hello User!");
        res.status(200)
          .json({
          data: 'Logged In !'
        });
      }
    });
  });

  app.get('/api/data', function (req, res) {

    db.find({}, function (err,docs){
      if (err) {
        console.log("Error ocured while Register",err);
        res.status(500).send("Error getting data please try again.");
      } else {
        console.log("All data",docs);//all docs
        res.status(200)
          .json(docs);
      }
      
  });

  });

  app.post('/api/update', function(req, res){
   const {  _id, read} = req.body;
   db.update({ _id: _id }, { $set: { "read": read} }, {}, function (err, numReplaced) {
    if (err) {
      console.log("Error ocured while updating data",err);
      res.status(500).send("Error updating data please try again.");
    } else {
      console.log("Data replaced",numReplaced);
      res.status(200)
        .json(numReplaced);
    }
    
  });
  });

app.listen(process.env.PORT || 3001);
console.log("Server running at 3001");