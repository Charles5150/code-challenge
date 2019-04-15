import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => (
  <header>
    <h2>BILLIN CODE CHALLENGE</h2>
    <div>
      <Link to="/">Home</Link>
      <span>     </span>
      <Link to="/new">New</Link>
    </div>

  </header>
)