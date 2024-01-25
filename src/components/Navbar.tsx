import { Box, Button, Flex, Heading, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const auth = useAuth();

  return (
    <Flex>
      <Box mt={2} p={2}>
        <Link to='/'>
          <Heading>LOGO</Heading>
        </Link>
      </Box>
      <Spacer />
      <Box mt={2}>
        {auth?.isLoggedIn ? (
          <>
            <Link to='/chat'>
              <Button variant='ghost' color='black'>
                Go to Chat
              </Button>
            </Link>
            <Link to='/'>
              <Button variant='ghost' color='black'>
                Logout
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to='/login'>
              <Button variant='ghost' color='black'>
                Login
              </Button>
            </Link>
            <Link to='/signup'>
              <Button variant='ghost' color='black'>
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
