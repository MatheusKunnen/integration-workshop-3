import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = ({ text, destination }) => {
  const navigate = useNavigate();
  const handleClick = (dest) => {
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
  margin: 20px;
`;

export const Container = styled.div`
  background-color: var(--color-secondary-black);
  border-radius: 10px;
  padding: 0px 150px;
`;

export const Text = styled.p`
  text-align: center;
  font-family: "Roboto-Bold";
  font-size: 42px;
  color: var(--color-secondary-white);
  line-height: 1;
  text-transform: uppercase;
`;
