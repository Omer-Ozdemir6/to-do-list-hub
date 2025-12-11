
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

  const actionButtonStyle = {
    marginLeft: '5px',
    padding: '5px 10px',
    borderRadius: '3px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '12px',
    fontWeight: '600',
  };

  return (
    <div className={itemClasses} onClick={handleClick}>

      <div style={{ flexGrow: 1 }}>
        <h4>{task.title}</h4>

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

      <div className="task-actions">
        <button
          onClick={handleToggleClick}
          style={{
            ...actionButtonStyle,

            backgroundColor: task.isCompleted
              ? 'var(--success-color)'
              : 'var(--primary-color)',
            color: 'white',
          }}
        >

          {task.isCompleted ? '✓ Tamamlandı' : 'Tamamla'}
        </button>
        <button
          onClick={handleDeleteClick}
          style={{
            ...actionButtonStyle,
            backgroundColor: 'var(--danger-color)',
            color: 'white',
          }}
        >
          Sil
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
