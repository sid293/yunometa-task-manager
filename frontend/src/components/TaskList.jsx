import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const statuses = ['To Do', 'In Progress', 'Completed']; // Assuming these are the possible statuses

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return (
    <div className="task-list-container">
      {statuses.map((status) => (
        <div key={status} className="task-column">
          <h2>{status}</h2>
          {getTasksByStatus(status).map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
