
module.exports = api;

let {Post} = require('../DB/schema');
let randomstring = require('randomstring');

function api(app){
    app.post('/api/posts',(req,res)=>{
        const data = req.body;
        let savePost = new Post({
            id:randomstring.generate(6),
            title:data.title,
            content:data.content,
            created_time:new Date().getFullYear()+"/"+new Date().getMonth()+"/"+new Date().getDate()+" - "+new Date().getHours()+":"+new Date().getMinutes() ,
            updated_time:new Date().getFullYear()+"/"+new Date().getMonth()+"/"+new Date().getDate()+" - "+new Date().getHours()+":"+new Date().getMinutes() ,
        });

        savePost.save((err,model)=>{
            if(err) throw err;
            res.header("Access-Control-Allow-Origin", "*");
            res.status(200).send("Save Success");
        })
    })

    app.get('/api/posts',(req,res)=>{
        Post.find({},(err,model)=>{
            if(err) throw err;
            if(model.length != 0){
                res.status(200).send(model);
            }
            else{
                res.status(404);
            }
        }); 
    });

    app.delete('/api/posts',(req,res)=>{  
        const data = req.query;
        console.log(data)
        Post.deleteOne({id:data.id},(err)=>{
            if(err) throw err;
            res.send(200)
        });
    });
}