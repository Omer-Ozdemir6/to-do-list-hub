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

  const selectedTask = tasks.find((task) => task.id === selectedTaskId);

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
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    if (selectedTaskId === taskId) {
      setSelectedTaskId(null);
    }
  };

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleUpdateTaskDescription = (taskId, newDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, description: newDescription } : task
      )
    );
  };

  const handleUpdateSubtasks = (taskId, newSubtasks) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, subtasks: newSubtasks } : task
      )
    );
  };

  return (
    <div className="App-Container">
      <div
        className="Sidebar"
        style={{
          width: `${SIDEBAR_WIDTH}px`,
          padding: '20px',
        }}
      >
        <div>
          <h1
            style={{
              color: 'var(--primary-color)',
              textAlign: 'center',
              marginBottom: '30px',
              fontSize: '1.8em',
            }}
          >
            🛠️ YAPILACAKLAR LİSTESİ HUB
          </h1>

          <h3
            style={{
              color: 'var(--text-light)',
              borderBottom: '1px solid var(--border-light)',
              paddingBottom: '10px',
              marginBottom: '20px',
            }}
          >
            GÖREV LİSTESİ
          </h3>

          <TaskList
            tasks={tasks}
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
          paddingTop: '30px',
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
          <div
            style={{
              padding: '40px',
              textAlign: 'center',
              color: 'var(--secondary-color)',
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>👋 Merhaba Geliştirici!</h3>
            <p>
              Başlamak için soldaki listeden bir görev seçin veya yeni bir görev
              ekleyin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
