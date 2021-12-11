import express from "express";
import mongoose from "mongoose";
import TodoModel from './schemas/todo_schemas.js';

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://agyemang_estther:esta7804@cluster0.fzz9u.mongodb.net/myTask?retryWrites=true&w=majority',
    { useUnifiedTopology: true 
    }).then(() => {
         console.log('Connected to MongoDB successfully')
         }) .catch((err)=>{
             console.log(err)})
           
   //get all todos
    app.get('/todos',async(req,res)=>{
        try {
            const todos = await TodoModel.find({});
            return res.status(200).json({
                status: true,
                message: 'Todos fetched succeffully',
                data:todos 
            })
        } catch (error) {
            console.log('Something went wrong',error);
            res.status(400).send('failed to fetch todos',error)

        }
    })
    
    //create a Todo
    app.post('/todos',async(req,res)=>{
        try {
            const newTodo = await TodoModel.create({...req.body})
            res.status(201).json({
                status: true,
                message:'Todo created Successfully',
                data:newTodo
            })
        } catch (error) {
             console.log('Something went wrong',error);
            res.status(400).send('failed to fetch todos',error)

        }})

        //delete a todo 
        app.delete('/todos/:id',async(req,res)=>{
            try {
                const {id} = req.params;
                const deleteTodo = await TodoModel.findByIdAndDelete(id);
                return res.status(201).json({
                    message: 'Todo deleted Successfully'
                })
            } catch (error) {
                console.log("Something went wrong",error);
            }
        })


    app.listen(3000)    