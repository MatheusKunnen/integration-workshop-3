import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = ({ text, destination, onClick }) => {
  const navigate = useNavigate();
  const handleClick = (dest) => {
    if (onClick) {
      onClick();
    }
    navigate(dest);
  };

  return (
    <Wrapper onClick={() => handleClick(destination)}>
      <Container>
        <Text>{text}</Text>
      </Container>
    </Wrapper>
  );
};

export default Button;

// Styles
export const Wrapper = styled.div`
  background-color: var(--color-secondary-black);
  border-radius: 10px;
  cursor: pointer;
  margin: 30px;
`;

export const Container = styled.div`
  background-color: var(--color-secondary-black);
  border-radius: 10px;
  padding: 24px 150px;
`;

export const Text = styled.p`
  text-align: center;
  font-family: "Roboto-Bold";
  font-size: 42px;
  color: var(--color-secondary-white);
  line-height: 1;
  text-transform: uppercase;
`;
