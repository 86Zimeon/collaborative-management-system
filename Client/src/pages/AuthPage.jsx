import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../context/UserContext';
import { authService } from '../services/authService';

const AuthContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: var(--background);
`;

const AuthCard = styled.div`
  background: var(--surface);
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--input-bg);
  color: var(--text);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(220, 53, 69, 0.1);
  border-radius: 4px;
`;

const PasswordHint = styled.small`
  color: var(--text-secondary);
  display: block;
  margin-top: 0.25rem;
`;

const FormTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--text);
`;

const ToggleAuth = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--text-secondary);

  button {
    background: none;
    border: none;
    color: var(--primary);
    cursor: pointer;
    padding: 0;
    font-size: inherit;
    text-decoration: underline;

    &:hover {
      color: var(--primary-dark);
    }
  }
`;

export default function AuthPage() {
  const { login } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.target);
    const registerData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const data = await authService.register(registerData);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const formData = new FormData(e.target);
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const data = await authService.login(loginData);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setError('');
    setIsLoginMode(!isLoginMode);
  };

  return (
    <AuthContainer>
      <AuthCard>
        <FormTitle>{isLoginMode ? 'Login' : 'Create Account'}</FormTitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {isLoginMode ? (
          <>
            <Form onSubmit={handleLogin}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={isLoading}
                autoComplete="email"
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
            </Form>
            <ToggleAuth>
              Don't have an account?{' '}
              <button type="button" onClick={toggleAuthMode}>
                Create one
              </button>
            </ToggleAuth>
          </>
        ) : (
          <>
            <Form onSubmit={handleRegister}>
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                disabled={isLoading}
                autoComplete="name"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={isLoading}
                autoComplete="email"
              />
              <div>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  disabled={isLoading}
                  minLength="8"
                  autoComplete="new-password"
                />
                <PasswordHint>
                  Password must be at least 8 characters long
                </PasswordHint>
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </Form>
            <ToggleAuth>
              Already have an account?{' '}
              <button type="button" onClick={toggleAuthMode}>
                Log in
              </button>
            </ToggleAuth>
          </>
        )}
      </AuthCard>
    </AuthContainer>
  );
}