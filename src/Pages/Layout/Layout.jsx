import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import './Layout.css';

export default function Layout({ children, username }) {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <TopNavbar username={username} />
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
