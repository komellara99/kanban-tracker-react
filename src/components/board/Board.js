import React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import './board.css';
import Column from '../column/Column.js';
import  { useState, useEffect } from "react";
import Form from '../form/Form.js';

const Board = () => {
    const [completed, setCompleted] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [backlog, setBacklog] = useState([]);
    const todos = [
        {
            "userId": 1,
            "id": 1,
            "title": "Cook dinner",
            "completed": false,
            "backlog" : false
          },
          {
            "userId": 1,
            "id": 2,
            "title": "Walk dog",
            "completed": true,
            "backlog" : false
          },
          {
            "userId": 1,
            "id": 2,
            "title": "Clean",
            "completed": false,
            "backlog" : true
          },
      ]
    const [list, setList] = useState(todos);

    useEffect(() => {
        setCompleted(list.filter((task) => (task.completed)));
        setIncomplete(list.filter((task) => !task.completed && !task.backlog));
        setBacklog(list.filter((task) => task.backlog && !task.completed));
          
      }, [list]);
      

    
      const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
    
        if (source.droppableId == destination.droppableId) return;
    
        //REMOVE FROM SOURCE ARRAY
    
        if (source.droppableId == 2) {
          setCompleted(removeItemById(draggableId, completed));
        } else if (source.droppableId == 3){
          setBacklog(removeItemById(draggableId, backlog));
        }else {
          setIncomplete(removeItemById(draggableId, incomplete));
        }
    
        // GET ITEM
    
        const task = findItemById(draggableId, [...incomplete, ...completed, ...backlog]);
    
        //ADD ITEM
        if (destination.droppableId == 2) {
          setCompleted([{ ...task, completed: !task.completed }, ...completed]);
        } else if (destination.droppableId == 3){  
            setBacklog([{ ...task, backlog: !task.backlog }, ...backlog])
        } else {
          setIncomplete([{ ...task, completed: !task.completed }, ...incomplete]);
        }
      };
    
      function findItemById(id, array) {
        return array.find((item) => item.id == id);
      }
    
      function removeItemById(id, array) {
        return array.filter((item) => item.id != id);
      }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <h2 className = 'title'>Progress Board 🚀</h2>
            <div className='form'>
                <Form list={list} setList={setList}/>   
            </div>
            <div className = 'board'>
                <Column title={"TO DO 💪🏻"} tasks={incomplete} setList={setList} id={"1"}/>
                <Column title={"DONE 👍🏻"} tasks={completed} setList={setList} id={"2"}/>
                <Column title={"BACKLOG 👋🏻"} tasks={backlog} setList={setList} id={"3"}/>
            </div>
        </DragDropContext>
    )
}
export default Board;