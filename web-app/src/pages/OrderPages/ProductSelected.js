import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { H3, Text, Balance, BalanceText } from "../../styles/styles.js";
import ImageIcon from "../../assets/icon_full_basket.png";
import Button from "../../components/Button.js";

const fakeSnack = {
  id: 1,
  name: "Snickers",
  imageid: 1,
  ingredients: "",
  price: 4.0,
  stock: 2,
};

const fakeBalance = 30.0;

const ProductSelected = () => {
  const location = useLocation();
  const snack = location && location.state ? location.state : fakeSnack;

  return (
    <Wrapper>
      <Button text={"Go back"} destination={"/product-selection"} />
      <TextContainer>
        <Icon src={ImageIcon} alt="Icon" />
        <H3>selected product:</H3>
      </TextContainer>
      <ProductContainer>
        <Product>
          <Image key={snack.id} src={"images/snack_image.png"} />
          <Text>{snack.name}</Text>
          <Text>R${snack.price.toFixed(2)}</Text>
        </Product>
      </ProductContainer>
      <Balance>
        <BalanceText>
          credit after purchase: R${(fakeBalance - snack.price).toFixed(2)}
        </BalanceText>
      </Balance>
      <Button text={"confirm"} destination={"/"} />
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

const Product = styled.div`
`;

const Image = styled.img`
  padding: 20px;
`;

