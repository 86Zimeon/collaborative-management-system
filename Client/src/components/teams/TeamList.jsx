import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserPlus, faSignOutAlt, faCrown, faLock, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { useRealtime } from '../../hooks/useRealtime';
import { useUser } from '../../context/UserContext';

const TeamContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const TeamCard = styled.div`
  background: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid var(--border);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const TeamHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const TeamTitle = styled.h3`
  margin: 0;
  color: var(--text);
  font-size: 1.25rem;
`;

const TeamDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0.5rem 0 1rem;
`;

const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const MemberAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.$image ? `url(${props.$image})` : 'var(--primary)'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.875rem;
  position: relative;

  ${props => props.$isLeader && `
    &::after {
      content: '';
      position: absolute;
      right: -2px;
      top: -2px;
      width: 12px;
      height: 12px;
      background: var(--warning);
      border-radius: 50%;
      border: 2px solid var(--card-bg);
    }
  `}
`;

const TeamActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  justify-content: flex-end;
`;

const TeamMeta = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0.5rem 0;
`;

const Badge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  background: ${props => props.$type === 'public' ? 'var(--success-light)' : 'var(--warning-light)'};
  color: ${props => props.$type === 'public' ? 'var(--success)' : 'var(--warning)'};
`;

export default function TeamList({ teams: initialTeams, onJoinTeam, onLeaveTeam }) {
  const [teams, setTeams] = useState(initialTeams || []);
  const { user } = useUser();

  const handleTeamUpdate = useCallback((update) => {
    setTeams(prevTeams => {
      const teamIndex = prevTeams.findIndex(t => t._id === update._id);
      if (teamIndex === -1) {
        return [...prevTeams, update];
      } else {
        const newTeams = [...prevTeams];
        newTeams[teamIndex] = {
          ...newTeams[teamIndex],
          ...update
        };
        return newTeams;
      }
    });
  }, []);

  // Subscribe to each team for real-time updates
  teams.forEach(team => {
    useRealtime('team', team._id, handleTeamUpdate);
  });

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <TeamContainer>
      {teams.map(team => (
        <TeamCard key={team._id}>
          <TeamHeader>
            <TeamTitle>
              {team.name}
              <FontAwesomeIcon 
                icon={team.isPublic ? faGlobe : faLock} 
                className="ms-2"
                title={team.isPublic ? 'Public Team' : 'Private Team'}
                style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}
              />
            </TeamTitle>
          </TeamHeader>

          <TeamDescription>{team.description}</TeamDescription>

          <TeamMeta>
            <span>
              <FontAwesomeIcon icon={faUser} className="me-1" />
              {team.members?.length || 0} members
            </span>
            {team.openPositions?.length > 0 && (
              <span>
                <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                {team.openPositions.length} open positions
              </span>
            )}
          </TeamMeta>
          
          <MemberList>
            {team.members?.map(member => (
              <MemberAvatar 
                key={member.user._id || member.user} 
                title={member.user.name || 'Member'} 
                $image={member.user.avatar}
                $isLeader={team.leader === (member.user._id || member.user)}
              >
                {!member.user.avatar && getInitials(member.user.name || 'Member')}
                {team.leader === (member.user._id || member.user) && (
                  <FontAwesomeIcon icon={faCrown} style={{position: 'absolute', right: -4, top: -4, fontSize: '0.75rem', color: 'var(--warning)'}} />
                )}
              </MemberAvatar>
            ))}
          </MemberList>

          <TeamActions>
            {team.members?.some(m => m.user._id === user.id || m.user === user.id) ? (
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={() => onLeaveTeam(team._id)}
                disabled={team.leader === user.id}
                title={team.leader === user.id ? "Team leader cannot leave the team" : "Leave team"}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                Leave Team
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onJoinTeam(team._id)}
                disabled={team.joinRequests?.some(req => 
                  req.user === user.id && req.status === 'pending'
                )}
              >
                <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                {team.joinRequests?.some(req => 
                  req.user === user.id && req.status === 'pending'
                ) ? 'Request Pending' : 'Join Team'}
              </button>
            )}
          </TeamActions>
        </TeamCard>
      ))}
    </TeamContainer>
  );
}