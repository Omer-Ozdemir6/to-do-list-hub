
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onSelect, selectedId, onDelete, onToggleComplete }) {

  const sortedTasks = tasks.slice().sort((a, b) => {

    const aCompleted = a.isCompleted ? 1 : 0;
    const bCompleted = b.isCompleted ? 1 : 0;
    return aCompleted - bCompleted;
  });

  return (
    <div className="task-list">
      {sortedTasks.length > 0 ? (

        sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onSelect={onSelect}
            isSelected={task.id === selectedId}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))
      ) : (
        <p>Henüz eklenmiş bir görev yok. Hadi bir tane ekleyelim!</p>
      )}
    </div>
  );
}

export default TaskList;
