
import React, { useState } from 'react';
import { initialTasks } from './data/initialTasks';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import AddTaskForm from './components/AddTaskForm.jsx'; 
import './App.css';

const SIDEBAR_WIDTH = 350; 

function App() {
    const [tasks, setTasks] = useState(initialTasks);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const [isDarkMode, setIsDarkMode] = useState(false); 
    
    const selectedTask = tasks.find(task => task.id === selectedTaskId);

    const handleToggleTheme = () => {

        setIsDarkMode(prevMode => !prevMode);
    };

    const handleTaskSelect = (id) => {
        if (id === selectedTaskId) {
            setSelectedTaskId(null);
        } else {
            setSelectedTaskId(id);
        }
    };

    const handleAddTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleDeleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
        if (selectedTaskId === taskId) {
            setSelectedTaskId(null);
        }
    };

    const handleToggleComplete = (taskId) => {
        setTasks((prevTasks) => 
            prevTasks.map(task => 
                task.id === taskId 
                    ? { ...task, isCompleted: !task.isCompleted }
                    : task
            )
        );
    };

    const handleUpdateTaskDescription = (taskId, newDescription) => {
        setTasks((prevTasks) => 
            prevTasks.map(task => 
                task.id === taskId 
                    ? { ...task, description: newDescription }
                    : task
            )
        );
    };

    const handleUpdateSubtasks = (taskId, newSubtasks) => {
        setTasks((prevTasks) => 
            prevTasks.map(task => 
                task.id === taskId 
                    ? { ...task, subtasks: newSubtasks } 
                    : task
            )
        );
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        const PRIORITIES = { 'High': 3, 'Medium': 2, 'Low': 1 };
        
        if (a.isCompleted && !b.isCompleted) return 1;
        if (!a.isCompleted && b.isCompleted) return -1;

        const priorityA = PRIORITIES[a.priority] || 0;
        const priorityB = PRIORITIES[b.priority] || 0;

        return priorityB - priorityA; 
    });


    return (

        <div className={`App-Container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>

            <div 
                className="Sidebar"
                style={{
                    width: `${SIDEBAR_WIDTH}px`,
                    padding: '20px', 
                }}
            >

                <button 
                    onClick={handleToggleTheme}
                    style={{ 

                        backgroundColor: isDarkMode ? '#f8f9fa' : '#343a40', 
                        color: isDarkMode ? '#343a40' : '#f8f9fa',
                        padding: '8px 15px', 
                        borderRadius: '4px', 
                        border: 'none',
                        width: '100%',
                        marginBottom: '20px',
                        cursor: 'pointer'
                    }}
                >

                    {isDarkMode ? '🌙 Gece Modu' : '☀️ Gündüz Modu'}
                </button>

                <div>
                    <h1 style={{ color: 'var(--accent-color)', textAlign: 'center', marginBottom: '30px', fontSize: '1.8em' }}>
                        🛠️ Oyun Geliştirici HUB
                    </h1>
                    
                    <h3 style={{ color: 'var(--text-light)', borderBottom: '1px solid var(--border-light)', paddingBottom: '10px', marginBottom: '20px' }}>
                        GÖREV LİSTESİ
                    </h3>

                    <TaskList 
                        tasks={sortedTasks} 
                        onSelect={handleTaskSelect} 
                        selectedId={selectedTaskId}
                        onDelete={handleDeleteTask}          
                        onToggleComplete={handleToggleComplete} 
                    />

                    <AddTaskForm onAddTask={handleAddTask} />
                </div>
            </div>

            <div 
                className="MainContent"
                style={{
                    marginLeft: `${SIDEBAR_WIDTH}px`,
                    position: 'relative', 
                    paddingTop: '30px' 
                }}
            >
                
                {selectedTask ? (
                    <TaskDetail 
                        task={selectedTask}
                        onDelete={handleDeleteTask}
                        onToggleComplete={handleToggleComplete}
                        onUpdateDescription={handleUpdateTaskDescription}
                        onUpdateSubtasks={handleUpdateSubtasks}
                    />
                ) : (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <h3 style={{ marginBottom: '10px' }}>👋 Merhaba Geliştirici!</h3>
                        <p>Başlamak için soldaki listeden bir görev seçin veya yeni bir görev ekleyin.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;