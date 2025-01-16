import React, { useState } from 'react';

const Todolist = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [editingTask, setEditingTask] = useState(null);

    const handleChange = (e) => {
        setTask(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim()) {
            if (editingTask) {
                setTasks(tasks.map(t => t.id === editingTask.id ? { ...t, text: task } : t));
                setEditingTask(null);
            } else {
                setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
            }
            setTask('');
        }
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const editTask = (id) => {
        const taskToEdit = tasks.find(task => task.id === id);
        if (taskToEdit) {
            setTask(taskToEdit.text);
            setEditingTask(taskToEdit);
        }
    };

    return (
        <>
            <div className="flex justify-center h-screen bg-gray-50 px-4 py-10">
                <div className='flex flex-col w-96 overflow-hidden'>
                    <p className='text-2xl text-gray-800 font-bold'>Create your todolist</p>
                    <div className='inputBoxList mt-2 overflow-y-scroll'>
                        <form onSubmit={handleSubmit} className='flex w-full gap-2 mb-4 sticky top-0 bg-gray-50 py-2'>
                            <input
                                type='text'
                                placeholder='Write your tasks for today?'
                                className='min-w-44 w-full h-10 p-2 rounded-lg placeholder:text-gray-400 text-gray-800 border focus:border-emerald-500 outline-none'
                                value={task}
                                onChange={handleChange}
                            />
                            <button
                                type='submit'
                                className='bg-emerald-500 text-white px-8 whitespace-nowrap h-10 rounded-lg hover:bg-emerald-600 transition-all'>
                                {editingTask ? 'Update Task' : 'Add Task'}
                            </button>
                        </form>

                        <div className='listItems mt-4'>
                            <ul className='space-y-2'>
                                {tasks.map(({ id, text, completed }) => (
                                    <li key={id} className='flex gap-4 items-start text-gray-800 border p-1 rounded-lg bg-white'>
                                        <input
                                            type='checkbox'
                                            className='min-w-4 min-h-4 mt-1 accent-emerald-400'
                                            checked={completed}
                                            onChange={() => toggleTaskCompletion(id)}
                                        />
                                        <span className={`flex-grow leading-tight ${completed ? 'line-through text-gray-400' : ''}`}>{text}</span>
                                        <button
                                            onClick={() => editTask(id)}
                                            className='bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-4 py-1 rounded-md transition-all'>
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTask(id)}
                                            className='bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded-md transition-all'>
                                            Delete
                                        </button>
                                    </li>
                                ))}
                                {tasks.length === 0 && <p className="text-gray-600 text-center">No tasks added yet!</p>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todolist;
