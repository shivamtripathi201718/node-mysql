var express=require('express')
var app=express();
var bp=require('body-parser')

app.set("view engine",'ejs')
var mysql=require('mysql');
var faker=require('faker');
var connection=mysql.createConnection({
    host:'localhost',
    user:'shivam',
    database:'colt',
    port:'3306'
})
// var q='SELECT * FROM users'
// // var q='INSERT INTO users (email) VALUES ("hi@gmail.com")';
// connection.query(q,function(err,res,feild){
//     if(err)  throw err;
//     console.log(res.length);
// })
app.use(bp.urlencoded({extended:true}))

// var data = [];
// for(var i = 0; i < 50; i++){
//     data.push([
//         faker.internet.email(),
//         faker.date.past()
//     ]);
// }


// var q = 'INSERT INTO users (email, created_at) VALUES ?';

// connection.query(q, [data], function(err, result) {
//   console.log(err);
//   console.log(result);
// });
// app.get('/',(req,res)=>{
//     var q='SELECT COUNT(*) AS count FROM users'
//     connection.query(q, function(err, result) {
//         if(err) console.log("HI err")
//         res.send(result[0].count);
          
//         });

// })
app.get("/", function(req, res){
    var q = 'SELECT COUNT(*) as count FROM users';
    connection.query(q, function (error, results) {
    if (error) throw error;
    var msg = "We have " + results[0].count + " users";
    // res.send(msg);
    res.render("base.ejs",{count:results[0].count})
    });
   });
   app.post('/register', function(req,res){
    var person = {email: req.body.email};
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
    console.log(err);
    console.log(result);
    res.redirect("/");
    });
   });


app.listen(8090)
