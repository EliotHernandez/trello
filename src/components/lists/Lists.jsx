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
        isOpen: true,
        tasks: tasksFromResource
    },
    [uuidv4()]: {
        title: "To Do",
        isOpen: true,
        tasks: tasksFromTodo
    },
    [uuidv4()]: {
        title: "Doing",
        isOpen: true,
        tasks: tasksFromDoing
    },
    [uuidv4()]: {
        title: "Done",
        isOpen: true,
        tasks: tasksFromDone
    }
};

const Lists = props => {
    const [lists, setLists] = useState(initialLists);

    const draggAndDrop = (result) => {
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

    const handleNewTask = params => {

        let list = lists[params.parentId];
        let newTask = { id: uuidv4(), text: params.text };
        list.tasks.push(newTask);

        setLists({
            ...lists,
            [params.parentId]: {
                ...list,
                isOpen: true,
                tasks: list.tasks
            }
        });
    }

    const handleNewList = params => {
        if (params.listId) {
            let modifyList = lists[params.listId];
            if (!params.text) {
                setLists({
                    ...lists,
                    [params.listId]: {
                        ...modifyList,
                        isOpen: true
                    }
                });
                return;
            }
            setLists({
                ...lists,
                [params.listId]: {
                    ...modifyList,
                    title: params.text,
                    isOpen: true
                }
            });
            return;
        }

        setLists({
            ...lists,
            [uuidv4()]: {
                title: params.text,
                isOpen: true,
                tasks: []
            }
        });
    }

    const handleDeleteList = params => {
        let modifyLists = [];
        Object.entries(lists).map(([id, list]) => {
            if (id !== params.listId) {
                modifyLists[id] = list;
            }
            return modifyLists;
        });
        setLists({
            ...modifyLists,
        });
    }

    const handleToggleListForm = listId => {
        let modifyList = lists[listId];
        setLists({
            ...lists,
            [listId]: {
                ...modifyList,
                isOpen: false
            }
        });
    }

    const showLists = (lists) => {
        return (
            Object.entries(lists).map(([id, list]) => {
                return (
                    <Droppable droppableId={id} key={id}>
                        {(droppableProvided) => (
                            <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className="col list">
                                {list.isOpen ?
                                    showList(id, list, droppableProvided)
                                    : showListForm(id, list)
                                }
                            </div>
                        )}
                    </Droppable>
                );
            })
        );
    }

    const showListForm = (id, list) => {
        return (
            <ListForm modifyParent={(params) => handleNewList(params)} deleteParent={(params) => handleDeleteList(params)} title={list.title} isOpen="true" class="col" listId={id} />
        );
    }

    const showList = (id, list, droppableProvided) => {
        return (
            <div>
                <h4 className="listTitle" onClick={() => handleToggleListForm(id)}>{list.title}</h4>
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
                <TaskForm modifyParent={(params) => handleNewTask(params)} parent={id} />
            </div>
        );
    }

    useEffect(() => {
        // console.log(lists);
    }, [lists]);

    return (
        <DragDropContext onDragEnd={(result) => draggAndDrop(result)}>
            <div className="container-fluid" >
                <div className="row lists">
                    { showLists(lists) }
                    <ListForm modifyParent={(params) => handleNewList(params)} />
                </div>
            </div>
        </DragDropContext>
    )
}

export default Lists;