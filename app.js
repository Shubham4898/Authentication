
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const userData = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw())

const check = (name) =>{
   for(let i=0;i<userData.size;i++){
      console.log(`comparing ${userData[i].username} with {name}`)
      if(userData[i].username == name){
         return true;
      }
   }

   return false;
}

app.post("/register",(req,res) => {
   console.log(req.body);
   if(check(req.body.username)){
      res.sendStatus(400);
      
   }

   const currentUser = req.body;

   userData.push(currentUser);
   res.send({message: "Successfully registered!"});


})

console.log(userData);
app.listen(7050,()=>{
   console.log('app is working');
})
