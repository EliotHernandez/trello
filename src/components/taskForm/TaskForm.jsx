import React, { useEffect, useState } from "react";
import './TaskForm.scss';

const TaskForm = props => {

    let initialParams = {
        text: props.text ? props.text : '',
        parentId: props.parent ? props.parent : '',
        isOpen: props.isOpen ? props.isOpen : false,
        taskId: props.taskId ? props.taskId : "",
        modifyParent: props.modifyParent,
        deleteParent: props.deleteParent
    };

    const [params, setParams] = useState(initialParams);

    useEffect(() => {
        // console.log(params);
    }, [params]);

    const handleToggleClick = () => {
        if (params.isOpen === false) {
            setParams({ ...params, isOpen: !params.isOpen });
        }
    }

    const handleToggleClose = () => {
        setParams({ ...params, isOpen: !params.isOpen });
        params.modifyParent(params);
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

    const handleDelete = event => {
        handleToggleClose();
        params.deleteParent(params);
    }

    const updateForm = (params) => {
        return (
            <div className="addTasksForm">
                <textarea className="taskText" name="text" onChange={handleChange} value={params.text} ></textarea>
                <div className="row justify-content-center">
                    <button type='button' className="col-4 formButton" value='Actualizar' onClick={handleSubmit}>Actualizar</button>
                    <button type='button' className="col-4 formButton delete" value='Eliminar' onClick={handleDelete}>Eliminar</button>
                    <button type='button' className="col-4 formButton" value='Cerrar' onClick={handleToggleClose} >Cerrar</button>
                </div>
            </div>
        )
    }

    const createForm = (params) => {
        return (
            <div className="addTasksForm">
                <textarea className="taskText" name="text" onChange={handleChange} placeholder="Nueva Tarea..." ></textarea>
                <div className="row justify-content-center">
                    <button type='button' className="col-4 formButton" value='Crear' onClick={handleSubmit}>Crear</button>
                    <button type='button' className="col-4 formButton" value='Cerrar' onClick={handleToggleClose} >Cerrar</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            {params.isOpen ? (
                <div>
                    {params.taskId ? updateForm(params) : createForm(params)}
                </div>
            ) : <div className="addTasks" onClick={handleToggleClick}>Añadir Tarea</div>}
        </div>
    )
}

export default TaskForm;