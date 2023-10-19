import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { H3, Text, Balance, BalanceText } from "../../styles/styles.js";
import ImageIcon from "../../assets/icon_full_basket.png";
import Button from "../../components/Button.js";
import { useAuth } from "../../hooks/auth.js";

const ProductSelected = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { childData } = useAuth();
  const snack = location.state ? location.state : {};

  const handleConfirm = () => {
    navigate("/order-processing", {
      state: snack,
    });
  };

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
          <Text>R${(snack.price / 100).toFixed(2)}</Text>
        </Product>
      </ProductContainer>
      <Balance>
        <BalanceText>
          credit after purchase: R$
          {(childData.credit - snack.price / 100).toFixed(2)}
        </BalanceText>
      </Balance>
      <ButtonWrapper onClick={handleConfirm}>
        <ButtonContainer>
          <ButtonText>confirm</ButtonText>
        </ButtonContainer>
      </ButtonWrapper>
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

const ButtonWrapper = styled.div`
  background-color: var(--color-secondary-black);
  border-radius: 10px;
  cursor: pointer;
  margin: 30px;
`;

const ButtonContainer = styled.div`
  background-color: var(--color-secondary-black);
  border-radius: 10px;
  padding: 24px 150px;
`;

const ButtonText = styled.p`
  text-align: center;
  font-family: "Roboto-Bold";
  font-size: 42px;
  color: var(--color-secondary-white);
  line-height: 1;
  text-transform: uppercase;
`;
