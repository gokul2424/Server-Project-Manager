const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'tasks';

function connect(callback)
{
    MongoClient.connect("mongodb://localhost:27017/dbName", 
	{ 
        useNewUrlParser: true 
	},
	function(err, client) 
		{
		assert.equal(null, err);
		console.log("Connected successfully to server");
		if(err)
		{
			callback(err,null)
		}	
		else
		{
			callback(null,client)
		}
 
    });
}

function findtask(callback)
{
	connect((err,client)=>
	{
		const db = client.db(dbName);
		//Collection Name
		const collection = db.collection('state');
		// Find some documents
		collection.find({}).toArray(function(err, docs) 
		{
			assert.equal(err, null);
			console.log("Found the following task");
			client.close();
			callback(null,docs);
		});
   })
   
}
function finduserspecific(id,callback){
    console.log(id)
    
    connect((err,client)=>{const db = client.db(dbName);
        const collection = db.collection('user');
       
       
        // Find some documents
        collection.find({"_id": new ObjectId(id)}).toArray(function(err, docs) {
          assert.equal(err, null);
          console.log("Found the following user");
          client.close();
         callback(null,docs);
        });
       })
       
    }
function finduser(callback)
{
	connect((err,client)=>
	{
		const db = client.db(dbName);
		//Collection Name
		const collection = db.collection('user');
		// Find some documents
		collection.find({}).toArray(function(err, docs) 
		{
			assert.equal(err, null);
			console.log("Found the following user employee");
			client.close();
			callback(null,docs);
		});
   })
   
}
function findproject(callback)
{
	connect((err,client)=>
	{
		const db = client.db(dbName);
		//Collection Name
		const collection = db.collection('projectflag');
		// Find some documents
		collection.find({}).toArray(function(err, docs) 
		{
			assert.equal(err, null);
			console.log("Found the following project");
			client.close();
			callback(null,docs);
		});
   })
   
}

function inserttask(body,callback)
{
    console.log(typeof(body));
	
    connect((err,client)=>
	{
        const db = client.db(dbName);
        const collection = db.collection('task');
         //Insert one document in task collection
		collection.insertOne(body,(err,result) => 
		{
			console.log("Inserted the task")
			client.close();
			callback(result);
		});
   
    })
       
}
	
function insertparent(body,callback)
{
    console.log(typeof(body));
	
    connect((err,client)=>
	{
        const db = client.db(dbName);
        const collection = db.collection('parent');
         //Insert one document in parent collection
		collection.insertOne(body,(err,result) => 
		{
			console.log("Inserted the parent")
			client.close();
			callback(result);
		});

    })
       
}

function insertstate(body,callback)
{
    console.log(typeof(body));
	
    connect((err,client)=>
	{
        const db = client.db(dbName);
        const collection = db.collection('state');
         //Insert one document in state collection to check for state true or false
		collection.insertOne(body,(err,result) => 
		{
			console.log("Inserted the state")
			client.close();
			callback(result);
		});

    })
       
}



function insertuser(body,callback)
{
    console.log(typeof(body));
	
    connect((err,client)=>
	{
        const db = client.db(dbName);
        const collection = db.collection('user');
         //Insert one document in user collection
		collection.insertOne(body,(err,result) => 
		{
			console.log("Inserted the User")
			client.close();
			callback(result);
		});
   
    })
       
}

function insertproject(body,callback)
{
    console.log(typeof(body));
	
    connect((err,client)=>
	{
        const db = client.db(dbName);
        const collection = db.collection('project');
         //Insert one document in project collection
		collection.insertOne(body,(err,result) => 
		{
			console.log("Inserted the Project")
			client.close();
			callback(result);
		});
   
    })
       
}

function insertproject2(body,callback)
{
    console.log(typeof(body));
	
    connect((err,client)=>
	{
        const db = client.db(dbName);
        const collection = db.collection('projectflag');
         //Insert one document in project collection
		collection.insertOne(body,(err,result) => 
		{
			console.log("Inserted the Project with flag")
			client.close();
			callback(result);
		});
   
    })
       
}
	
function deleteemployee(firstname,callback)
{
        connect((err,client)=>
		{
            const db = client.db(dbName);
            const collection = db.collection('user');
		    //delete one document
            collection.deleteOne({ firstname:firstname }, function(err, result) 
			{
                console.log("Removed the document with the field a equal to "+firstname);
                callback(result);
			});
    })
}	
	
	
	
function deletetask(taskname,callback)
{
        connect((err,client)=>
		{
            const db = client.db(dbName);
            const collection = db.collection('state');
		    //delete one document
            collection.deleteOne({ taskname:taskname }, function(err, result) 
			{
                console.log("Removed the document with the field a equal to "+taskname);
                callback(result);
			});
    })
}



function deleteproject(projectname,callback)
{
        connect((err,client)=>
		{
            const db = client.db(dbName);
            const collection = db.collection('project');
		    //delete one document
            collection.deleteOne({ projectname:projectname }, function(err, result) 
			{
                console.log("Removed the document with the field a equal to "+projectname);
                callback(result);
			});
    })
}



function updatetask(body,callback)
{
    connect((err,client)=>
	{
        const db = client.db(dbName);
        
		const collection1 = db.collection('state');
        //collection.find({'a': 3}).toArray(function(err, docs) {
          //console.log(docs);
          //});
          //update one document
        collection1.updateOne({taskname:body.taskname}, 
		{ 
			$set: 
			{ 
			   taskname:body.taskname,
			   priority:body.priority,
			   parenttask:body.parenttask,
			   startdate:body.startdate,
			   enddate:body.enddate,
			   state:true
			} 
		},
        //collection.find({'a': 3}).toArray(function(err, docs) {
          //console.log(docs);
          //});
          //update one document
         
		function(err, result) 
		{
            console.log("Updated the document with the field a equal to 2");
            console.log(result)
            callback(result);
        });  
     
    })
	
}


function updateproject(body,callback)
{
    connect((err,client)=>
	{
		
        const db = client.db(dbName);
        
		const collection1 = db.collection('projectflag');
        //collection.find({'a': 3}).toArray(function(err, docs) {
          //console.log(docs);
          //});
          //update one document
        collection1.updateOne({projectname:body.projectname}, 
		{ 
			$set: 
			{ 
			   projectname:body.projectname,
			   priority:body.priority,
			   startdate:body.startdate,
			   enddate:body.enddate,
			   flag:true
			} 
		},
        //collection.find({'a': 3}).toArray(function(err, docs) {
          //console.log(docs);
          //});
          //update one document
         
		function(err, result) 
		{
            console.log("Updated the document with the field a equal to 2");
            console.log(result)
            callback(result);
        });  
     
    })
	
}


function updateuser(body,id,callback)
{
    connect((err,client)=>
	{
		console.log(id)
        const db = client.db(dbName);
        
		const collection1 = db.collection('user');
        //collection.find({'a': 3}).toArray(function(err, docs) {
          //console.log(docs);
          //});
          //update one document
        collection1.updateOne({_id:new ObjectId(id)}, 
		{ 
			$set: 
			{ 
			   firstname:body.firstname,
			   lastname:body.lastname,
			   employeeid:body.employeeid
			} 
		},
        //collection.find({'a': 3}).toArray(function(err, docs) {
          //console.log(docs);
          //});
          //update one document
         
		function(err, result) 
		{
            console.log("Updated the document with the field a equal to 2");
            console.log(result)
            callback(result);
        });  
     
    })
	

}




function endtask(body,callback)
{
    connect((err,client)=>
	{
        const db = client.db(dbName);
        const collection = db.collection('state');
        //collection.find({'a': 3}).toArray(function(err, docs) {
          //console.log(docs);
          //});
          //update one document
        collection.updateOne({taskname:body.taskname}, 
		{ 
			$set: 
			{ 
			   taskname:body.taskname,
			   priority:body.priority,
			   parenttask:body.parenttask,
			   startdate:body.startdate,
			   enddate:body.enddate,
			   state:false
			} 
		}, 
		function(err, result) 
		{
            console.log("Ended the task with the field a equal to 2");
            console.log(result)
            callback(result);
        });  
     
    })
}

function endproject(body,callback)
{
    connect((err,client)=>
	{
        const db = client.db(dbName);
        const collection = db.collection('projectflag');
        //collection.find({'a': 3}).toArray(function(err, docs) {
          //console.log(docs);
          //});
          //update one document
        collection.updateOne({projectname:body.projectname}, 
		{ 
			$set: 
			{ 
			   projectname:body.projectname,
			   priority:body.priority,
			   startdate:body.startdate,
			   enddate:body.enddate,
			   flag:false
			} 
		}, 
		function(err, result) 
		{
            console.log("Ended the project with the field a equal to 2");
            console.log(result)
            callback(result);
        });  
     
    })
}

module.exports={
		findtask,findproject,finduser,
		finduserspecific,
		inserttask,insertparent,insertstate,insertproject,insertuser,insertproject2,
		deletetask,deleteemployee,deleteproject,
		updatetask,updateuser,updateproject,
		endtask,endproject}
