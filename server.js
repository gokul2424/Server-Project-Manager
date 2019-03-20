var express = require('express')
var app = express()
var repo=require('./repo')
var bodyParser=require('body-parser');
var cors=require('cors');
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/task', function (req, res)
{
    repo.findtask((err,data)=>
	{
        res.json(data);
    });
})

app.get('/user', function (req, res)
{
    repo.finduser((err,data)=>
	{
        res.json(data);
    });
})
app.get('/user/:user_id', function (req, res) {
    var id=req.params.user_id
    console.log(id)
    repo.finduserspecific(id,(err,data)=>{
        console.log(data)
        res.json(data);
    });
})
app.get('/project', function (req, res)
{
    repo.findproject((err,data)=>
	{
        res.json(data);
    });
})
 
 
app.post('/tasks', function (req, res) 
{
    var content=req.body
    console.log(content)
	
	var par={"parenttask":content.parenttask}
	
	var statetask={
		"taskname":content.taskname,
		"parenttask":content.parenttask,
		"priority":content.priority,
		"startdate":content.startdate,
		"enddate":content.enddate,
		"state":true}
	
	repo.insertparent(par,(result)=>
	{
		console.log("Inserted the document in parent")
    })
    repo.inserttask(content,(result)=>
	{
		console.log("Inserted the document in task collection")
    })
	repo.insertstate(statetask,(result)=>
	{
		res.status(201).json({message:"Inserted the document in finally collection with state"})
    })
})


app.post('/projects', function (req, res) 
{
    var content=req.body
    console.log(content)
	console.log(content.startdate)
	
	var pars={
		"projectname":content.projectname,
		"priority":content.priority,
		"startdate":content.startdate,
		"enddate":content.enddate,
		"flag":true
		}
	
	
	repo.insertproject(content,(result)=>
	{
		console.log("Inserted the document in task collection in project collection")
		
    })
	repo.insertproject2(pars,(result)=>
	{
		res.status(201).json({message:"Inserted the document in project collection with flag"})
    })
})


app.post('/users', function (req, res) 
{
    var content=req.body
    console.log(content)
	
	repo.insertuser(content,(result)=>
	{
		res.status(201).json({message:"Inserted the document in Users collection"})
    })
})


app.delete('/tasks/:taskname', function (req, res) 
{
	var taskname=req.params.taskname
	repo.deletetask(taskname,(result)=>
	{
		res.status(202).json({message:"Deleted the document",taskname:taskname})
	})
})
 
 
 app.delete('/employees/:firstname', function (req, res) {
        var firstname=req.params.firstname
        repo.deleteemployee(firstname,(result)=>{
        res.status(202).json({message:"Deleted the document",firstname:firstname})
        })
})


 app.delete('/projects/:projectname', function (req, res) {
        var projectname=req.params.projectname
        repo.deleteproject(projectname,(result)=>{
        res.status(202).json({message:"Deleted the document",projectname:projectname})
        })
})


app.put('/edittasks', function (req, res) 
{
    var body=req.body;
    console.log(req.body)
    console.log(body.taskname)
    repo.updatetask(body,(result)=>
	{
		res.status(202).json({message:"updated the document",})
	})
})

app.put('/editprojects', function (req, res) 
{
    var body=req.body;
	
    console.log(req.body)
    console.log(body.projectname)
    repo.updateproject(body,(result)=>
	{
		res.status(202).json({message:"updated the document in project",})
	})
})


app.put('/editusers/:id', function (req, res) 
{
    var body=req.body;
	var id=req.params.id;
    console.log(req.body)
    console.log(body.firstname)
    repo.updateuser(body,id,(result)=>
	{
		res.status(202).json({message:"updated the document in user",})
	})
})



app.put('/endtasks', function (req, res) 
{
    var body=req.body;
    console.log(req.body)
    console.log(body.taskname)
    repo.endtask(body,(result)=>
	{
		res.status(202).json({message:"ended the task",})
	})
})




app.put('/endprojects', function (req, res) 
{
    var body=req.body;
    console.log(req.body)
    console.log(body.projectname)
    repo.endproject(body,(result)=>
	{
		res.status(202).json({message:"ended the task",})
	})
})

app.listen(7001,()=>console.log("Listening to port 7001..."))//