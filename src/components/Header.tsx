import { Avatar, Group, Text, Button } from '@mantine/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

// Utility function to get initials
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
};

export const Header = () => {
  const location = useLocation();
  const [user] = useAuthState(auth);

  // Function to handle logout
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Group
      spacing="xs"
      style={{
        padding: '10px',
        height: '60px', // Ensure a consistent height
        backgroundColor: '#f8f9fa',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        justifyContent: 'flex-end',
        paddingRight: '20px', // Add space from the right edge
      }}
    >
      {user ? (
        <>
          <Link to="/alldata" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar
              radius="xl"
              size={40}
              alt={user.displayName || 'User'}
              styles={{
                root: {
                  backgroundColor: '#e0f7fa', // Light cyan background
                  border: '2px solid #00838f', // Teal border
                  color: '#00838f', // Text color matching the border
                  fontWeight: 'bold', // Bold text for initials
                },
              }}
            >
              {getInitials(user.displayName || user.email || '')}
            </Avatar>
            <Text weight={500} size="sm" style={{ marginLeft: '10px', color: '#00838f' }}>
              {user.displayName || user.email}
            </Text>
          </Link>
          <Button variant="outline" color="teal" onClick={handleLogout} style={{ marginLeft: '10px' }}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ textDecoration: 'none', marginRight: '10px' }}>
            <Button variant="outline" color="teal">
              Log In
            </Button>
          </Link>
          <Link to="/create-account" style={{ textDecoration: 'none' }}>
            <Button variant="filled" color="teal">
              Create Account
            </Button>
          </Link>
        </>
      )}
    </Group>
  );
};
