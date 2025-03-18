# Collaborative Task Management Web App

A comprehensive task management solution built with the MERN stack (MongoDB, Express.js, React, Node.js) with a microservices architecture for collaborative team productivity.

## 📋 Project Overview

The Collaborative Task Management Web App is a semester-long project designed to showcase software engineering principles, development workflows, and team collaboration. This application allows users to create, assign, and manage tasks, set deadlines and priorities, collaborate within teams, and receive notifications about important updates.

### Key Features

- **User Authentication**: Secure login and registration with Google Auth or JWT
- **Task Management**: Create, assign, and track tasks with deadlines and priorities
- **Team Collaboration**: Form teams, invite members, and collaborate on shared tasks
- **Comments & Discussions**: Built-in commenting system for each task
- **Notifications**: Real-time alerts for assignments, mentions, and deadlines
- **CI/CD Pipeline**: Automated testing and deployment workflow

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher)
- [MongoDB](https://www.mongodb.com/) (v6.x or higher)
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) (optional, for containerization)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```

2. **Install client dependencies**

```bash
cd client
npm install
```

3. **Install microservices dependencies**

```bash
cd ../backend
cd auth-service
npm install
cd ../task-service
npm install
cd ../team-service
npm install
cd ../notification-service
npm install
```

4. **Set up environment variables**

Create `.env` files in the client directory and each microservice directory:

Client `.env`:
```
REACT_APP_AUTH_API_URL=http://localhost:5001/api
REACT_APP_TASK_API_URL=http://localhost:5002/api
REACT_APP_TEAM_API_URL=http://localhost:5003/api
REACT_APP_NOTIFICATION_API_URL=http://localhost:5004/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

Auth Service `.env`:
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/auth-service
JWT_SECRET=your_jwt_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Task Service `.env`:
```
PORT=5002
MONGODB_URI=mongodb://localhost:27017/task-service
JWT_SECRET=your_jwt_secret_key
NOTIFICATION_SERVICE_URL=http://localhost:5004/api
```

Team Service `.env`:
```
PORT=5003
MONGODB_URI=mongodb://localhost:27017/team-service
JWT_SECRET=your_jwt_secret_key
NOTIFICATION_SERVICE_URL=http://localhost:5004/api
```

Notification Service `.env`:
```
PORT=5004
MONGODB_URI=mongodb://localhost:27017/notification-service
JWT_SECRET=your_jwt_secret_key
```

5. **Start the development servers**

Start the client:
```bash
cd client
npm start
```

Start each microservice (in separate terminals):
```bash
# Auth Service
cd backend/auth-service
npm run dev

# Task Service
cd backend/task-service
npm run dev

# Team Service
cd backend/team-service
npm run dev

# Notification Service
cd backend/notification-service
npm run dev
```

The application should now be running at `http://localhost:3000` with the backend microservices running on their respective ports.

### Docker Setup (Alternative)

```bash
# Build and run containers
docker-compose up -d

# Stop containers
docker-compose down
```

## 🏗️ Project Structure

```
task-management-app/
├── client/                     # Frontend React application
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── assets/             # Images, fonts, etc.
│   │   ├── components/         # Reusable UI components
│   │   │   ├── auth/           # Authentication components
│   │   │   ├── tasks/          # Task-related components
│   │   │   ├── teams/          # Team-related components
│   │   │   ├── notifications/  # Notification components
│   │   │   └── shared/         # Shared UI components
│   │   ├── context/            # React context providers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service functions
│   │   │   ├── authService.js  # Authentication API calls
│   │   │   ├── taskService.js  # Task API calls
│   │   │   ├── teamService.js  # Team API calls
│   │   │   └── notificationService.js # Notification API calls
│   │   ├── utils/              # Utility functions
│   │   ├── App.js              # Main application component
│   │   └── index.js            # Entry point
│   └── package.json            # Frontend dependencies
│
├── backend/                    # Backend microservices
│   ├── auth-service/           # Authentication microservice
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utility functions
│   │   ├── app.js              # Express application setup
│   │   ├── server.js           # Server entry point
│   │   └── package.json        # Service dependencies
│   │
│   ├── task-service/           # Task management microservice
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utility functions
│   │   ├── app.js              # Express application setup
│   │   ├── server.js           # Server entry point
│   │   └── package.json        # Service dependencies
│   │
│   ├── team-service/           # Team collaboration microservice
│   │   ├── config/             # Configuration files
│   │   ├── controllers/        # Route controllers
│   │   ├── middleware/         # Custom middleware
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utility functions
│   │   ├── app.js              # Express application setup
│   │   ├── server.js           # Server entry point
│   │   └── package.json        # Service dependencies
│   │
│   └── notification-service/   # Notification microservice
│       ├── config/             # Configuration files
│       ├── controllers/        # Route controllers
│       ├── middleware/         # Custom middleware
│       ├── models/             # MongoDB schemas
│       ├── routes/             # API routes
│       ├── services/           # Business logic
│       ├── utils/              # Utility functions
│       ├── app.js              # Express application setup
│       ├── server.js           # Server entry point
│       └── package.json        # Service dependencies
│
├── .github/                    # GitHub Actions CI/CD workflows
├── docs/                       # Project documentation
├── docker-compose.yml          # Docker configuration
└── README.md                   # Project overview
```

## 🧩 File Naming and Code Organization

### Frontend (React)

- **Component Files**: Use PascalCase for component files
  - Example: `TaskCard.jsx`, `TeamMemberList.jsx`

- **Hook Files**: Use camelCase with 'use' prefix
  - Example: `useAuth.js`, `useTasks.js`

- **Utility Files**: Use camelCase
  - Example: `dateUtils.js`, `formatters.js`

- **CSS/SCSS**: Match the name of the component
  - Example: `TaskCard.module.css` for `TaskCard.jsx`

### Backend (Microservices)

- **Service Organization**: Each microservice should focus on a specific domain
  - Auth Service: User authentication and authorization
  - Task Service: Task creation, management, and assignment
  - Team Service: Team creation and management
  - Notification Service: Notification generation and delivery

- **Routes**: Use plural nouns and kebab-case
  - Example: `tasks.routes.js`, `team-members.routes.js`

- **Controllers**: Use singular nouns and camelCase
  - Example: `taskController.js`, `authController.js`

- **Models**: Use singular nouns and PascalCase
  - Example: `Task.js`, `User.js`

- **Middleware**: Use camelCase with descriptive names
  - Example: `authMiddleware.js`, `errorHandler.js`

### Inter-Service Communication

- **API Gateway**: Routes client requests to appropriate microservices
- **Event Bus**: Handles asynchronous communication between services
- **Service Discovery**: Manages service registration and discovery

## 🔧 Development Best Practices

### Microservices Best Practices

- **Service Independence**: Each service should be independently deployable
- **Database per Service**: Each service should have its own database
- **API Versioning**: Use versioned APIs for backward compatibility
- **Circuit Breakers**: Implement fault tolerance between services
- **Service Documentation**: Document APIs and inter-service communication

### Code Quality

- **Linting**: Follow ESLint rules for consistent code style
  ```bash
  npm run lint
  ```

- **Formatting**: Use Prettier for code formatting
  ```bash
  npm run format
  ```

- **Testing**: Write tests for critical functionality
  ```bash
  npm run test
  ```

### Git Workflow

1. **Branch Naming Convention**
   - Feature branches: `feature/service-name/feature-name`
   - Bug fixes: `fix/service-name/bug-description`
   - Documentation: `docs/description`
   - Example: `feature/task-service/task-filtering`

2. **Commit Message Guidelines**
   - Format: `type(scope): description`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
   - Example: `feat(task-service): add deadline notification`

3. **Pull Request Process**
   - Create a PR with a descriptive title
   - Fill in the PR template with details
   - Request reviews from team members
   - Address feedback and merge when approved

### Code Review Checklist

- Does the code fulfill the requirements?
- Is the code readable and maintainable?
- Are there appropriate tests?
- Does the code follow project conventions?
- Is error handling implemented properly?
- Are there any security concerns?
- Is the inter-service communication properly implemented?

## 👥 Collaboration Guide

### Team Roles and Responsibilities

- **Project Manager**: Coordinates the team, tracks progress, manages backlog
- **Frontend Developer**: Implements UI components and client-side logic
- **Backend Developers**: Specialized in specific microservices
  - Auth Service Developer
  - Task Service Developer
  - Team Service Developer
  - Notification Service Developer
- **DevOps Specialist**: Manages CI/CD pipeline and deployment

### Communication Channels

- **Daily Standups**: Brief meetings to discuss progress and blockers
- **Sprint Planning**: Bi-weekly sessions to plan upcoming work
- **Code Reviews**: Asynchronous feedback on pull requests
- **Team Chat**: Real-time communication via Slack/Discord
- **Documentation**: Central knowledge repository in project wiki

### Agile Development Process

1. **Sprint Planning**: Select tasks for the next 2-week sprint
2. **Task Assignment**: Team members claim tasks based on expertise
3. **Implementation**: Develop features with regular commits
4. **Code Review**: Peer review before merging to main branch
5. **Testing**: Ensure functionality works as expected
6. **Demo**: Present completed features to the team
7. **Retrospective**: Discuss what went well and improvements

## 🧪 Testing Strategy

### Testing Levels

- **Unit Tests**: Test individual functions and components
  - Frontend: Jest + React Testing Library
  - Backend: Jest + Supertest

- **Integration Tests**: Test interactions within a service
  - API endpoint testing
  - Database operations

- **Service Tests**: Test interactions between services
  - Service-to-service communication
  - Event handling

- **End-to-End Tests**: Test complete user flows
  - Cypress for browser testing

### Running Tests

```bash
# Run client tests
cd client
npm test

# Run specific service tests
cd backend/auth-service
npm test

# Run E2E tests
cd client
npm run test:e2e
```

## 🔄 CI/CD Pipeline

Our GitHub Actions workflow automates the following:

1. **Continuous Integration**:
   - Run linting and code style checks
   - Execute unit and integration tests for each service
   - Build application for production

2. **Continuous Deployment**:
   - Deploy microservices to staging environment on PR merge to develop
   - Deploy to production on PR merge to main
   - Run smoke tests after deployment

### Deployment Architecture

- **Containerization**: Each microservice packaged as a Docker container
- **Orchestration**: Kubernetes for container orchestration
- **Load Balancing**: Route traffic between service instances
- **Monitoring**: Prometheus and Grafana for service monitoring
- **Logging**: Centralized logging for all microservices

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Microservices Architecture](https://microservices.io/)
- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/home/)

## 🤝 Contributing

Interested in contributing? Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/service-name/amazing-feature`)
3. Commit your changes (`git commit -m 'feat(service-name): add amazing feature'`)
4. Push to the branch (`git push origin feature/service-name/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Last Updated: March 19, 2025*
