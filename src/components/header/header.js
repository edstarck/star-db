import React from 'react';

import './header.css';

const Header = () => {
  return (
    <div className="header d-flex">
      <h3>
        <a href="/">Star DB</a>
      </h3>
      <ul className="d-flex">
        <li>
          <a href="people.html">People</a>
        </li>
        <li>
          <a href="planets.html">Planets</a>
        </li>
        <li>
          <a href="starships.html">Starships</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
