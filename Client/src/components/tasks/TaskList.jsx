import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useRealtime } from '../../hooks/useRealtime';
import { taskService } from '../../services/taskService';
import { useUser } from '../../context/UserContext';

const TaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TaskItem = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TaskStatus = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
  background: ${props => 
    props.$status === 'completed' ? 'var(--success-bg)' :
    props.$status === 'in_progress' ? 'var(--warning-bg)' :
    props.$status === 'on_hold' ? 'var(--info-bg)' :
    'var(--danger-bg)'};
  color: ${props => 
    props.$status === 'completed' ? 'var(--success-text)' :
    props.$status === 'in_progress' ? 'var(--warning-text)' :
    props.$status === 'on_hold' ? 'var(--info-text)' :
    'var(--danger-text)'};
`;

class TaskListErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('TaskList Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-message">Something went wrong loading tasks. Please try refreshing the page.</div>;
    }

    return this.props.children;
  }
}

function TaskListContent({ tasks: initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks || []);
  const { user } = useUser();
  const [subscriptionErrors, setSubscriptionErrors] = useState({});

  const handleTaskUpdate = useCallback((update) => {
    setTasks(prevTasks => {
      const taskIndex = prevTasks.findIndex(t => t._id === update._id);
      if (taskIndex === -1) {
        return [...prevTasks, update];
      } else {
        const newTasks = [...prevTasks];
        newTasks[taskIndex] = {
          ...newTasks[taskIndex],
          ...update
        };
        return newTasks;
      }
    });
  }, []);

  // Subscribe to each task for real-time updates
  tasks.forEach(task => {
    const error = useRealtime('task', task._id, handleTaskUpdate);
    if (error) {
      subscriptionErrors[task._id] = error;
    }
  });

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await taskService.updateTask(taskId, { status: newStatus });
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === taskId
            ? { ...task, status: newStatus }
            : task
        )
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(prevTasks => prevTasks.filter(t => t._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (Object.keys(subscriptionErrors).length > 0) {
    console.warn('Some task subscriptions failed:', subscriptionErrors);
  }

  return (
    <TaskContainer>
      {tasks.map(task => (
        <TaskItem key={task._id}>
          <div>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <div>Due: {new Date(task.dueDate).toLocaleDateString()}</div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <TaskStatus $status={task.status}>
              {task.status.replace('_', ' ')}
            </TaskStatus>
            {(task.assignee === user.id || task.creator === user.id) && (
              <>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button onClick={() => handleDelete(task._id)}>
                  Delete
                </button>
              </>
            )}
            {subscriptionErrors[task._id] && (
              <small className="error-text">Real-time updates unavailable</small>
            )}
          </div>
        </TaskItem>
      ))}
    </TaskContainer>
  );
}

export default function TaskList(props) {
  return (
    <TaskListErrorBoundary>
      <TaskListContent {...props} />
    </TaskListErrorBoundary>
  );
}