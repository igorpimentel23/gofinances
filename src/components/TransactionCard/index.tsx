import React from 'react';

import { categories } from '../../utils/categories';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

export interface TransactionCardProps {
  type: 'income' | 'outcome';
  name: string;
  amount: string;
  categoryKey: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props): JSX.Element {
  const { type, name, amount, categoryKey, date } = data;
  const [category] = categories.filter(c => c.key === categoryKey);

  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === 'outcome' && '- '}
        {amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category?.icon} />
          <CategoryName>{category?.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
