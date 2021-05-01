
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

app.get('/profiles',(req,res)=>{
   const users = JSON.parse(JSON.stringify(userData));
   for(let i=0;i<users.length;i++){
       delete users[i].password;
   }

   res.json(users);

})

app.put('/profile',(req,res) => {
   let isValid = false;
   let indexarray = -1;

   for(let i=0;i<userData.length;i++){
      const currentUser = userData[i].username;
      const currentPass = userData[i].password;
      if(req.body.username === currentUser && req.body.password === currentPass){
         isValid = true;
         indexarray = i;
         break;
      }
      
      if(!isValid){
         res.status(401).json({message : "Invalid username or password"});
      }
      else{

         userData[i].name = req.body.name;
         userData[i].college = req.body.college
         res.status(201).json({message : "Updated successfully"})

      }


   }
   
   



})

console.log(userData);
app.listen(7050,()=>{
   console.log('app is working');
})
