import React, { useEffect, useState } from "react";
import './ListForm.scss';

const ListForm = props => {

    let initialParams = {
        text: props.title ? props.title : "",
        isOpen: props.isOpen ? props.isOpen : false,
        class: props.class ? props.class : "col-1",
        listId: props.listId ? props.listId : "",
        modifyParent: props.modifyParent,
        deleteParent: props.deleteParent ? props.deleteParent : "",
    };

    const [params, setParams] = useState(initialParams);

    useEffect(() => {
        //console.log(params);
    }, [params]);

    const handleToggleClick = () => {
        if (params.isOpen === false) {
            setParams({
                ...params,
                isOpen: !params.isOpen,
                class: "col"
            });
        }
    }

    const handleToggleClose = () => {
        setParams({
            ...params,
            isOpen: !params.isOpen,
            class: "col-1"
        });
        params.modifyParent(params);
    }

    const handleChange = event => {
        setParams({ ...params, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {
        handleToggleClose();
        params.modifyParent(params);
    }

    const handleDelete = () => {
        handleToggleClose();
        params.deleteParent(params);
    }

    const updateForm = (params) => {
        return (
            <div className="addListForm">
                <textarea className="listText" name="text" onChange={(event) => handleChange(event)} value={params.text} ></textarea>
                <div className="row justify-content-center">
                    <button type='button' className="col-3 formButton" value='Actualizar' onClick={() => handleSubmit()}>Actualizar</button>
                    <button type='button' className="col-3 formButton delete" value='Eliminar' onClick={() => handleDelete()}>Eliminar</button>
                    <button type='button' className="col-3 formButton" value='Cerrar' onClick={() => handleToggleClose()} >Cerrar</button>
                </div>
            </div>
        );
    }

    const createForm = params => {
        return (
            <div className="addListForm">
                <textarea className="listText" name="text" onChange={(event) => handleChange(event)} placeholder="Nueva lista..." ></textarea>
                <div className="row justify-content-center">
                    <button type='button' className="col-4 formButton" value='Crear' onClick={() => handleSubmit()}>Crear</button>
                    <button type='button' className="col-4 formButton" value='Cerrar' onClick={() => handleToggleClose()} >Cerrar</button>
                </div>
            </div>
        );
    }

    return (
        <div className={params.class}>
            {params.isOpen ? (
                <div>
                    {params.listId ? updateForm(params) : createForm(params)}
                </div>
            ) : <div id="addList" className="list" onClick={() => handleToggleClick()}>Añadir Lista</div>}
        </div>
    )
}

export default ListForm;