import React, { useEffect, useState } from "react";
import LoginService from "../../services/LoginService";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { H3 } from "../../styles/styles.js";
import ImageIcon from "../../assets/icon_image.png";

const ImageAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const childData = location.state ? location.state : {};
  const { id, ...rest } = childData.passwordGroup;
  const correctImageId = id;
  const passwordGroup = rest;
  const [attempt, setAttempt] = useState(0); // zero attempts
  const [displayMessage, setDisplayMessage] = useState(false);

  useEffect(() => {
    console.log("ImageAuth: ", childData);
  }, []);

  const handleClick = (imageId) => {
    // If it's correct go to product selection page
    if (imageId === correctImageId) {
      // TODO: child login authentication
      navigate("/product-selection", { state: childData });
    } else {
      // If it's the first failed attempt increase counter, else return to NFCAuth
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
        {displayMessage ? <H3>Imagem errada, tente novamente!</H3> : <></>}
      </div>
    </Wrapper>
  );
};

export default ImageAuth;

const Wrapper = styled.div`
  background-color: var(--color-primary-light);
  height: 100%;
  padding: 20% 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;
