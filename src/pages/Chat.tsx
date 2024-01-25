import { useNavigate } from 'react-router-dom';
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from '../helpers/api-communicators';
import toast from 'react-hot-toast';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Avatar, Box, Button, IconButton, Text } from '@chakra-ui/react';
import { IoMdSend } from 'react-icons/io';
import ChatItem from '../components/chat/ChatItem';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = '';
    }
    const newMessage: Message = { role: 'user', content };
    setChatMessages((prev) => [...prev, newMessage]);
    const chatData = await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading('Deleting Chats', { id: 'deletechats' });
      await deleteUserChats();
      setChatMessages([]);
      toast.success('Deleted Chats Successfully', { id: 'deletechats' });
    } catch (error) {
      console.log(error);
      toast.error('Deleting chats failed', { id: 'deletechats' });
    }
  };

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading('Loading Chats', { id: 'loadchats' });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success('Successfully loaded chats', { id: 'loadchats' });
        })
        .catch((err) => {
          console.log(err);
          toast.error('Loading Failed', { id: 'loadchats' });
        });
    }
  }, [auth]);

  useEffect(() => {
    if (!auth?.user) {
      return navigate('/login');
    }
  }, [auth]);

  return (
    <Box display='flex' flex={1} width='100%' height='100%' mt={3} gap={3}>
      <Box
        display={{ md: 'flex', xs: 'none', sm: 'none' }}
        flex={0.2}
        flexDirection='column'
      >
        <Box
          display='flex'
          width='100%'
          height='60vh'
          bgColor='rgb(242, 246, 249)'
          borderRadius={5}
          flexDirection='column'
          mx={3}
        >
          <Avatar
            mx='auto'
            my={1}
            bgColor='black'
            color='white'
            fontWeight={500}
            p={2}
          >
            {auth?.user?.name?.[1] ?? ''}
            {auth?.user?.name?.split(' ')?.[1]?.[0] ?? ''}
          </Avatar>
          <Text mx='auto' fontFamily='work sans'>
            You are talking to a ChatBOT
          </Text>
          <Text mx='auto' fontFamily='work sans' my={4} p={3}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing personal information
          </Text>
          <Button
            onClick={handleDeleteChats}
            width='200px'
            my='auto'
            color='white'
            fontWeight='700'
            borderRadius={3}
            mx='auto'
            bgColor='red.300'
            _hover={{
              bgColor: 'red.400',
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        display='flex'
        flex={{ md: 0.8, xs: 1, sm: 1 }}
        flexDirection='column'
        px={3}
      >
        <Text fontSize='40px' color='black' mb={2} mx='auto' fontWeight='600'>
          Model - GPT 3.5 Turbo
        </Text>
        <Box
          width='100%'
          height='60vh'
          borderRadius={3}
          mx='auto'
          display='flex'
          flexDirection='column'
          overflow='scroll'
          overflowX='hidden'
          overflowY='auto'
          scrollBehavior='smooth'
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'rgb(31, 33, 35)',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <input
            ref={inputRef}
            type='text'
            style={{
              width: '70vw',
              backgroundColor: 'transparent',
              padding: '30px',
              border: 'none',
              outline: 'none',
              color: 'blanchedalmond',
              fontSize: '20px',
            }}
          />
          <IconButton
            aria-label='send'
            color='black'
            onClick={handleSubmit}
            mx={2}
            mt={5}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
