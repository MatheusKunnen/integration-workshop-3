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
  const { token } = useAuth();
  const { productState, requestProduct } = useWebsocketCommunication();
  const snack = location.state ? location.state : {};

  useEffect(() => {
    if (snack !== undefined && Object.keys(snack).length !== 0) {
      // Request product from the vending machine
      requestProduct(snack.id);
    }
  }, []);

  useEffect(() => {
    if (productState === 'success'){
      // Purchase snack
      OrderService.purchaseSnack(snack.id, token).then((res) => {
        if (Object.keys(res).length !== 0) {
          navigate("/order-finished");
        } else {
          navigate("/order-error");
        }
      });
    }
    else if (productState === 'error'){
      navigate("/order-error");
    }
  }, [productState]);

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
