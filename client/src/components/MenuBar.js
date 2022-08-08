import React, {useContext, useState } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {AuthContext} from '../context/auth'

function MenuBar() {
  
  const {user, logout} = useContext(AuthContext)

  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.slice(1);
  const [activeItem, setActiveItem] = useState(path)

  const handleItemClick = (e, { name }) => setActiveItem(name);
  
  const menuBar = user ? (
    <Menu pointing secondary size="massive" color = "blue">
          <Menu.Item
            name= "Home"
            active = {activeItem === 'Home'}
            onClick = {handleItemClick}
            as={Link}
            to="/"
          />

          <Menu.Menu position='right'>
            <Menu.Item
              name='Profile'
              active = {activeItem === 'Profile'}
              as={Link}
              to={`/profile/${user.username}`}
              onClick = {handleItemClick}
            />
            <Menu.Item
                name='logout'
                onClick={logout}
                as={Link}
                to='/'

            />
      
          </Menu.Menu>
        </Menu> ) : (
          <Menu pointing secondary size="massive" color = "blue">
          <Menu.Item
            name='Home'
            active={activeItem === 'Home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />
 
          <Menu.Menu position='right'>
            <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={handleItemClick}
                as={Link}
                to="/login"
            />
            <Menu.Item
                name='register'
                active={activeItem === 'register'}
                onClick={handleItemClick}
                as={Link}
                to="/register"
            />
          </Menu.Menu>
        </Menu>
        )

  return menuBar;
}


export default MenuBar;