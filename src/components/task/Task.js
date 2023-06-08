import React from 'react';
import {Draggable} from 'react-beautiful-dnd';
import './task.css';
import {Avatar, Image} from 'antd';

function bgcolorChange(props) {
    return props.isDragging
      ? "lightgreen"
      : props.isDraggable
      ? props.isBacklog
        ? "#F2D7D5"
        : "#DCDCDC"
      : props.isBacklog
      ? "#F2D7D5"
      : "#EAF4FC";
  }
  

const Task = ({task, index, setList}) => {
    const del = () => {
        setList((prevList) => prevList.filter((obj) => obj.id !== task.id));
    }
    
    return (
        <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
            {(provided, snapshot) => (
        <div className='container'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div className='x'>
          <div className='tasktitlec'>
            <div className='tasktitle'><b>{task.title}</b></div>
            </div>
          <button onClick={del} className='del-button'>Delete</button>
          
          <div className= 'icons'>
            <div>
              <Avatar
                onClick={() => console.log(task)}
                src={"https://joesch.moe/api/v1/random?key=" + task.userId}
              />
            </div>
          </div>
          {provided.placeholder}
        </div>
        </div>
      )}
        </Draggable>
    )
}
export default Task;