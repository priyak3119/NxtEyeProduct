import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Button,
  Typography,
} from '@mui/material';
// import nxteyeLogo from '../assets/nxteye logo.png';
// import nxteyeLogo1 from '../assets/neu-img.png';
import { useAuth } from '../contexts/AuthContext'; // Your auth context

export default function Navbar() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { isAuthenticated, user, isAdmin, logout } = useAuth();

  // Public nav links visible when NOT logged in
  const publicNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Demo', path: '/demo' },
    { name: 'Contact', path: '/contact' },
  ];

  // Auth links shown when NOT logged in
  const authLinks = [
    { name: 'Login', path: '/login' },
    { name: 'Admin', path: '/admin-login' },
  ];

  // Links to show when logged in
  const loggedInLinks = [
    // { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', adminOnly: false },
    { name: 'Admin Panel', path: '/admin', adminOnly: true },
  ];

  const linkStyle = (isActive) => ({
    fontWeight: isActive ? '700' : '500',
    color: isActive ? '#fff' : '#C9A44C',
    textDecoration: 'none',
    padding: '6px 8px',
    cursor: 'pointer',
    borderRadius: 4,
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#C9A44C',
      color: '#0A1A2F',
      textDecoration: 'none',
    },
  });

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(10, 26, 47, 0.85)',
        borderBottom: '1px solid rgba(201, 164, 76, 0.3)',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1.5,
        }}
      >
        {/* Logos on the left */}
        {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
          <img
            src={nxteyeLogo}
            alt="NxtEye Logo"
            style={{
              width: isMobile ? 35 : 55,
              height: 'auto',
              userSelect: 'none',
            }}
          />
          <img
            src={nxteyeLogo1}
            alt="NxtEye Secondary Logo"
            style={{
              width: isMobile ? 80 : 120,
              height: 'auto',
              userSelect: 'none',
            }}
          />
        </Box> */}

        {/* Menus on right */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {/* Show public nav only if NOT logged in */}
            {!isAuthenticated &&
              publicNavLinks.map(({ name, path }) => {
                const isActive =
                  path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(path);
                return (
                  <Link key={path} to={path} style={linkStyle(isActive)}>
                    {name}
                  </Link>
                );
              })}

            {/* If not logged in, show login/admin-login */}
            {!isAuthenticated &&
              authLinks.map(({ name, path }) => (
                <Link key={path} to={path} style={linkStyle(false)}>
                  {name}
                </Link>
              ))}

            {/* If logged in, show welcome + minimal menus */}
            {isAuthenticated && (
              <>
                <Typography
                  sx={{
                    color: '#C9A44C',
                    fontWeight: 600,
                    userSelect: 'none',
                    mr: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Welcome, {user?.firstName || 'User'}
                </Typography>

                {/* Show only dashboard/admin based on role */}
                {loggedInLinks
                  .filter(
                    (link) => !link.adminOnly || (link.adminOnly && isAdmin)
                  )
                  .map(({ name, path }) => {
                    const isActive =
                      path === '/'
                        ? location.pathname === '/'
                        : location.pathname.startsWith(path);
                    return (
                      <Link key={path} to={path} style={linkStyle(isActive)}>
                        {name}
                      </Link>
                    );
                  })}

                {/* Logout button */}
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    color: '#C9A44C',
                    borderColor: '#C9A44C',
                    borderRadius: 2,
                    textTransform: 'none',
                    ml: 1,
                    '&:hover': {
                      backgroundColor: '#C9A44C',
                      color: '#0A1A2F',
                      borderColor: '#C9A44C',
                    },
                  }}
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}
