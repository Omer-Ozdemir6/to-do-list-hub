import React, { useState } from 'react';

function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '') {
      alert('Lütfen görev başlığını girin.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      isCompleted: false,
      subtasks: [],
    };

    onAddTask(newTask);

    setTitle('');
    setDescription('');
  };

  const formStyle = {
    padding: '15px',
    border: '1px solid #007bff',
    borderRadius: '5px',
    marginTop: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '5px 0 10px 0',
    boxSizing: 'border-box',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3>➕ Yeni Görev Ekle</h3>

      <label>
        Görev Başlığı:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
      </label>

      <label>
        Açıklama (Opsiyonel):
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={inputStyle}
        />
      </label>

      <button
        type="submit"
        style={{
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Görevi Ekle
      </button>
    </form>
  );
}

export default AddTaskForm;
