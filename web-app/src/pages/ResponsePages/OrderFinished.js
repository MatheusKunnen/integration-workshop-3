import React from "react";
import styled from "styled-components";
import { H1 } from "../../styles/styles.js";
import Icon from "../../assets/icon_success.png";
import Button from "../../components/Button.js";

const OrderFinished = (props) => {
  const errorMessage =
    props.location && props.location.state
      ? props.location.state
      : "Failed to authenticate!";

  return (
    <View>
      <H1>Purchase successful!</H1>
      <Image src={Icon} alt="Tag icon" />
      <Button text={"purchase again"} destination={"/product-selection"} />
      <Button text={"exit"} destination={"/"} />
    </View>
  );
};

export default OrderFinished;

// Styles
export const View = styled.div`
  background-color: var(--color-secondary-green);
  height: 100%;
  padding: 15% 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  margin: 40px;
`;
