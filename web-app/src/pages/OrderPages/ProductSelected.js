import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { H3, Text, Balance, BalanceText } from "../../styles/styles.js";
import ImageIcon from "../../assets/icon_full_basket.png";
import Button from "../../components/Button.js";

const ProductSelected = () => {
  const location = useLocation();
  const { childData, snack } = location.state ? location.state : {};

  // TODO: fix go back button
  return (
    <Wrapper>
      <Button
        text={"Go back"}
        destination={{ pathname: "/product-selection", state: childData }}
      />
      <TextContainer>
        <Icon src={ImageIcon} alt="Icon" />
        <H3>selected product:</H3>
      </TextContainer>
      <ProductContainer>
        <Product>
          <Image key={snack.id} src={"images/snack_image.png"} />
          <Text>{snack.name}</Text>
          <Text>R${(snack.price / 100).toFixed(2)}</Text>
        </Product>
      </ProductContainer>
      <Balance>
        <BalanceText>
          credit after purchase: R$
          {(childData.credit - snack.price / 100).toFixed(2)}
        </BalanceText>
      </Balance>
      <Button
        text={"confirm"}
        destination={{ pathname: "/order-processing", state: snack }}
      />
    </Wrapper>
  );
};

export default ProductSelected;

const Wrapper = styled.div`
  background-color: var(--color-primary-light);
  height: 100%;
  padding: 15% 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 50px;
  margin-right: 10px;
`;

const ProductContainer = styled.div`
  display: block;
  justify-content: center;
  padding: 5px;
`;

const Product = styled.div``;

const Image = styled.img`
  padding: 20px;
`;
