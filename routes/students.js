var crypto = require('crypto');
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.connect('mongodb://viber_app:akshat@ds053449.mongolab.com:53449/viber_prod');
var studentSchema = require('../models/studentmodel.js');
var Students = studentSchema.student;





exports.findAll = function (req, res, next) {
    var name = req.query.name;
     
    if (name) {
        
        Students.findOne({'email': name},function(err,student) {
           // return (employee.firstName + ' ' + employee.lastName).toLowerCase().indexOf(name.toLowerCase()) > -1;
           console.log(student);
            console.log("data")
           if(student){
               var resarry=[student];
               res.send(resarry);
           }
           else res.send('No Data found');
        });
    } else {
        
      var q=  Students.find({}).sort({'updatedon':-1}).limit(50).select('facebookid name email location.name rolename role');
      q.exec(function(err,Students){
           
           if(!err)
           {
                    res.send(JSON.stringify(Students));
                    
           }
           else
           {
               res.send(err);
               console.log(err);
           }
            
        });
        
        
    }
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    
     var q=  Students.find({'email': id}).sort({'updatedon':-1}).limit(50);
      q.exec(function(err,Students){
           
           if(!err && Students.length > 0)
           {
                    var algorithm = 'bf'; // or any other algorithm supported by OpenSSL
                    var key = 'blableblablu';
                    var cipher = crypto.createCipher(algorithm, key);

                    var encrypted = cipher.update(Students[0].facebookid, 'utf8', 'hex') + cipher.final('hex');
                    Students[0] = Students[0].toObject();
                    Students[0]["encr"]=encrypted;
                    console.log(Students[0]["encr"]);

                    res.send(Students[0]);

           }
           else 
           {        console.log(err);
                    res.send(err);
           }
            
        });
    
    
};

exports.findReports = function (req, res, next) {
    var email = req.params.email;
    
    
    
      var q=  Students.find({'manager.email': email}).sort({'updatedon':-1});
      q.exec(function(err,Students){
           
           if(!err)
           {
                    
                    res.send(JSON.stringify(Students));
                    
           }
           else console.log(err);
           res.send(err);
            
        });
    
    
};

exports.zonalmanagers = function (req, res, next) {
    var q=  Students.find({"role":3}).sort({'updatedon':-1});
    q.exec(function(err,Students){

        if(!err)
        {

            res.send(Students);

        }
        else
        {
            res.send(err);
            console.log(err);
        }

    });
};

exports.projectmanagers = function (req, res, next) {
    var q=  Students.find({"role":2}).sort({'updatedon':-1});
    q.exec(function(err,Students){

        if(!err)
        {

            res.send(Students);

        }
        else
        {
            res.send(err);
            console.log(err);
        }

    });
};