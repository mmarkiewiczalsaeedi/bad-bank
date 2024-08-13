import { useEffect, useState } from 'react';
import { Avatar, Group, Text, Button } from '@mantine/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useLocation } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Utility function to get initials from the name
const getInitials = (name: string) => {
  if (!name) return '';

  const nameParts = name.trim().split(' ');

  if (nameParts.length > 1) {
    return (
      nameParts[0].charAt(0).toUpperCase() + 
      nameParts[1].charAt(0).toUpperCase()
    );
  }

  return nameParts[0].charAt(0).toUpperCase();
};

export const Header = () => {
  const [user] = useAuthState(auth);
  const [userName, setUserName] = useState<string>('');
  const location = useLocation();

  useEffect(() => {
    const fetchUserName = async () => {
      if (user?.uid) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name); // Assuming 'name' is the field storing the user's full name
        }
      }
    };

    fetchUserName();
  }, [user]);

  // Function to handle logout
  const handleLogout = () => {
    signOut(auth);
  };

  // Generate initials based on the fetched user name
  const initials = getInitials(userName);

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
              alt={userName || user.email || 'User Avatar'}
              sx={{
                backgroundColor: '#e0f7fa', // Light cyan background
                border: '2px solid #00838f', // Teal border
                color: '#00838f', // Text color matching the border
                fontWeight: 'bold', // Bold text for initials
                fontSize: '16px', // Adjusted font size for better visibility
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {initials}
            </Avatar>
            <Text weight={500} size="sm" style={{ marginLeft: '10px', color: '#00838f' }}>
              {userName || user.email}
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
