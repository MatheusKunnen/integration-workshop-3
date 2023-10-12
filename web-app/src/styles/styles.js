import styled from 'styled-components';

export const H1 = styled.h1`
  text-align: center;
  font-family: 'Roboto-Black';
  font-size: 96px;
  color: var(--color-secondary-black);
`;

export const H2 = styled.h2`
  text-align: center;
  font-family: 'Roboto-Black';
  font-size: 64px;
  color: var(--color-secondary-black);
`;

export const H3 = styled.h3`
  text-align: center;
  font-family: 'Roboto-Black';
  font-size: 48px;
  color: var(--color-secondary-black);
  text-transform: uppercase;
`;

export const Text = styled.p`
  text-align: center;
  font-family: 'Roboto-Bold';
  font-size: 40px;
  color: var(--color-secondary-black);
  text-transform: uppercase;
  line-height: 0.3;
  margin-top: 0px;
`;

export const Balance = styled.div`
  background-color: var(--color-primary-light);
  border: 5px solid var(--color-primary-dark);
  border-radius: 10px;
  margin: 30px;
  padding: 10px 50px;
`;

export const BalanceText = styled.p`
  text-align: center;
  font-family: 'Roboto-Bold';
  font-size: 42px;
  color: var(--color-primary-dark);
  text-transform: uppercase;
`;