import React from 'react';
import { Link } from 'react-router-dom'; // Switch will iterate over the routes and only render the first one that matches the current pathname

const Header = () => {
  return (
    <div>
      <Link to="/">LEXI</Link>
    </div>
  );
};

export default Header;
