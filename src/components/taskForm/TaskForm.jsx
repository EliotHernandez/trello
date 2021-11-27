import React, { useEffect, useState } from "react";
import './TaskForm.scss';

const TaskForm = props => {

    let initialParams = {
        text: props.text ? props.text : '',
        parentId: props.parent ? props.parent : '',
        isOpen: props.isOpen ? props.isOpen : false,
        modifyParent: props.modifyParent
    };

    const [params, setParams] = useState(initialParams);

    useEffect(() => {
        //console.log(params);
    }, [params]);

    const handleToggleClick = () => {
        if (params.isOpen === false) {
            setParams({ ...params, isOpen: !params.isOpen });
        }
    }

    const handleToggleClose = () => {
        setParams({ ...params, isOpen: !params.isOpen });
    }

    const handleChange = event => {
        setParams({ ...params, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        setParams({ ...params, isOpen: !params.isOpen });
        if (params.text) {
            params.modifyParent(params);
        }
    }

    return (
        <div>
            {params.isOpen ? (
                <div className="addTasksForm">
                    <textarea className="taskText" name="text" onChange={handleChange} placeholder="Nueva Tarea..." ></textarea>
                    <div className="row justify-content-center">
                        <button type='button' className="col-4 formButton" value='Crear' onClick={handleSubmit}>Crear</button>
                        <button type='button' className="col-4 formButton" value='Cerrar' onClick={handleToggleClose} >Cerrar</button>
                    </div>
                </div>
            ) : <div className="addTasks" onClick={handleToggleClick}>Añadir Tarea</div>}
        </div>
    )
}

export default TaskForm;