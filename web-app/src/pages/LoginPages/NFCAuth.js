import React, { useEffect, useState, useCallback } from "react";
import LoginService from "../../services/LoginService";
import styled from "styled-components";
import Logo from "../../assets/logo.png";
import Icon from "../../assets/icon_tag.png";
import { useNavigate } from "react-router-dom";

const NFCAuth = () => {
  const navigate = useNavigate();
  const [tagNumber, setTagNumber] = useState("");

  const getChildData = useCallback(async (tag) => {
    await LoginService.getChildDataByTagNumber(tag)
      .then((res) => {
        console.log(res)
        if(Object.keys(res).length !== 0 && res.constructor === Object){
          navigate("/image-auth", { state: res });
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/failed-auth", { state: "Child not registered!" });
      });
  }, []);

  useEffect(() => {
    if (tagNumber !== "") {
      getChildData(tagNumber);
    }
  }, [tagNumber]);

  return (
    <View>
      <img src={Logo} alt="Logo" />
      <H1>Hello!</H1>
      <H2>Place your tag on the reader.</H2>
      <Image src={Icon} alt="Tag icon" />
      {/* Remove button for production */}
      <button
        onClick={() => {
          setTagNumber("123");
        }}
        style={{ backgroundColor: "black" }}
      >
        <H2>Use NFC tag</H2>
      </button>
      <></>
    </View>
  );
};

export default NFCAuth;

// Styles
export const View = styled.div`
  background-color: var(--color-primary-dark);
  height: 100vh;
  padding: 0vh 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
