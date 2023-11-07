import React, { useEffect } from "react";
import styled from "styled-components";
import { H1 } from "../../styles/styles.js";
import Icon from "../../assets/icon_warning.png";
import Button from "../../components/Button.js";
import { useNavigate } from "react-router-dom";

const OrderError = (props) => {
  const navigate = useNavigate();
  const errorMessage =
    props.location && props.location.state
      ? props.location.state
      : "Something went wrong!";

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
      <Button text={"GO BACK"} destination={"/product-selection"} />
    </View>
  );
};

export default OrderError;

// Styles
export const View = styled.div`
  background-color: var(--color-secondary-red);
  height: 100vh;
  padding: 0vh 10vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  margin: 40px;
`;
