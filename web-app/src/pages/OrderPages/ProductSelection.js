import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { H3, Text, Balance, BalanceText } from "../../styles/styles.js";
import ImageIcon from '../../assets/icon_empty_basket.png';
import Button from '../../components/Button.js'

const snacks = [
    {
        'id': 1,
        'name': 'Snickers',
        'imageid': 1,
        'ingredients': '',
        'price': 4.00,
        'stock': 2,
    },
    {
        'id': 2,
        'name': 'Snickers',
        'imageid': 2,
        'ingredients': '',
        'price': 5.99,
        'stock': 10,
    },
    {
        'id': 3,
        'name': 'Snickers',
        'imageid': 3,
        'ingredients': '',
        'price': 18.00,
        'stock': 4,
    },
]

const fakeBalance = 30.00

const ProductSelection = (props) => {
    
    const navigate = useNavigate();

    const handleClick = (snack) => {
        console.log(snack)
        navigate("/product-selected", {state: snack});
    }

    return (
        <Wrapper>
            <Button text={"Go back"} destination={"/"} />
            <TextContainer>
                <Icon src={ImageIcon} alt="Icon" />
                <H3>select product:</H3>
            </TextContainer>
            <ProductContainer>
                {snacks.map(snack => (
                    <Product onClick={() => handleClick(snack)}>
                        <Image key={snack.id} src={"images/snack_image.png"} />
                        <Text>{snack.name}</Text>
                        <Text>R${snack.price.toFixed(2)}</Text>
                    </Product>
                ))}
            </ProductContainer>
            <Balance>
                <BalanceText>
                    credit available: R${fakeBalance.toFixed(2)}
                </BalanceText>
            </Balance>
        </Wrapper >
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
  grid-gap: 10px;
  justify-content: center;
`;

const Product = styled.div`
    cursor: pointer;
    margin: 20px;
`;

const Image = styled.img`
  padding: 20px;
`;
