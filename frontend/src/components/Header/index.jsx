import { Link } from 'react-router-dom';
import './styles.css';
import Button from '../Button';

const Header = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container flex justify-between align-center">
        <Link to="/" className="navbar-logo">
          CodeSnippets
        </Link>
        
        <div className="nav-menu flex">
          <Link to="/snippets" className="nav-item">Snippets</Link>
          <Link to="/favorites" className="nav-item">Favorites</Link>
          <Link to="/profile" className="nav-item">Profile</Link>
        </div>

        <div className="nav-actions flex align-center">
          <Button variant='primary-outlined' buttonText={'logout'}></Button>
        </div>
      </div>
    </nav>
  );
};

export default Header;