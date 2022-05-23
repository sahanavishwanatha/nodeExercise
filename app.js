const Joi = require('joi');
const express = require('express');
const app = express();



app.use(express.json());
const contacts= [
    {id:1, name:"John doe"},
    {id:2, name:"Max Muller"},
    {id:3, name:"Mary Thomas"}
]

// app.get('/',(req,res) =>{
//     res.send('Hello Wrld');
// })

app.get('/api/contacts' ,(req,res)=>{
    res.send(contacts)
});

app.get('/api/contacts/:id',(req,res)=>{
   const contact =  contacts.find(c => c.id === parseInt(req.params.id));
   if(!contact) return res.status(404).send("The contact was not found");
   res.send(contact);
})


app.post('/api/contacts',(req,res) =>{

    const result = validateContact(req.body);
    if(result.error){
       return res.status(400).send(result.error.details[0].message);
   
    }
    const contact = {
        id: contacts.length +1,
        name:req.body.name
    };
    contacts.push(contact);
    res.send(contact);
})


app.put('/api/contacts/:id',(req,res)=>{

    const contact =  contacts.find(c => c.id === parseInt(req.params.id));
   if(!contact) return res.status(404).send("The contact was not found");

   const result = validateContact(req.body);
 
if(result.error){
    return res.status(400).send(result.error.details[0].message);
   
}

contact.name = req.body.name;

res.send(contact);

})

app.delete('/api/contacts/:id',(req,res)=>{
    const contact =  contacts.find(c => c.id === parseInt(req.params.id));
    if(!contact) return res.status(404).send("The contact was not found");
 
   const index = contacts.indexOf(contact)
   contacts.splice(index,1);

   res.send(contact);
 
 
})


function validateContact(contact){
    const schema = {
        name: Joi.string().min(3).required()
    };
    
    return Joi.validate(contact, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));