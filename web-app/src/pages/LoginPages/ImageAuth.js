import React, { useEffect, useState, useCallback } from 'react';
import LoginService from '../../services/LoginService';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { H3 } from "../../styles/styles.js";
import ImageIcon from '../../assets/icon_image.png';

const imageUrls = {
  'id1': '/images/image_1.png',
  'id2': '/images/image_2.png',
  'id3': '/images/image_3.png',
  'id4': '/images/image_4.png',
  'id5': '/images/image_5.png',
  'id6': '/images/image_6.png',
};

const passwordGroupExample = {
  'ImageId1': 'id4',
  'ImageId2': 'id5',
  'ImageId3': 'id3',
  'ImageId4': 'id6',
  'ImageId5': 'id2',
  'ImageId6': 'id1',
};

const ImageAuth = (props) => {
  const childData = props.location && props.location.state ? props.location.state : {};
  const navigate = useNavigate();
  const [images, setImages] = useState(passwordGroupExample);
  const [attempt, setAttempt] = useState(0); // zero attempts
  const [displayMessage, setDisplayMessage] = useState(false);
  const [useService, setUseService] = useState(false);

  const getImages = useCallback(async () => {
    await LoginService.getPasswordGroup(childData.passwordGroupId)
      .then((res) => {
        setImages(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (useService) {
      getImages();
    }
  }, [useService]);

  const handleClick = (id) => {
    // If it's correct go to product selection page
    if (id === childData.passwordImageId) {
      navigate("/product-selection", { state: childData });
    } else {
      // If it's the first failed attempt increase counter, else return to NFCAuth
      if (attempt < 1) {
        setAttempt(1);
        setDisplayMessage(true);
      } else {
        navigate("/failed-auth",  {state: "Failed to authenticate!"});
      }
    }
  }

  return (
    <Wrapper>
      <Header>
        <Icon src={ImageIcon} alt="Icon" />
        <H3>select your image:</H3>
      </Header>
      <ImageContainer>
        {Object.entries(images).map(([key, value]) => (
          <div onClick={handleClick()} style={{cursor: 'pointer'}}>
            <Image key={key} src={imageUrls[value]} />
          </div>
        ))}
      </ImageContainer>
      <div>
        {displayMessage ? (
          <H3>Imagem errada, tente novamente!</H3>
        ) : (
          <></>
        )
        }
      </div>
    </Wrapper>
  );
};

export default ImageAuth;

const Wrapper = styled.div`
  background-color: var(--color-primary-light);
  height: 100%;
  display: block;
  padding: 20% 15%;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 50px;
  margin-right: 10px;
`;


const ImageContainer = styled.div`
  display: block;
  justify-content: center;
  column-count: 2;
  padding: 5px;
`;

const Image = styled.img`
  padding: 20px;
`;
