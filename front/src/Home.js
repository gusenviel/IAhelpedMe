import React from 'react';
import styled from 'styled-components';

const HomeWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 36px;
  color: #333;
`;

const Text = styled.p`
  font-size: 18px;
  color: #666;
`;

function Home() {
    return (
        <HomeWrapper>
            <Title>Welcome to Task Manager</Title>
            <Text>This is the home page of your task manager app.</Text>
        </HomeWrapper>
    );
}

export default Home;