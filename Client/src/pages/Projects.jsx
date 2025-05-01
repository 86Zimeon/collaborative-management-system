import { useState } from 'react'
import styled from 'styled-components'
import ProjectGrid from '../components/projects/ProjectGrid'
import ProjectForm from '../components/projects/ProjectForm'
import { projectService } from '../services/projectService'

const ProjectsContainer = styled.div`
  display: grid;
  gap: 2rem;
`

const Section = styled.section`
  background: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Projects = () => {
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [projects, setProjects] = useState([])

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await projectService.createProject(projectData)
      setProjects(prevProjects => [...prevProjects, newProject])
    } catch (error) {
      console.error('Error creating project:', error)
    }
  }

  return (
    <>
      <Header>
        <h2>Projects</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowProjectModal(true)}
        >
          + New Project
        </button>
      </Header>

      <ProjectsContainer>
        <Section>
          <ProjectGrid projects={projects} />
        </Section>
      </ProjectsContainer>

      <ProjectForm
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSubmit={handleCreateProject}
      />
    </>
  )
}

export default Projects