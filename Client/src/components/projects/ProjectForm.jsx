import { useState } from 'react'
import styled from 'styled-components'
import FormModal from '../shared/FormModal'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-unit);
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 0.5);
`

const Label = styled.label`
  color: var(--text);
  font-weight: 500;
`

const TextArea = styled.textarea`
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text);
  padding: calc(var(--spacing-unit) * 0.75);
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`

const ProjectForm = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    team: [],
    priority: 'medium'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Project' : 'Create New Project'}
    >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Project Name</Label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </FormGroup>

        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-unit)' }}>
          <FormGroup>
            <Label htmlFor="startDate">Start Date</Label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="endDate">End Date</Label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              required
            />
          </FormGroup>
        </div>

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

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button type="button" className="btn" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Update Project' : 'Create Project'}
          </button>
        </div>
      </Form>
    </FormModal>
  )
}

export default ProjectForm