import styled from 'styled-components';

export const H1 = styled.h1`
  text-align: center;
  font-family: 'Roboto-Black';
  font-size: 96px;
  color: var(--color-secondary-black);

  @media screen and (max-width: 1150px) {
    margin-right: auto;
  }
`;

export const H2 = styled.h2`
  text-align: center;
  font-family: 'Roboto-Black';
  font-size: 64px;
  color: var(--color-secondary-black);

  @media screen and (max-width: 1150px) {
    margin-right: auto;
  }
`;

export const H3 = styled.h3`
  text-align: center;
  font-family: 'Roboto-Black';
  font-size: 48px;
  color: var(--color-secondary-black);
  
  text-transform: uppercase;

  @media screen and (max-width: 1150px) {
    margin-right: auto;
  }
`;