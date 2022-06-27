var express = require('express');
var router = express.Router();
var con = require('../node_modules/config/config')

/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/home', function(req, res, next) {
  res.render('home');
});

router.post('/userlogin', function(req,res,next){
  console.log(req.body)
  var sql = "insert into userdata set ?"
  var data = req.body;
  con.query(sql,data,(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log("data inserted")
    }
  })

  
});
router.post('/urlogin', function(req,res,next){
  console.log(req.body)
  var sql = "select * from userlogin where email = ? and password = ?"
  var email = req.body.email;
  var password = req.body.password;
  con.query(sql,[email,password],(err,result)=>{
    if(err){
      console.log(err)
    }else{
      console.log(result)
      if(result.length > 0){
        console.log("successfully logged in")
        var user = result[0];
        res.render('home',{user})
      }else{
        console.log("Invalid username or password")
        res.redirect('/login')
      }
     }
  })
}); 


module.exports = router;

