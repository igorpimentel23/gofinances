import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import { Container, Header, Title, Content } from './styles';

interface TransactionData {
  type: 'income' | 'outcome';
  name: string;
  amount: string;
  categoryKey: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Summary(): JSX.Element {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [],
  );

  async function loadData() {
    const dataKey = '@gofinance:transactions';

    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted.filter(
      (expense: TransactionData) => expense.type === 'outcome',
    );

    const totalByCategory = [] as CategoryData[];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if (expense.categoryKey === category.key) {
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total,
          color: category.color,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <Content>
        {totalByCategories &&
          totalByCategories.map(item => (
            <HistoryCard
              key={item.key}
              color={item.color}
              title={item.name}
              amount={item.total}
            />
          ))}
      </Content>
    </Container>
  );
}
