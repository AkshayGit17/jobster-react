import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const NavLinks = ({ toggle }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        console.log(link);
        const { id, text, path, icon } = link;
        return (
          <NavLink
            to={path}
            id={id}
            className={({ isActive }) => {
              return isActive ? 'nav-link active' : 'nav-link';
            }}
            onClick={toggle}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;