import React, { useState, useEffect } from 'react';
import taskService from '../services/taskService';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const data = await taskService.getTasks();
    setTasks(data);
  };

  const addTask = async (taskData) => {
    await taskService.createTask(taskData);
    fetchTasks();
  };

  const updateTask = async (id, taskData) => {
    await taskService.updateTask(id, taskData);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await taskService.deleteTask(id);
    fetchTasks();
  };

  return (
    <div>
      <TaskForm
        addTask={addTask}
        updateTask={updateTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />
      <h2>Tasks</h2>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onDelete={deleteTask}
          onEdit={setEditingTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
