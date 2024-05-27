import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Outlet, useNavigate } from 'react-router-dom';
import NavItem from './NavItem.tsx';
import { AppBar, DrawerHeader, drawerWidth, Main } from './Nav.styles.tsx';
import { navItems } from './navItems.ts';
import { useAuth } from '@/core/authentication/hooks/useAuth.tsx';
import { Button } from '@mui/material';
import { PathConstants } from '@/core/constants/path.constants.ts';
import { UserRole } from '@/core/enums/UserRole.ts';

export default function Nav() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { authData, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [allNavItems, setAllNavItems] = useState(navItems);

  useEffect(() => {
    if (authData) {
      setAllNavItems([
        ...navItems,
        {
          listItemText: 'Manage appointments',
          listItemPath: `manage-appointments/${authData.id}`,
          requireLogin: true,
          allowedRoles: [UserRole.DOCTOR],
        },
      ]);
    }
  }, [authData]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h6' noWrap component='div'>
              Clinic System
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: '1.2em',
                alignItems: 'center',
              }}
            >
              <Typography variant='h6' noWrap component='div'>
                Hello,{' '}
                {authData ? authData.name + ' ' + authData.surname : 'Guest'}
              </Typography>
              {authData ? (
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  color='secondary'
                  variant='contained'
                  onClick={() => navigate(PathConstants.LOGIN_PATH)}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {allNavItems.map((navItem, index) => (
            <NavItem
              key={index}
              listItemText={navItem.listItemText}
              listItemPath={navItem.listItemPath}
              requireLogin={navItem.requireLogin}
              allowedRoles={navItem.allowedRoles}
            />
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
