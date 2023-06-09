
const express = require("express")
const bodyParser = require("body-parser")
let items  = []
let workItems  = []
const app = express()
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))
app.set('view engine',"ejs");

app.get("/",function(req,res){
    
    let today = new Date();
    // This code gives us the current day of the week in a string format
    // const options = { weekday: 'long' };
    // const day = today.toLocaleString('en-US', options);
    // -----------------------------------------------------------------
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    let day = today.toLocaleDateString("en-US",options)
    res.render("list",{listTitle: day,items: items})
})

app.post("/",function(req,res){
    let item = req.body.task;
    if (req.body.list ===  "Work List"){
        workItems.push(item)
        res.redirect("/work")
    }else{
        items.push(item)
    }
    res.redirect("/");
})

app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",items:workItems});
})

app.post("/work",function(req,res){
    const item = req.body.task
    workItems.push(item)
    res.redirect("/work")
})

app.get("/about",function(req,res){
    res.render("about")
})


app.listen("3000",function(){
    console.log("Server started on port 3000")
})