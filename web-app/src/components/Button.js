import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = ({ text, destination}) => {
  return (
    <Wrapper>
      <Link to={destination} style={{ textDecoration: "none" }}>
        <Container>
          <Text>{text}</Text>
        </Container>
      </Link>
    </Wrapper>
  );
};

export default Button;

// Styles
export const Wrapper = styled.div`
  background-color: var(--color-secondary-black);
  border-radius: 10px;
  width: auto;
`;

export const Container = styled.div`
  background-color: var(--color-secondary-black);
  border-radius: 10px;
`;

export const Text = styled.p`
  text-align: center;
  font-family: "Roboto-Bold";
  font-size: 42px;
  color: var(--color-secondary-white);
  line-height: 2;
  text-transform: uppercase;
`;
