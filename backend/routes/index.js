const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyparser = require('body-parser');

const icontrollers = require('../controllers/index');
const router = express.Router();

router.get('/', icontrollers.home);

router.post('/userdocument',(req,res)=>{
    //console.log(req.files);
    if(!req.files){
        res.render('index',{
            msg: "Error: No file selected, Please select a file"
        });
    }
    else{
        const uploadedFile = req.files.document;
        console.log(uploadedFile);
        //console.log(uploadedFile);
        const allowedExtensions = /pdf|doc|docx/;
        const extname = path.extname(uploadedFile.name);
        const fileSize = uploadedFile.size;
        const maxAllowedSize = 1024*1024*100;
        if(!allowedExtensions.test(extname)){
            res.render('index',{
                msg: `You have uploaded a file with extension ${extname}, Please a upload either a pdf or a doc file`
            })
        }
        else if(fileSize>maxAllowedSize){
            res.render('index',{
                msg: "The file uploaded is too large!! Please try again with a smaller file size"
            });
        }
        else{
            const docFile = {uploadedFile:uploadedFile};
            const loggedUserData ={userId: req.body.name,
            // userEmail: req.body.emailId 
            };
            
            icontrollers.connectDb(docFile,loggedUserData);
            // res.render('uploaded',{
            //     msg: "Enjoy!!!",
            //     file: `${uploadedFile.name}`
            // });
            res.send('hi')
        }
        
    }
    
});

module.exports = router;
