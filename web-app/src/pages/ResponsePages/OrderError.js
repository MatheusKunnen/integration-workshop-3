import React from 'react';
import styled from 'styled-components';
import { H1 } from "../../styles/styles.js";
import Icon from '../../assets/icon_warning.png';
import Button from '../../components/Button.js'

const OrderError = (props) => {
const errorMessage = props.location && props.location.state ? props.location.state : "Something went wrong!";

  return (
    <View>
      <H1>{errorMessage}</H1>
      <Image src={Icon} alt="Tag icon"/>
      <Button text={"GO BACK"} destination={"/product-selection"}/>
    </View>
  );
};

export default OrderError;

// Styles
export const View = styled.div`
  background-color: var(--color-secondary-red);
  height: 100%;
  padding: 15% 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Image = styled.img`
  margin-bottom: 40px;
`;



