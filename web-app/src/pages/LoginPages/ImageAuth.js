import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { H3 } from "../../styles/styles.js";
import ImageIcon from "../../assets/icon_image.png";
import { useAuth } from "../../hooks/auth.js";

const ImageAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const childData = location.state ? location.state : {};
  const { id, ...rest } = childData.passwordGroup;
  const passwordGroup = rest;
  const [attempt, setAttempt] = useState(0); // zero attempts
  const [displayMessage, setDisplayMessage] = useState(false);

  const handleClick = async (imageId) => {
    const loginStatus = await logIn(childData.tagNumber, imageId, childData);
    if (loginStatus === "success") {
      // If the password is correct navigate to the product selection page
      navigate("/product-selection");
    } else {
      // If it's the first failed attempt increase counter, else return to NFCAuth page
      if (attempt < 1) {
        setAttempt(1);
        setDisplayMessage(true);
      } else {
        navigate("/failed-auth", { state: "Failed to authenticate!" });
      }
    }
  };

  return (
    <Wrapper>
      <TextContainer>
        <Icon src={ImageIcon} alt="Icon" />
        <H3>select your image:</H3>
      </TextContainer>
      <ImageContainer>
        {Object.entries(passwordGroup).map(([key, value]) => (
          <div
            key={key}
            onClick={() => handleClick(value.id)}
            style={{ cursor: "pointer" }}
          >
            <Image key={key} src={value.url} />
          </div>
        ))}
      </ImageContainer>
      <div>
        {displayMessage ? <WrongImageText>Wrong image, try again!</WrongImageText> : <div style={{height: '4vh'}}></div>}
      </div>
    </Wrapper>
  );
};

export default ImageAuth;

const Wrapper = styled.div`
  background-color: var(--color-primary-light);
  height: 100vh;
  padding-top: 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 50px;
  margin-right: 10px;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 60px;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const Image = styled.img`
  cursor: pointer;
  max-width: 30vw;
`;

export const WrongImageText = styled.h3`
  text-align: center;
  font-family: "Roboto-Black";
  font-size: 42px;
  color: var(--color-secondary-black);
  text-transform: uppercase;
`;
