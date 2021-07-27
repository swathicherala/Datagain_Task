var express=require('express');
var app=express();
var mysql=require('mysql');
var path=require('path');
var ejs=require('ejs');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Swathi@13091996',
    database:'taxdatabase'
});
 conn.connect(function(err,result){
   if(err) throw err;
  console.log('Connected Successfully');
 });
 
 app.get('/',function(req,res){
    res.render('home');
});

app.post('/tax',function(req,res){
    var year=req.body.year;
    var date=req.body.date;
    var jurisdiction=req.body.jurisdiction;
    var client=req.body.client;
    var parcel=req.body.parcel;
    var status=req.body.status;
    var letter=req.body.letter;
    var target=req.body.target;
    var hearing=req.body.hearing;
    var sql="insert into taxdetails(taxyear,hearingdate,jurisdiction,clientname,parcelid,appealstatus,appealletter,target,hearing)values('"+year+"','"+date+"','"+jurisdiction+"','"+client+"','"+parcel+"','"+status+"','"+letter+"','"+target+"','"+hearing+"')";
    conn.query(sql,function(err,result){
        if(err) throw err;
        console.log('Inserted Successfully');
        res.redirect('/')
    });
});

app.get('/retrieve',function(req,res){
    var sql="select * from taxdetails";
    conn.query(sql,function(err,result){
        if(err) throw err;
        res.render('crud',{
            emp:result
        })
    })
})

app.get("/updateemp",function(req,res){
    res.render('update');
});

app.post('/update',function(req,res){
    var empid=req.body.empid;
    var year=req.body.year;
    var date=req.body.date;
    var jurisdiction=req.body.jurisdiction;
    var client=req.body.client;
    var parcel=req.body.parcel;
    var status=req.body.status;
    var letter=req.body.letter;
    var target=req.body.target;
    var hearing=req.body.hearing;
    var sql="update taxdetails set taxyear='"+year+"',hearingdate='"+date+"',jurisdiction='"+jurisdiction+"',clientname='"+client+"',parcelid='"+parcel+"',appealstatus='"+status+"',appealletter='"+letter+"',target='"+target+"',hearing='"+hearing+"' where id='"+empid+"'";
    conn.query(sql,function(err,result){
        if(err) throw err;
        console.log("Record Updated");
        res.redirect('/retrieve');
    })
})


app.get('/delete',function(req,res){
    res.render('delete')
});

app.post('/delete',function(req,res){
    var id=req.body.id;
    conn.connect(function(err){
        var sql="delete from taxdetails where id='"+id+"'";
        conn.query(sql,function(err,result){
            if(err) throw err;
            console.log('Record Deleted');
            res.redirect('retrieve');
        })
    })
})
 app.listen(3000);
console.log('Listening to port number 3000');