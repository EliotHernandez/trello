import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import ListForm from "../listForm/ListForm";
import TaskForm from '../taskForm/TaskForm';
import './Lists.scss';


const tasksFromResource = [
    { id: uuidv4(), text: 'Tarea 1', isOpen: false },
    { id: uuidv4(), text: 'Tarea 2', isOpen: false },
    { id: uuidv4(), text: 'Tarea 3', isOpen: false }
];

const tasksFromTodo = [
    { id: uuidv4(), text: 'Tarea 4', isOpen: false },
    { id: uuidv4(), text: 'Tarea 5', isOpen: false },
    { id: uuidv4(), text: 'Tarea 6', isOpen: false },
    { id: uuidv4(), text: 'Tarea 7', isOpen: false }
];

const tasksFromDoing = [
    { id: uuidv4(), text: 'Tarea 8', isOpen: false },
    { id: uuidv4(), text: 'Tarea 9', isOpen: false }
];

const tasksFromDone = [
    { id: uuidv4(), text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', isOpen: false }
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

        if (params.taskId) {
            
            if (!params.text) {
                let modifyList = lists[params.parentId];
                let modifyTasks = [];
                modifyList.tasks?.map(oldTask => {
                    oldTask.isOpen = false;
                    modifyTasks.push(oldTask)
                    return modifyTasks;
                });

                setLists({
                    ...lists,
                    [params.parentId]: {
                        ...modifyList,
                        tasks: modifyTasks
                    }
                });
                return;
            }

            let modifyList = lists[params.parentId];
            let modifyTasks = [];
            modifyList.tasks?.map(oldTask => {
                if (oldTask.id === params.taskId) {
                    oldTask.isOpen = false;
                    oldTask.text = params.text;
                }
                modifyTasks.push(oldTask)
                return modifyTasks;
            });

            setLists({
                ...lists,
                [params.parentId]: {
                    ...modifyList,
                    tasks: modifyTasks
                }
            });
            return;

        }

        if (!params.text) {
            return;
        }

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

        if (!params.text) {
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

    const handleDeleteTask = params => {
        let modifyList = lists[params.parentId];
        let modifyTasks = [];

        modifyList.tasks.map(oldTask => {
            if (oldTask.id !== params.taskId) {
                modifyTasks.push(oldTask);
            }
            return modifyTasks;
        });

        let newLists = {
            ...lists,
            [params.parentId]: {
                ...modifyList,
                tasks: modifyTasks
            }
        };
        setLists(newLists);
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

    const handleToggleTaskForm = (listId, task) => {
        let modifyList = lists[listId];
        let modifyTasks = [];

        modifyList.tasks.map(oldTask => {
            if (oldTask.id === task.id) {
                oldTask.isOpen = true;
            }
            modifyTasks.push(oldTask);
            return modifyTasks;
        });

        setLists({
            ...lists,
            [listId]: {
                ...modifyList,
                tasks: modifyTasks
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

    const showTask = (task, index, id) => {

        if (task.isOpen) {
            return showTaskForm(task, id);
        }
        return (
            <Draggable draggableId={task.id} index={index} key={task.id}>
                {(draggableProvided) => (
                    <div {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} className="tasks" onClick={() => handleToggleTaskForm(id, task)}><span>{task.text}</span></div>
                )}
            </Draggable>
        )
    }

    const showTaskForm = (task, id) => {
        return <TaskForm modifyParent={(params) => handleNewTask(params)} deleteParent={(params) => handleDeleteTask(params)} parent={id} taskId={task.id} key={task.id} isOpen={true} text={task.text} />
    }

    const showList = (id, list, droppableProvided) => {
        return (
            <div>
                <h4 className="listTitle" onClick={() => handleToggleListForm(id)}>{list.title}</h4>
                {list.tasks?.map((task, index) => {
                    return showTask(task, index, id);
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