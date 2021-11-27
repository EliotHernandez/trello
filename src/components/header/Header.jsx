import React from "react";
import './Header.scss';

const Header = props => {
    return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3 headerTitle">
                        <h2>React Tello</h2>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;