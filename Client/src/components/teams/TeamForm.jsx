import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import FormModal from '../shared/FormModal';
import { useUser } from '../../context/UserContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text);
`;

const Error = styled.div`
  color: var(--danger);
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const Description = styled.small`
  color: var(--text-secondary);
  font-size: 0.8rem;
`;

const PositionInput = styled.div`
  display: flex;
  gap: 0.375rem;
  align-items: center;
  margin-bottom: 0.375rem;
`;

export default function TeamForm({ onSubmit, onClose, initialData, isOpen }) {
  const { user } = useUser();
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    openPositions: [''],
    isPublic: false,
    leader: user?._id || '',
    tags: []
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Team name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (formData.openPositions.some(pos => !pos.trim())) {
      newErrors.openPositions = 'All positions must have a title';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Filter out empty positions and clean up data
      const cleanData = {
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        openPositions: formData.openPositions.filter(pos => pos.trim()),
        leader: user._id
      };
      onSubmit(cleanData);
    }
  };

  const handlePositionChange = (idx, value) => {
    setFormData(prev => ({
      ...prev,
      openPositions: prev.openPositions.map((pos, i) => i === idx ? value : pos)
    }));
    if (errors.openPositions) {
      setErrors(prev => ({ ...prev, openPositions: '' }));
    }
  };

  const addPosition = () => {
    setFormData(prev => ({
      ...prev,
      openPositions: [...prev.openPositions, '']
    }));
  };

  const removePosition = (idx) => {
    setFormData(prev => ({
      ...prev,
      openPositions: prev.openPositions.filter((_, i) => i !== idx)
    }));
  };

  return (
    <FormModal isOpen={isOpen} title={initialData ? 'Edit Team' : 'Create New Team'} onClose={onClose}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Team Name*</Label>
          <input
            type="text"
            id="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={e => {
              setFormData(prev => ({ ...prev, name: e.target.value }));
              if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
            }}
            placeholder="Enter team name"
            maxLength={50}
          />
          {errors.name && <Error>{errors.name}</Error>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description*</Label>
          <textarea
            id="description"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            value={formData.description}
            onChange={e => {
              setFormData(prev => ({ ...prev, description: e.target.value }));
              if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
            }}
            rows={3}
            placeholder="Describe your team's purpose and goals"
            maxLength={500}
          />
          {errors.description && <Error>{errors.description}</Error>}
          <Description>{500 - formData.description.length} characters remaining</Description>
        </FormGroup>

        <FormGroup>
          <Label>Open Positions</Label>
          <Description>List positions you're looking to fill in your team</Description>
          {formData.openPositions.map((pos, idx) => (
            <PositionInput key={idx}>
              <input
                type="text"
                className={`form-control ${errors.openPositions ? 'is-invalid' : ''}`}
                value={pos}
                onChange={e => handlePositionChange(idx, e.target.value)}
                placeholder="e.g. Developer, Designer, etc."
              />
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => removePosition(idx)}
                disabled={formData.openPositions.length === 1}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
              {idx === formData.openPositions.length - 1 && (
                <button
                  type="button"
                  className="btn btn-outline-success btn-sm"
                  onClick={addPosition}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              )}
            </PositionInput>
          ))}
          {errors.openPositions && <Error>{errors.openPositions}</Error>}
        </FormGroup>

        <FormGroup>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isPublic"
              checked={formData.isPublic}
              onChange={e => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
            />
            <Label className="form-check-label" htmlFor="isPublic">
              Make this team public
            </Label>
          </div>
          <Description>
            Public teams can be found and joined by any user. Private teams require invitations.
          </Description>
        </FormGroup>

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialData ? 'Update Team' : 'Create Team'}
          </button>
        </div>
      </Form>
    </FormModal>
  );
}