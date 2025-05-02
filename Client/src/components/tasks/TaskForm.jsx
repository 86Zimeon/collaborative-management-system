import { useState } from 'react'
import styled from 'styled-components'
import FormModal from '../shared/FormModal'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text);
`

const TaskForm = ({ isOpen, onClose, onSubmit, initialData, projects = [] }) => {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'todo',
    assignees: [],
    projectId: '',
    tags: [],
    visibility: 'project'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Convert assignedTo to assignees array format
    const submitData = {
      ...formData,
      assignees: formData.assignees ? [formData.assignees] : []
    }
    onSubmit(submitData)
    onClose()
  }

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Task' : 'Create New Task'}
    >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Task Title</Label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            className="form-control"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows="2"
            required
          />
        </FormGroup>

        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <FormGroup>
            <Label htmlFor="dueDate">Due Date</Label>
            <input
              type="date"
              id="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              className="form-control"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </FormGroup>
        </div>

        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            className="form-control"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="review">In Review</option>
            <option value="completed">Completed</option>
            <option value="blocked">Blocked</option>
          </select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="assignedTo">Assigned To</Label>
          <input
            type="text"
            id="assignedTo"
            className="form-control"
            value={formData.assignees}
            onChange={(e) => setFormData({ ...formData, assignees: e.target.value })}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="projectId">Project</Label>
          <select
            id="projectId"
            className="form-control"
            value={formData.projectId}
            onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
            required
            disabled={projects.length === 0}
          >
            <option value="" disabled>
              {projects.length === 0 ? 'No projects available' : 'Select a project'}
            </option>
            {projects.map(project => (
              <option key={project.id || project._id} value={project.id || project._id}>
                {project.name}
              </option>
            ))}
          </select>
          {projects.length === 0 && (
            <small className="text-danger">You must create a project before adding a task.</small>
          )}
        </FormGroup>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Update Task' : 'Create Task'}
          </button>
        </div>
      </Form>
    </FormModal>
  )
}

export default TaskForm