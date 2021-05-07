import React, { useEffect } from 'react';
import './Navbar.css';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';

function Navbar(props) {

  const history = useHistory();

  function LogOut() {
    sessionStorage.clear();
    history.push('/login')
 }

 function userIsAuthenticated() {
   if(!sessionStorage.getItem("@T_A")){
    history.push("/login")
   }
 } 
  useEffect(() => {
    userIsAuthenticated()
  }, [])

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
      <header style={{width: '100%'}}>
        <div className="container" id="nav-container">
          <nav className=" navbar-expand-lg navbar-dark menu-top">
            <div>
              <h3 style={{marginBottom: 0}}>{props.title}</h3>
            </div>
            <div className="Avatars">
              <label className="avatar-label">Maria José</label>
              <button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{ border: 'none', backgroundColor: 'transparent' }}>
                <Avatar
                  src="/broken-image.jpg"
                />
              </button>
              <Menu
                className="Menu-avatar"
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={LogOut}>Sair</MenuItem>
              </Menu>
            </div>
          </nav>
        </div>
      </header>
  );
}

export default Navbar;
