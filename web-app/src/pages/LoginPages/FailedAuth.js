import React, { useEffect } from "react";
import styled from "styled-components";
import { H1 } from "../../styles/styles.js";
import Icon from "../../assets/icon_warning.png";
import Button from "../../components/Button.js";
import { useNavigate, useLocation } from "react-router-dom";

const FailedAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage =
    location && location.state ? location.state : "Failed to authenticate!";

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 20000); // 20 seconds

    // Clear the timeout if the component is unmounted or the user navigates away
    return () => {
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <View>
      <H1>{errorMessage}</H1>
      <Image src={Icon} alt="Tag icon" />
      <Button text={"GO BACK"} destination={"/"} />
    </View>
  );
};

export default FailedAuth;

// Styles
export const View = styled.div`
  background-color: var(--color-secondary-red);
  height: 100vh;
  padding-horizontal: 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  margin-bottom: 40px;
`;
