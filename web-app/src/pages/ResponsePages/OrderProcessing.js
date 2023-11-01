import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { H1 } from "../../styles/styles.js";
import Icon from "../../assets/icon_loading.png";
import OrderService from "../../services/OrderService.js";
import { useAuth } from "../../hooks/auth.js";
import { useWebsocketCommunication } from "../../hooks/websocket.js";

const OrderProcessing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { requestProduct, productState } = useWebsocketCommunication();
  const { token } = useAuth();

  useEffect(() => {
    const snack = location.state ? location.state : {};
    if (snack !== undefined && Object.keys(snack).length !== 0) {
      OrderService.purchaseSnack(snack.id, token).then((res) => {
        if (Object.keys(res).length !== 0) {
          requestProduct(snack.id);
        } else {
          navigate("/order-error");
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (productState === "success") {
      navigate("/order-finished");
    } else if (productState === "error") {
      navigate("/order-error");
    }
  }, [navigate, productState]);

  return (
    <View>
      <H1>Processing order...</H1>
      <Image src={Icon} alt="Tag icon" />
      <H1>Wait a moment!</H1>
    </View>
  );
};

export default OrderProcessing;

// Styles
export const View = styled.div`
  background-color: var(--color-secondary-yellow);
  height: 100vh;
  padding: 0vh 20vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.img`
  margin: 40px;
`;
