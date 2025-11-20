import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import taskService from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await taskService.getTasks();
    setTasks(data);
  };

  const handleAddTask = async (taskData) => {
    await taskService.createTask(taskData);
    fetchTasks();
    setShowTaskForm(false); // Hide form after adding
  };

  const handleUpdateTask = async (id, taskData) => {
    await taskService.updateTask(id, taskData);
    fetchTasks();
    setEditingTask(null); // Clear editing task
    setShowTaskForm(false); // Hide form after updating
  };

  const handleDeleteTask = async (id) => {
    await taskService.deleteTask(id);
    fetchTasks();
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true); // Show form when editing
  };

  const handleShowForm = () => {
    setEditingTask(null); // Clear editing task when showing form for new task
    setShowTaskForm(true);
  };

  const handleHideForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <button onClick={handleShowForm} className="add-task-button">Add New Task</button>

      {showTaskForm && (
        <TaskForm
          addTask={handleAddTask}
          updateTask={handleUpdateTask}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          onClose={handleHideForm}
        />
      )}

      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
    </div>
  );
}

export default App;
