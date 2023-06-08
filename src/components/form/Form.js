import React from 'react';
import './form.css';
import {useState} from 'react';
 
const Form = ({list, setList}) => {
    const [formData, setFormData] = useState({
        title : '',
        option: 1
      });

    const handleAdd = () => {
        const data = {
        "userId": 1,
        "id": 1,
        "title": "",
        "completed": false,
        "backlog" : false
    }
    data.title = formData.title;
    if (formData.option==2){
        data.completed= true;
    }else if (formData.option==3){
         data.backlog=true;
    }
    const prev = list || [];
    const maxId = prev.length > 0 ? Math.max(...prev.map(obj => obj.id)) : 0;
    data.id = maxId + 1;

    return data;

    }

    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    
        const newObject = handleAdd(); 
    
        setList((prev) => [...prev, newObject]); 
    
        console.log(list);
        setFormData({
            title: '',
            option: '1'
        });
    };
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
    return (
        <div className='form-cont'>
            <h3>Add a new task! </h3>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="name" className='form-items'>Task:</label>
                <input type="text" id="name" name="title" className='form-items' value={formData.title} onChange={handleChange}/>

                <label htmlFor="options" className='form-items'>Options:</label>
                <select id="options" name="option" className='form-items' value={formData.option} onChange={handleChange}>
                    <option value="1" default>To do</option>
                    <option value="2">Done</option>
                    <option value="3">Backlog</option>
                </select>

                <input type="submit" value="Add" className='form-items'/>
            </form>
        </div>
    );
}
export default Form;