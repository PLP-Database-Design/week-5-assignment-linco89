//import my dependencies
const express = require('express')
const app = express()
const mysql =require('mysql2')
const dotenv = require('dotenv')

dotenv.config();

// create a connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.get('', (req,res)  =>{
    db.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients', (err, result) =>{
        if (err) { return res.status(500).send ('error retrieving data')}
        res.status(200).send(result)
    })
})

app.get('', (req, res) =>{
    db.query('SELECT first_name, last_name, provider_specialty FROM providers', (err, result) =>{
        if (err) {return res.status(500).send('error connecting')}
        res.status(200).send(result)
    })
})

app.get('', (req,res) => {
    db.query('SELECT * FROM patients ORDERED BY first_name', (err, result) =>{
        if (err){return res.status(500).send('error connecting')}
         res.status(200).send(result)
    })
})
//test the connection
db.connect((err) =>{
    if(err){
        return console.log("Error connecting")
    }  
     console.log("successfully connected to database")
      
})


app.listen(3300, () =>{
    console.log(`server is working ON http://localhost:${3300}`)
})