import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import ListForm from "../listForm/ListForm";
import TaskForm from '../taskForm/TaskForm';
import './Lists.scss';


const tasksFromResource = [
    { id: uuidv4(), text: 'Tarea 1' },
    { id: uuidv4(), text: 'Tarea 2' },
    { id: uuidv4(), text: 'Tarea 3' }
];

const tasksFromTodo = [
    { id: uuidv4(), text: 'Tarea 4' },
    { id: uuidv4(), text: 'Tarea 5' },
    { id: uuidv4(), text: 'Tarea 6' },
    { id: uuidv4(), text: 'Tarea 7' }
];

const tasksFromDoing = [
    { id: uuidv4(), text: 'Tarea 8' },
    { id: uuidv4(), text: 'Tarea 9' }
];

const tasksFromDone = [
    { id: uuidv4(), text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' }
];

const initialLists = {
    [uuidv4()]: {
        title: "Resource",
        tasks: tasksFromResource
    },
    [uuidv4()]: {
        title: "To Do",
        tasks: tasksFromTodo
    },
    [uuidv4()]: {
        title: "Doing",
        tasks: tasksFromDoing
    },
    [uuidv4()]: {
        title: "Done",
        tasks: tasksFromDone
    }
};


const _draggAndDrop = (result, lists, setLists) => {
    const { source, destination } = result;
    if (!destination) {
        return;
    }
    if (source.index === destination.index
        && source.droppableId === destination.droppableId) {
        return;
    }

    if (source.droppableId !== destination.droppableId) {
        const sourceList = lists[source.droppableId];
        const destList = lists[destination.droppableId];
        const sourceTasks = [...sourceList.tasks];
        const destTasks = [...destList.tasks];

        const [removed] = sourceTasks.splice(source.index, 1);
        destTasks.splice(destination.index, 0, removed);
        setLists({
            ...lists,
            [source.droppableId]: {
                ...sourceList,
                tasks: sourceTasks
            },
            [destination.droppableId]: {
                ...destList,
                tasks: destTasks
            }
        });
    } else {
        const list = lists[source.droppableId];
        const copiedTasks = [...list.tasks];
        const [removed] = copiedTasks.splice(source.index, 1);
        copiedTasks.splice(destination.index, 0, removed);
        setLists({
            ...lists,
            [source.droppableId]: {
                ...list,
                tasks: copiedTasks
            }
        });
    }
};

const Lists = props => {
    const [lists, setLists] = useState(initialLists);

    const handleNewTask = params => {

        let list = lists[params.parentId];
        let newTask = { id: uuidv4(), text: params.text };
        list.tasks.push(newTask);

        setLists({
            ...lists,
            [params.parentId]: {
                ...list,
                tasks: list.tasks
            }
        });
    }

    const handleNewList = params => {
        setLists({
            ...lists,
            [uuidv4()]: {
                title: params.text,
                tasks: []
            }
        });
    }

    useEffect(() => {
        //console.log(lists);
    }, [lists]);

    return (
        <DragDropContext onDragEnd={(result) => _draggAndDrop(result, lists, setLists)}>
            <div className="container-fluid" >
                <div className="row lists">
                    {Object.entries(lists).map(([id, list]) => {
                        return (
                            <Droppable droppableId={id} key={id}>
                                {(droppableProvided) => (
                                    <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className="col list">
                                        <h4>{list.title}</h4>
                                        {list.tasks?.map((task, index) => {
                                            return (
                                                <Draggable draggableId={task.id} index={index} key={task.id}>
                                                    {(draggableProvided) => (
                                                        <div {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} className="tasks" ><span>{task.text}</span></div>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {droppableProvided.placeholder}
                                        <TaskForm modifyParent={handleNewTask} parent={id} />
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}
                    <ListForm modifyParent={handleNewList} />
                </div>
            </div>
        </DragDropContext>
    )
}

export default Lists;