import React, { useEffect, useState } from "react";
import './ListForm.scss';

const ListForm = props => {

    let initialParams = {
        text: props.text ? props.text : '',
        isOpen: props.isOpen ? props.isOpen : false,
        class: props.class ? props.class : "col-1",
        modifyParent: props.modifyParent
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
    }

    const handleChange = event => {
        setParams({ ...params, [event.target.name]: event.target.value });
    }

    const handleSubmit = event => {
        handleToggleClose();
        if (params.text) {
            params.modifyParent(params);
        }
    }

    return (
        <div className={params.class}>
            {params.isOpen ? (
                <div className="addListForm">
                    <textarea className="listText" name="text" onChange={handleChange} placeholder="Nueva lista..." ></textarea>
                    <div className="row justify-content-center">
                        <button type='button' className="col-4 formButton" value='Crear' onClick={handleSubmit}>Crear</button>
                        <button type='button' className="col-4 formButton" value='Cerrar' onClick={handleToggleClose} >Cerrar</button>
                    </div>
                </div>
            ) : <div id="addList" className="list" onClick={handleToggleClick}>Añadir Lista</div>}
        </div>
    )
}

export default ListForm;