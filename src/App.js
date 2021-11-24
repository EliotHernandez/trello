import Header from './components/header/Header';
import './assets/_scss/app.scss';

function App() {
    return (
        <div className="App">
            <Header />
            <div className="container-fluid">
                <div className="row lists">
                    <div className="col resourceList">
                        <h4>Resource</h4>
                        <div className="tasks" draggable="true">Tarea 1</div>
                        <div className="tasks" draggable="true">Tarea 2</div>
                        <div className="addTasks">Añadir Tarea</div>
                    </div>
                    <div className="col toDoList">
                        <h4>To Do</h4>
                        <div className="tasks" draggable="true">Tarea 3</div>
                        <div className="tasks" draggable="true">Tarea 4</div>
                        <div className="tasks" draggable="true">Tarea 5</div>
                        <div className="addTasks">Añadir Tarea</div>
                    </div>
                    <div className="col doingList">
                        <h4>Doing</h4>
                        <div className="tasks" draggable="true">Tarea 6</div>
                        <div className="tasks" draggable="true">Tarea 7</div>
                        <div className="addTasks">Añadir Tarea</div>
                    </div>
                    <div className="col doneList">
                        <h4>Done</h4>
                        <div className="tasks" draggable="true">Tarea 8</div>
                        <div className="addTasks">Añadir Tarea</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
