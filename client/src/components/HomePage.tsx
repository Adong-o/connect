import { Box, Button, Heading, Input, VStack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidV4 } from 'uuid';

const HomePage: React.FC = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const createAndJoin = () => {
    const newRoomId = uuidV4();
    navigate(`/room/${newRoomId}`);
  };

  const joinRoom = () => {
    if (roomId) {
      navigate(`/room/${roomId}`);
    } else {
      alert('Please enter a room ID to join.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.50"
    >
      <VStack spacing={8} p={12} bg="white" borderRadius="lg" boxShadow="xl">
        <Heading as="h1" size="2xl" color="teal.500">
          ConnectSphere
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Your open-source video conferencing solution.
        </Text>
        <VStack spacing={4} width="100%">
          <Input
            placeholder="Enter Room ID to join..."
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            size="lg"
            focusBorderColor="teal.500"
          />
          <Button colorScheme="teal" size="lg" width="100%" onClick={joinRoom}>
            Join Room
          </Button>
        </VStack>
        <Text>or</Text>
        <Button colorScheme="purple" size="lg" width="100%" onClick={createAndJoin}>
          Create a New Room
        </Button>
      </VStack>
    </Box>
  );
};

export default HomePage;
