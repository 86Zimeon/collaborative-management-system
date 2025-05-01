import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useRealtime } from '../../hooks/useRealtime';
import { projectService } from '../../services/projectService';
import { useUser } from '../../context/UserContext';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProjectCard = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--border);
`;

export default function ProjectGrid({ projects: initialProjects }) {
  const [projects, setProjects] = useState(initialProjects || []);
  const { user } = useUser();

  const handleProjectUpdate = useCallback((update) => {
    setProjects(prevProjects => {
      const projectIndex = prevProjects.findIndex(p => p._id === update._id);
      if (projectIndex === -1) {
        // New project
        return [...prevProjects, update];
      } else {
        // Updated project
        const newProjects = [...prevProjects];
        newProjects[projectIndex] = {
          ...newProjects[projectIndex],
          ...update
        };
        return newProjects;
      }
    });
  }, []);

  // Subscribe to projects user is a member of
  projects.forEach(project => {
    useRealtime('project', project._id, handleProjectUpdate);
  });

  const handleDelete = async (projectId) => {
    try {
      await projectService.deleteProject(projectId);
      setProjects(prevProjects => 
        prevProjects.filter(p => p._id !== projectId)
      );
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <Grid>
      {projects.map(project => (
        <ProjectCard key={project._id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="project-meta">
            <div>Progress: {project.progress}%</div>
            <div>Team: {project.teamSize} members</div>
          </div>
          {project.owner === user.id && (
            <button onClick={() => handleDelete(project._id)}>
              Delete Project
            </button>
          )}
        </ProjectCard>
      ))}
    </Grid>
  );
}