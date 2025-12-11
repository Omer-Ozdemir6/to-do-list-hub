import React, { useState } from 'react';

function TaskDetail({
  task,
  onDelete,
  onToggleComplete,
  onUpdateDescription,
  onUpdateSubtasks,
}) {
  if (!task) {
    return <div>Lütfen detaylarını görmek için listeden bir görev seçin.</div>;
  }

  const [isEditing, setIsEditing] = useState(false);
  const [currentDescription, setCurrentDescription] = useState(
    task.description
  );

  const [newSubtaskText, setNewSubtaskText] = useState('');

  if (!isEditing && currentDescription !== task.description) {
    setCurrentDescription(task.description);
  }

  const handleSaveDescription = () => {
    onUpdateDescription(task.id, currentDescription);
    setIsEditing(false);
  };

  const handleToggleClick = () => onToggleComplete(task.id);
  const handleDeleteClick = () => {
    if (
      window.confirm(
        `'${task.title}' görevini silmek istediğinizden emin misiniz?`
      )
    ) {
      onDelete(task.id);
    }
  };

  const handleToggleSubtask = (subtaskId) => {
    const updatedSubtasks = task.subtasks.map((subtask) =>
      subtask.id === subtaskId
        ? { ...subtask, isCompleted: !subtask.isCompleted }
        : subtask
    );
    onUpdateSubtasks(task.id, updatedSubtasks);
  };

  const handleDeleteSubtask = (subtaskId) => {
    const updatedSubtasks = task.subtasks.filter(
      (subtask) => subtask.id !== subtaskId
    );
    onUpdateSubtasks(task.id, updatedSubtasks);
  };

  const handleAddSubtask = (e) => {
    e.preventDefault();
    const trimmedText = newSubtaskText.trim();
    if (trimmedText === '') return;

    const newSubtask = {
      id: Date.now(),
      text: trimmedText,
      isCompleted: false,
    };

    const updatedSubtasks = [...task.subtasks, newSubtask];
    onUpdateSubtasks(task.id, updatedSubtasks);
    setNewSubtaskText('');
  };

  return (
    <div className="task-detail">
      <h1>{task.title}</h1>

      <p
        style={{
          fontWeight: 'bold',
          color: task.isCompleted ? 'green' : 'red',
        }}
      >
        Durum: {task.isCompleted ? 'Tamamlandı' : 'Açık'}
      </p>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={handleToggleClick}
          style={{
            padding: '8px 15px',
            backgroundColor: task.isCompleted ? '#28a745' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {task.isCompleted ? '✓ Tamamlandı' : 'Tamamla'}
        </button>
        <button
          onClick={handleDeleteClick}
          style={{
            padding: '8px 15px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Görevi Sil
        </button>
      </div>

      <hr />

      <h3>📜 Açıklama</h3>
      {isEditing ? (
        <div className="description-editor">
          <textarea
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            rows="6"
            style={{
              width: '100%',
              padding: '10px',
              boxSizing: 'border-box',
              border: '1px solid #007bff',
            }}
          />
          <button
            onClick={handleSaveDescription}
            style={{
              padding: '8px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px',
            }}
          >
            Kaydet
          </button>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              padding: '8px 15px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            İptal
          </button>
        </div>
      ) : (
        <div
          className="description-content"
          style={{
            backgroundColor: '#f0f0f0',
            padding: '15px',
            borderRadius: '5px',
            minHeight: '80px',
            cursor: 'pointer',
          }}
          onClick={() => setIsEditing(true)}
        >
          <p>
            {task.description || 'Açıklama eklemek için buraya tıklayın...'}
          </p>
        </div>
      )}

      <hr />

      <h3>✅ Ek Maddeler (Alt Görevler)</h3>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {task.subtasks.map((subtask) => (
          <li
            key={subtask.id}
            style={{
              padding: '10px 0',
              borderBottom: '1px dotted #ddd',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                textDecoration: subtask.isCompleted ? 'line-through' : 'none',
                color: subtask.isCompleted ? '#888' : '#000',
                cursor: 'pointer',
                flexGrow: 1,
              }}
              onClick={() => handleToggleSubtask(subtask.id)}
            >
              {subtask.text}
            </span>

            <div className="subtask-actions">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleSubtask(subtask.id);
                }}
                className={subtask.isCompleted ? 'btn-success' : 'btn-warning'}
                style={{
                  padding: '3px 8px',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '10px',
                }}
              >
                {subtask.isCompleted ? 'Tamamlandı' : 'Tamamla'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSubtask(subtask.id);
                }}
                style={{
                  padding: '3px 8px',
                  backgroundColor: 'var(--danger-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '10px',
                  marginLeft: '5px',
                }}
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>

      <form
        onSubmit={handleAddSubtask}
        style={{ marginTop: '15px', display: 'flex', gap: '10px' }}
      >
        <input
          type="text"
          value={newSubtaskText}
          onChange={(e) => setNewSubtaskText(e.target.value)}
          placeholder="Yeni alt görevi buraya yazın..."
          style={{
            flexGrow: 1,
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 15px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Ekle
        </button>
      </form>
    </div>
  );
}

export default TaskDetail;
