import { Box } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box>
      <Box
        display='flex'
        width='100%'
        flexDirection='column'
        alignItems='center'
        mx='auto'
        mt={3}
      >
        <Box
          width='100%'
          display='flex'
          flexDirection={{ md: 'row', xs: 'column', sm: 'column' }}
          gap={5}
          my={10}
        >
          <img
            className='image-inverted rotate'
            src='openai.png'
            alt='openai'
            style={{ width: '100px', margin: 'auto' }}
          />
          <img
            src='robot.png'
            alt='robot'
            style={{ width: '100px', margin: 'auto' }}
          />
        </Box>
        <Box display='flex' mx='auto'>
          <img
            src='chat.png'
            alt='chatbot'
            style={{
              display: 'flex',
              margin: 'auto',
              width: '700px',
              height: '500px',
              borderRadius: '20px',
              boxShadow: '-5px -5px 50px #3f4e4a',
              marginTop: '20px',
              marginBottom: '20px',
              padding: '10px',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
