import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const pages = {
  sm: [
    '5th Edition',
    '20th Anniversary',
    'Chronicles of Darkness', 
  ],
  games: [
    '5th Edition',
    '20th Anniversary',
    'Chronicles of Darkness', 
  ],
  user: [
    'Characters', 
    'Servers', 
    'Account', 
    'Logout'
  ]
};
const routes = {
  "5th Edition": "v5/", 
  "20th Anniversary": "20th/", 
  "Chronicles of Darkness": "cod/",
  Characters: 'characters/',
  Servers: 'servers/',
  Account: 'account/',
  Logout: 'logout/',
}

function ResponsiveAppBar (props) {
  const [auth] = React.useState(false);
  const [scroll, setScroll] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElGames, setAnchorElGames] = React.useState(null);
  const lowRezLogo = 'https://media.discordapp.net/attachments/886983353922891816/1002174848375734362/logo_trans_low.png'

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };  

  const handleOpenGamesMenu = (event) => {
    setAnchorElGames(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseGamesMenu = () => {
    setAnchorElGames(null);
  };

  const loginButton = (
    <Box sx={{ flexGrow: 0 }}>
      <Button 
        color="primary"
        variant='contained'
        component={Link}
        to='login'
        disabled
      >
        Login Coming Soon!
      </Button>
    </Box>
  );

  const avatarMenu = (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {pages.user.map((page) => (
          <MenuItem 
            key={page} 
            onClick={handleCloseUserMenu}
            component={Link}
            to={routes[page]}
          >
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  const mdLinks = (
    <Box sx={{
        gap: '10px', 
        flexGrow: 1, 
        display: { xs: 'none', md: 'flex'},
        height: 64
      }}>
      <Button
        size="large"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handleOpenGamesMenu}
        onMouseOver={handleOpenGamesMenu}
      >
        Games            
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElGames}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={Boolean(anchorElGames)}
        onClose={handleCloseGamesMenu}
        MenuListProps={{ onMouseLeave: handleCloseGamesMenu }}
      >
        {pages.games.map((page) => (
          <MenuItem 
            key={page} 
            onClick={handleCloseGamesMenu}
            component={Link}
            to={routes[page]}
          >
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
      <Button
        size="large"
        href="https://discord.gg/p82yc8sKx2"
        target="_blank"
      >
        Discord Server                    
      </Button>
      <Button
        size="large"
        href="https://www.patreon.com/MiraiMiki"
        target="_blank"
      >
        Patreon             
      </Button>
    </Box>
  )

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  if (scroll && !trigger)
  {
    setScroll(false);
  }
  else if (!scroll && trigger) 
  {
    setScroll(true);
  }

  let authOption;
  if (auth) authOption = avatarMenu;
  else authOption = loginButton;

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/'>
            <Box 
              component="img"
              alt="Realm of Darkness Logo"
              loading="lazy"
              src={lowRezLogo}
              sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                mr: 1,
                height: '45px',
                width: '45px'
              }} 
            />
          </Link>         
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              wordSpacing: '-.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            REALM OF DARKNESS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.sm.map((page) => (
                <MenuItem 
                  key={page} 
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={routes[page]}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              <MenuItem  
                onClick={handleCloseNavMenu}
                component="a"
                href="https://discord.gg/p82yc8sKx2"
                target="_blank"
              >
                <Typography textAlign="center">Discord Server</Typography>
              </MenuItem>
              <MenuItem 
                onClick={handleCloseNavMenu}
                component="a"
                href="https://www.patreon.com/MiraiMiki"
                target="_blank"
              >
                <Typography textAlign="center">Patreon</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Link to='/'>
            <Box 
              component="img"
              alt="Realm of Darkness Logo"
              loading="lazy"
              src={lowRezLogo}
              sx={{ 
                display: { xs: 'flex', md: 'none' }, 
                mr: 1,
                height: '45px',
                width: '45px'
              }}  
            />
          </Link>          
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              wordSpacing: '-.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RoD
          </Typography>
          {mdLinks}
          {authOption}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
