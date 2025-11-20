import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, updateTask, editingTask, setEditingTask, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('To Do');
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Please fill in all fields');
      return;
    }

    const taskData = { title, description, status };

    if (editingTask) {
      await updateTask(editingTask._id, taskData);
    } else {
      await addTask(taskData);
    }
    setTitle('');
    setDescription('');
    setStatus('To Do');
    setEditingTask(null);
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <button type="submit">{editingTask ? 'Update Task' : 'Add Task'}</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;
