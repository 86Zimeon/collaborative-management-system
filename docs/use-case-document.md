# Use Case Document

## Collaborative Task Management Web App

### 1. Introduction

#### 1.1 Purpose
This document outlines the use cases for the Collaborative Task Management Web App, describing how users will interact with the system and the expected behaviors for each interaction.

#### 1.2 Scope
The document covers all major user interactions with the application, focusing on authentication, task management, team collaboration, and notification features.

#### 1.3 Actors
- **Regular User**: Team member with standard permissions
- **Team Administrator**: User with elevated permissions for team management
- **System Administrator**: User with system-wide administrative capabilities
- **Authentication System**: External system for user verification

### 2. Use Case Diagrams

*Note: In a complete document, UML diagrams would be included here*

### 3. Use Case Specifications

#### 3.1 User Authentication

##### 3.1.1 UC-101: User Registration
**Primary Actor**: Unregistered User
**Description**: User creates a new account in the system
**Preconditions**: User is not logged in
**Main Flow**:
1. User navigates to registration page
2. User enters email, password, and profile information
3. System validates input
4. System creates user account
5. System sends verification email
6. User verifies email
7. System activates account
**Alternative Flows**:
- A1: User registers using Google Auth
- A2: Email address already exists
**Postconditions**: User account is created and active

##### 3.1.2 UC-102: User Login
**Primary Actor**: Registered User
**Description**: User authenticates with the system
**Preconditions**: User has an active account
**Main Flow**:
1. User navigates to login page
2. User enters credentials
3. System validates credentials
4. System generates authentication token
5. System redirects to dashboard
**Alternative Flows**:
- A1: User logs in with Google Auth
- A2: Invalid credentials
- A3: Forgotten password
**Postconditions**: User is authenticated and session is established

##### 3.1.3 UC-103: Password Reset
**Primary Actor**: Registered User
**Description**: User resets forgotten password
**Preconditions**: User has an active account
**Main Flow**:
1. User clicks "Forgot Password"
2. User enters email address
3. System sends password reset link
4. User clicks link and enters new password
5. System updates password
**Alternative Flows**:
- A1: Email not found
**Postconditions**: User password is updated

#### 3.2 Task Management

##### 3.2.1 UC-201: Create Task
**Primary Actor**: Regular User
**Description**: User creates a new task
**Preconditions**: User is authenticated
**Main Flow**:
1. User navigates to task creation interface
2. User enters task title, description, and details
3. User sets deadline and priority
4. User assigns team members
5. System validates input
6. System creates task
**Alternative Flows**:
- A1: Validation errors
**Postconditions**: New task is created in the system

##### 3.2.2 UC-202: Assign Task
**Primary Actor**: Regular User
**Description**: User assigns task to team members
**Preconditions**: Task exists, user has permissions
**Main Flow**:
1. User opens existing task
2. User selects team members
3. User confirms assignment
4. System updates task assignment
5. System notifies assigned users
**Alternative Flows**:
- A1: User self-assigns task
**Postconditions**: Task is assigned to specified users

##### 3.2.3 UC-203: Update Task Status
**Primary Actor**: Regular User
**Description**: User updates the status of a task
**Preconditions**: Task exists, user has permissions
**Main Flow**:
1. User opens existing task
2. User changes status (e.g., In Progress, Completed)
3. System updates task status
4. System notifies relevant users
**Alternative Flows**:
- A1: Status change requires approval
**Postconditions**: Task status is updated

##### 3.2.4 UC-204: Set Task Priority
**Primary Actor**: Regular User
**Description**: User sets or updates task priority
**Preconditions**: Task exists, user has permissions
**Main Flow**:
1. User opens existing task
2. User selects priority level
3. System updates task priority
**Alternative Flows**: None
**Postconditions**: Task priority is updated

##### 3.2.5 UC-205: Set Task Deadline
**Primary Actor**: Regular User
**Description**: User sets or updates task deadline
**Preconditions**: Task exists, user has permissions
**Main Flow**:
1. User opens existing task
2. User sets deadline date/time
3. System updates task deadline
4. System schedules deadline notifications
**Alternative Flows**: None
**Postconditions**: Task deadline is updated

#### 3.3 Team Collaboration

##### 3.3.1 UC-301: Create Team
**Primary Actor**: Regular User
**Description**: User creates a new team
**Preconditions**: User is authenticated
**Main Flow**:
1. User navigates to team creation interface
2. User enters team name and description
3. System creates team
4. System assigns user as team administrator
**Alternative Flows**: None
**Postconditions**: New team is created

##### 3.3.2 UC-302: Invite Team Member
**Primary Actor**: Team Administrator
**Description**: Administrator invites user to join team
**Preconditions**: Team exists, user is team administrator
**Main Flow**:
1. Administrator navigates to team settings
2. Administrator enters invitee's email
3. System sends invitation
4. Invitee accepts invitation
5. System adds user to team
**Alternative Flows**:
- A1: Invitee declines invitation
- A2: Invitee is not a registered user
**Postconditions**: User is added to the team

##### 3.3.3 UC-303: Comment on Task
**Primary Actor**: Regular User
**Description**: User adds comment to a task
**Preconditions**: Task exists, user has permissions
**Main Flow**:
1. User opens existing task
2. User writes comment
3. System adds comment to task
4. System notifies relevant users
**Alternative Flows**:
- A1: User mentions another user in comment
**Postconditions**: Comment is added to task

##### 3.3.4 UC-304: Manage Team Settings
**Primary Actor**: Team Administrator
**Description**: Administrator manages team configuration
**Preconditions**: Team exists, user is team administrator
**Main Flow**:
1. Administrator navigates to team settings
2. Administrator updates team information
3. System saves changes
**Alternative Flows**:
- A1: Administrator changes user roles
- A2: Administrator removes team member
**Postconditions**: Team settings are updated

#### 3.4 Notification System

##### 3.4.1 UC-401: Configure Notifications
**Primary Actor**: Regular User
**Description**: User configures notification preferences
**Preconditions**: User is authenticated
**Main Flow**:
1. User navigates to notification settings
2. User selects notification types and channels
3. System saves preferences
**Alternative Flows**: None
**Postconditions**: User notification preferences are updated

##### 3.4.2 UC-402: View Notifications
**Primary Actor**: Regular User
**Description**: User views received notifications
**Preconditions**: User is authenticated
**Main Flow**:
1. User clicks notification icon
2. System displays notifications
3. User selects specific notification
4. System navigates to relevant content
**Alternative Flows**:
- A1: User marks notification as read
- A2: User clears all notifications
**Postconditions**: User views notification details

#### 3.5 CI/CD Pipeline

##### 3.5.1 UC-501: Deploy Application
**Primary Actor**: System Administrator
**Description**: Administrator deploys application using CI/CD pipeline
**Preconditions**: Code changes are committed to repository
**Main Flow**:
1. Administrator triggers deployment
2. System runs automated tests
3. System builds application
4. System deploys to target environment
5. System verifies deployment
**Alternative Flows**:
- A1: Tests fail
- A2: Build fails
- A3: Deployment fails
**Postconditions**: Application is deployed to target environment

##### 3.5.2 UC-502: Monitor Deployment
**Primary Actor**: System Administrator
**Description**: Administrator monitors deployment status
**Preconditions**: Deployment is initiated
**Main Flow**:
1. Administrator navigates to monitoring dashboard
2. System displays deployment metrics
3. Administrator reviews metrics
**Alternative Flows**:
- A1: Administrator rolls back deployment
**Postconditions**: Deployment status is verified

### 4. Non-Functional Requirements

#### 4.1 Performance
- The system shall respond to user actions within 3 seconds
- The system shall support up to 100 concurrent users

#### 4.2 Security
- The system shall encrypt all user data
- The system shall implement secure authentication mechanisms
- The system shall prevent unauthorized access to tasks and teams

#### 4.3 Usability
- The system shall have an intuitive user interface
- The system shall be accessible on mobile devices
- The system shall provide helpful error messages

### 5. Glossary

- **Task**: A unit of work with attributes like title, description, assignee, deadline, and priority
- **Team**: A group of users collaborating on tasks
- **Notification**: System-generated alert about relevant activities
- **CI/CD**: Continuous Integration/Continuous Deployment, automated process for building and deploying code

---

*Document Version: 1.0*
*Last Updated: March 18, 2025*
