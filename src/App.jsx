import React, { useState } from 'react';
import { initialTasks } from './data/initialTasks';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import AddTaskForm from './components/AddTaskForm.jsx'; 
import Navbar, { VIEWS } from './components/Navbar.jsx'; 
import './App.css';

const SIDEBAR_WIDTH = 350; 

function App() {
    const [tasks, setTasks] = useState(initialTasks);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [currentView, setCurrentView] = useState(VIEWS.ALL); 
    const [isDarkMode, setIsDarkMode] = useState(false); 
    
    const selectedTask = tasks.find(task => task.id === selectedTaskId);

    const handleViewChange = (view) => {
        setCurrentView(view);
        setSelectedTaskId(null); 
    };

    const handleToggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const handleTaskSelect = (id) => {
        if (currentView === VIEWS.ADD_NEW) {
            setCurrentView(VIEWS.ALL); 
        }
        setSelectedTaskId(id);
    };

    const handleAddTask = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setCurrentView(VIEWS.ALL);
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

    const handleLoginClick = () => {
        window.location.href = "/login"; 
    };

    const handleSignupClick = () => {
        window.location.href = "/signup"; 
    };

    const sortedTasks = [...tasks].sort((a, b) => {
        const PRIORITIES = { 'High': 3, 'Medium': 2, 'Low': 1 };
        
        if (a.isCompleted && !b.isCompleted) return 1;
        if (!a.isCompleted && b.isCompleted) return -1;

        const priorityA = PRIORITIES[a.priority] || 0;
        const priorityB = PRIORITIES[b.priority] || 0;

        return priorityB - priorityA; 
    });

    const displayedTasks = sortedTasks.filter(task => {
        if (currentView === VIEWS.COMPLETED) {

            return task.isCompleted;
        }

        return !task.isCompleted; 
    });


    return (
        <div className={`App-Container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>

            <Navbar 
                onViewChange={handleViewChange}
                currentView={currentView}
                onLoginClick={handleLoginClick}
                onSignupClick={handleSignupClick} 
                isDarkMode={isDarkMode}
                onToggleTheme={handleToggleTheme}
            />

            <div 
                className="Sidebar"
                style={{
                    width: `${SIDEBAR_WIDTH}px`,
                    padding: '20px', 
                }}
            >

                
                <div>
                    <TaskList 
                        tasks={displayedTasks} 
                        onSelect={handleTaskSelect} 
                        selectedId={selectedTaskId}
                        onDelete={handleDeleteTask}          
                        onToggleComplete={handleToggleComplete} 
                    />
                </div>
            </div>

            <div 
                className="MainContent"
                style={{
                    marginLeft: `${SIDEBAR_WIDTH}px`,
                    position: 'relative', 
                }}
            >
                
                {currentView === VIEWS.ADD_NEW ? (

                    <div style={{ padding: '40px' }}>
                        <h2 style={{ color: 'var(--accent-color)' }}>Yeni Görev Ekle</h2>
                        <AddTaskForm onAddTask={handleAddTask} />
                    </div>
                ) : selectedTask ? (

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
                        
                        {currentView === VIEWS.COMPLETED ? (
                            <p>Tamamlanan görev listesinden bir öge seçin veya aktif görevlere dönün.</p>
                        ) : (
                            <p>Başlamak için soldaki aktif görev listesinden bir görev seçin veya **Navbar'daki "Yeni Ekle"** bağlantısını kullanın.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;