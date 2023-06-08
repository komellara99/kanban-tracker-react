import React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import './column.css';
import Task from '../task/Task.js';

const Column = ({title, tasks, id, setList}) => {
    
    return (
        <div className='container'>
            <h3 className='title'>{title}</h3>
            <Droppable droppableId={id}>
                {(provided, snapshot) => (
                    <div className={`s${id}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                     isDraggingOver={snapshot.isDraggingOver}
                     >
                    {tasks.map((task, index) => (
                        
                       <Task key={index} index={index} task={task} setList={setList}/>
                     
                     ))}
                      {provided.placeholder}

                    </div>
                )}

            </Droppable>
        </div>
    )
}  
export default Column;