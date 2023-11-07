import React, { useEffect } from "react";
import styled from "styled-components";
import { H1 } from "../../styles/styles.js";
import Icon from "../../assets/icon_success.png";
import Button from "../../components/Button.js";
import { useAuth } from "../../hooks/auth.js";
import { useNavigate } from "react-router-dom";

const OrderFinished = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

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
      <H1>Purchase successful!</H1>
      <Image src={Icon} alt="Tag icon" />
      <Button text={"purchase again"} destination={"/product-selection"} />
      <Button
        text={"exit"}
        onClick={() => {
          logOut();
        }}
        destination={"/"}
      />
    </View>
  );
};

export default OrderFinished;

// Styles
export const View = styled.div`
  background-color: var(--color-secondary-green);
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
