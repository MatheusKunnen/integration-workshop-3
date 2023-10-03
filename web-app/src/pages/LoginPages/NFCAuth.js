import React, { useEffect, useState, useCallback } from 'react';
import LoginService from '../../services/LoginService';
import styled from 'styled-components';
import Logo from '../../assets/logo.png';
import Icon from '../../assets/icon_tag.png';
import Button from '../../components/Button';
import { useNavigate } from "react-router-dom";

const NFCAuth = () => {
  const navigate = useNavigate();
  const [tagNumber, setTagNumber] = useState("");
  const [childData, setChildData] = useState({});

  const getChildData = useCallback(async () => {
    await LoginService.getChildDataByTagNumber(tagNumber)
    .then((res) => {
        setChildData(res);
        navigate("/image-auth", {state: childData});
    })
    .catch((err) => {
        console.log(err);
        navigate("/failed-auth",  {state: "Child not registered!"});
    });
  }, []);

  useEffect(() => {
    if(tagNumber !== "") {
      getChildData();
    }
  }, [tagNumber]);

  return (
    <View>
      <img src={Logo} alt="Logo"/>
      <H1>Hello!</H1>
      <H2>Place your tag on the reader.</H2>
      <img src={Icon} alt="Tag icon"/>
      {/* Temporary buttons to navigate through the pages without using the services*/}
      <Button text={"Image Screen"} destination={"image-auth"} />
      <Button text={"Failed Screen"} destination={"failed-auth"} />
    </View>
  );
};

export default NFCAuth;

// Styles
export const View = styled.div`
  background-color: var(--color-primary-dark);
  height: 100%;
  padding: 15% 15%;
  display: block;
  align-items: center;
`;

export const H1 = styled.p`
  text-align: center;
  font-family: 'Roboto-Black';
  font-size: 96px;
  color: var(--color-primary-light);
`;

export const H2 = styled.p`
  text-align: center;
  font-family: 'Roboto-Black';
  font-size: 64px;
  color: var(--color-primary-light);
`;
