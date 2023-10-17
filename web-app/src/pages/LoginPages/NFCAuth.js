import React, { useEffect, useState, useCallback } from "react";
import LoginService from "../../services/LoginService";
import styled from "styled-components";
import Logo from "../../assets/logo.png";
import Icon from "../../assets/icon_tag.png";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const NFCAuth = () => {
  const navigate = useNavigate();
  const [tagNumber, setTagNumber] = useState("");

  const getChildData = useCallback(async (tag) => {
    await LoginService.getChildDataByTagNumber(tag)
      .then((res) => {
        console.log(res);
        navigate("/image-auth", { state: res });
      })
      .catch((err) => {
        console.log(err);
        navigate("/failed-auth", { state: "Child not registered!" });
      });
  }, []);

  useEffect(() => {
    const tag = "123";
    setTagNumber(tag);
    console.log(tag);
    if (tag !== "") {
      getChildData(tag);
    }
  }, [tagNumber]);

  return (
    <View>
      <img src={Logo} alt="Logo" />
      <H1>Hello!</H1>
      <H2>Place your tag on the reader.</H2>
      <Image src={Icon} alt="Tag icon" />
      {/* Temporary buttons to navigate through the pages without using the services*/}
      <H2>Navigate through pages:</H2>
      <Button text={"Image Screen"} destination={"image-auth"} />
      <Button text={"Failed Screen"} destination={"failed-auth"} />
      <Button text={"Selection Screen"} destination={"product-selection"} />
      <Button text={"Selected Screen"} destination={"product-selected"} />
      <Button text={"Order processing"} destination={"order-processing"} />
      <Button text={"Order finished"} destination={"order-finished"} />
      <Button text={"Order error"} destination={"order-error"} />
    </View>
  );
};

export default NFCAuth;

// Styles
export const View = styled.div`
  background-color: var(--color-primary-dark);
  height: 100%;
  padding: 15% 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const H1 = styled.p`
  text-align: center;
  font-family: "Roboto-Black";
  font-size: 96px;
  color: var(--color-primary-light);
`;

export const H2 = styled.p`
  text-align: center;
  font-family: "Roboto-Black";
  font-size: 64px;
  color: var(--color-primary-light);
`;

export const Image = styled.img`
  align-self: center;
  margin-top: 40px;
  margin-bottom: 50px;
`;
