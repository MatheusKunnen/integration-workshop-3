import React from "react";
import styled from "styled-components";
import { H1 } from "../../styles/styles.js";
import Icon from "../../assets/icon_loading.png";

const OrderProcessing = (props) => {
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
  height: 100%;
  padding: 35% 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  margin: 40px;
`;
