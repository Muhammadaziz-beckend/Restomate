import { NavLink } from "react-router-dom";

import Beck from '../static/svgs/beck.svg'

const Header = ({ text, beck = "/" }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header_items">
          <NavLink to={beck} className="logo">
            {text ? <div className="beck_div"><img className="beck_svg" src={Beck} alt="" /> {text}</div> : <>Restomate</>}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
