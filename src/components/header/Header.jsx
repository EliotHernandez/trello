import React from "react";
import './Header.scss';

const Header = props => {
    return (
        <header>
            <div className="container-fluid">
                <div className="row d-flex align-items-center">
                    <div className="col-8 headerTitle">
                        <h2>React Tello</h2>
                    </div>
                    <div className="col-2 headerHome">
                        <a href="/home"><span>Home</span></a>
                    </div>
                    <div className="col-2 headerTask">
                        <a href="/task"><span>Crear Tarea</span></a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;