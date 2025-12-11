
import React from 'react';

function TaskItem({ task, onSelect, isSelected, onDelete, onToggleComplete }) {
  const handleClick = () => {

    onSelect(task.id);
  };

  const handleToggleClick = (e) => {
    e.stopPropagation();
    onToggleComplete(task.id);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (
      window.confirm(
        `'${task.title}' görevini silmek istediğinizden emin misiniz?`
      )
    ) {
      onDelete(task.id);
    }
  };

  const itemClasses = [
    'task-item',
    isSelected ? 'is-selected' : '',
    task.isCompleted ? 'is-completed' : '',
  ].join(' ');


  return (
    <div className={itemClasses} onClick={handleClick}>

      <div style={{ flexGrow: 1 }}>
        <h4 style={{ margin: '0 0 5px 0' }}>{task.title}</h4>
        <small
          style={{
            color: task.isCompleted
              ? 'var(--success-color)'
              : 'var(--warning-color)',
          }}
        >
          Durum: {task.isCompleted ? '✓ Tamamlandı' : '...Devam Ediyor'}
        </small>
      </div>

    </div>
  );
}

export default TaskItem;