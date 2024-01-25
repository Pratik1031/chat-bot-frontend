import { Box, Avatar, Text } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function extractCodeFromString(message: string) {
  if (message.includes('```')) {
    const blocks = message.split('```');
    return blocks;
  }
}

function isCodeBlock(str: string) {
  if (
    str.includes('=') ||
    str.includes(';') ||
    str.includes('[') ||
    str.includes(']') ||
    str.includes('{') ||
    str.includes('}') ||
    str.includes('#') ||
    str.includes('//')
  ) {
    return true;
  }
  return false;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: 'user' | 'assistant';
}) => {
  const messageBlocks = extractCodeFromString(content);
  const auth = useAuth();

  return role === 'assistant' ? (
    <Box
      display='flex'
      p={2}
      bgColor='green.200'
      borderRadius={2}
      my={1}
      gap={2}
    >
      <Avatar ml='0'>
        <img src='openai.png' alt='openai' width={'30px'} />
      </Avatar>
      <Box>
        {!messageBlocks && <Text fontSize='20px'>{content}</Text>}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language='javascript'
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Text key={index} fontSize='20px'>
                {block}
              </Text>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box display='flex' p={4} bgColor='#d9e7e8' borderRadius={2} gap={2}>
      <Avatar ml='0' p={1} bgColor='black' color='white'>
        {auth?.user?.name[0]}
        {auth?.user?.name.split(' ')[1][0]}
      </Avatar>
      <Box>
        {!messageBlocks && <Text fontSize='20px'>{content}</Text>}
        {messageBlocks &&
          messageBlocks.length &&
          messageBlocks.map((block, index) =>
            isCodeBlock(block) ? (
              <SyntaxHighlighter
                key={index}
                style={coldarkDark}
                language='javascript'
              >
                {block}
              </SyntaxHighlighter>
            ) : (
              <Text key={index} fontSize='20px'>
                {block}
              </Text>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
