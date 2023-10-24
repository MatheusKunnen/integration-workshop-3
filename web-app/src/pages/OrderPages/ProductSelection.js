import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { H3, Text, Balance, BalanceText } from "../../styles/styles.js";
import ImageIcon from "../../assets/icon_empty_basket.png";
import Button from "../../components/Button.js";
import OrderService from "../../services/OrderService.js";
import { useAuth } from "../../hooks/auth.js";

const ProductSelection = () => {
  const navigate = useNavigate();
  const { childData, logOut } = useAuth();
  const [childSnacks, setChildSnacks] = useState([]);
  const [credit, setCredit] = useState(0);

  const setAllowedSnacks = (snacks) => {
    const filteredSnacks = snacks.filter((snack) =>
      childData.allowedSnacks.includes(snack.id)
    );
    setChildSnacks(filteredSnacks);
  };

  const getChildSnacks = useCallback(async () => {
    await OrderService.getSnacks()
      .then((res) => {
        setAllowedSnacks(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getChildSnacks();
    setCredit(childData.credit);
  }, []);

  const handleClick = (snack) => {
    navigate("/product-selected", {
      state: snack,
    });
  };

  return (
    <Wrapper>
      <Button
        text={"Go back"}
        onClick={() => {
          logOut();
        }}
        destination={"/"}
      />
      <TextContainer>
        <Icon src={ImageIcon} alt="Icon" />
        <H3>select product:</H3>
      </TextContainer>
      <ProductContainer>
        {childSnacks.map((snack) => (
          <Product onClick={() => handleClick(snack)}>
            <Image key={snack.id} src={"images/snack_image.png"} />
            <Text>{snack.name}</Text>
            <Text>R${(snack.price / 100).toFixed(2)}</Text>
          </Product>
        ))}
      </ProductContainer>
      <Balance>
        <BalanceText>credit available: R${credit.toFixed(2)}</BalanceText>
      </Balance>
    </Wrapper>
  );
};

export default ProductSelection;

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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Product = styled.div`
  cursor: pointer;
`;

const Image = styled.img`
  //padding: 20px;
`;