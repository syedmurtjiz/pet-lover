import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/cats" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Cats
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
