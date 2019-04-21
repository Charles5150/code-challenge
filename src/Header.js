import React from 'react';
import { Link } from 'react-router-dom';
import {Button, Icon} from 'react-materialize';

const Header = () => (
  <header>
    <h2>BILLIN CODE CHALLENGE</h2>
    <div>
      <Link to="/">
        <Button waves="light" style={{marginRight: '5px'}}>
          Home
          <Icon left>
            home
          </Icon>
        </Button>
      </Link>
    </div>
  </header>
);

export default Header;