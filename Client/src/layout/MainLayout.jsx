import { useLocation, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from '../components/navigation/Sidebar';
import TopNavbar from '../components/navigation/TopNavbar';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 18rem 1fr; // Sidebar 18rem, main takes the rest
  grid-template-rows: 60px 1fr;
  background: var(--background);
`;

const MainContent = styled.main`
  padding: 2rem;
  grid-column: 2;
  grid-row: 2;
  overflow-y: auto;
  height: calc(100vh - 60px);
  background: var(--background);
  width: 100%; // Take all available space in grid
  max-width: 100%;
  margin-left: 0;
`;

const SidebarWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / span 2;
  background: var(--surface);
  border-right: 1px solid var(--border);
  height: 100vh;
  position: fixed;
  width: 18rem; // Match grid column
`;

const NavbarWrapper = styled.div`
  grid-column: 2;
  grid-row: 1;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  height: 60px;
  position: fixed;
  left: 18rem;
  right: 0;
  z-index: 10;
`;

export default function MainLayout() {
  return (
    <LayoutContainer>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <NavbarWrapper>
        <TopNavbar />
      </NavbarWrapper>
      <MainContent>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
}