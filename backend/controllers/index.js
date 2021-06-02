const fs = require('fs');
const mysql = require('mysql');
const path = require('path');

//mysql connection
const pool = mysql.createPool({
  connectionLimit:5,
  host: process.env.dbhost,
  user: process.env.dbuser,
  password: process.env.password,
  database: process.env.database

});

//get method
exports.home = (req,res)=>{
  console.log("Hi");
  res.render('index');
}

// post method and database connection
 exports.connectDb = (docFile,loggedUserData)=>{
  
  let fileKeys = Object.keys(docFile);    
  var insertData;
  console.log(fileKeys);
  fileKeys.map((value)=>{  
    insertData = {
      Username: loggedUserData.userId,
      Email_id: " ",
      file_Name: docFile[value].name,
      file_hash: docFile[value].md5,
      file: docFile[value].data,
      valid_upto: "",
      category: 16,
      mst_doc_id:54,
      created_at: new Date(),
      created_by: loggedUserData.userId
    }
  //   console.log(loggedUserData.userId);
   });
  
  console.log(insertData);  
  pool.getConnection((err,connection)=>{
    if(err) console.log('err!!!!!!!!!!!!!!!!!');
    else{
    console.log("Connection made succesfully!!!!!");

    //Inserting
    connection.query('INSERT INTO e_sign_table SET ?',insertData,(err,rows)=>{
    connection.release();
      
    if(!err){        
      console.log(rows);
    }else{        
      console.log(err);
    }
      
    });
    } 
  });
}


