import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';

import theme from '../../global/styles/theme';
import {
  Container,
  Header,
  HighlightCards,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  Transactions,
  Title,
  TransactionsList,
  LoadContainer,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightCardItemProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightCardData {
  entries: HighlightCardItemProps;
  expenses: HighlightCardItemProps;
  balance: HighlightCardItemProps;
}

export function Dashboard(): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>();
  const [highlightCardData, setHighlightCardData] = useState<HighlightCardData>(
    {} as HighlightCardData,
  );

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'income' | 'outcome',
  ): string {
    const lastTransaction = new Date(
      Math.max(
        ...collection
          .filter(transaction => transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime()),
      ),
    );

    return `${lastTransaction.toLocaleDateString('pt-BR', {
      day: '2-digit',
    })} de ${lastTransaction.toLocaleDateString('pt-BR', {
      month: 'long',
    })}`;
  }

  function getDateInterval(collection: DataListProps[]): {
    first: string;
    last: string;
    month: string;
  } {
    const lastTransaction = new Date(
      Math.max(
        ...collection.map(transaction => new Date(transaction.date).getTime()),
      ),
    );

    const firstTransaction = new Date(
      Math.min(
        ...collection.map(transaction => new Date(transaction.date).getTime()),
      ),
    );

    return {
      first: firstTransaction.toLocaleDateString('pt-BR', {
        day: '2-digit',
      }),

      last: lastTransaction.toLocaleDateString('pt-BR', {
        day: '2-digit',
      }),

      month: lastTransaction.toLocaleDateString('pt-BR', {
        month: 'long',
      }),
    };
  }

  async function loadTransactions() {
    const dataKey = '@gofinance:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesSum = 0;
    let expensesSum = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (transaction: DataListProps) => {
        if (transaction.type === 'income') {
          entriesSum += Number(transaction.amount);
        } else {
          expensesSum += Number(transaction.amount);
        }

        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date));

        return {
          ...transaction,
          amount,
          date,
        };
      },
    );

    const balance = entriesSum - expensesSum;

    const lastEntryTransaction = getLastTransactionDate(transactions, 'income');
    const lastExpenseTransaction = getLastTransactionDate(
      transactions,
      'outcome',
    );
    const dateInterval = getDateInterval(transactions);

    setData(transactionsFormatted);
    setHighlightCardData({
      expenses: {
        amount: expensesSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastEntryTransaction,
      },
      entries: {
        amount: entriesSum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: lastExpenseTransaction,
      },
      balance: {
        amount: balance.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `${dateInterval.first} à ${dateInterval.last} de ${dateInterval.month}`,
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []),
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: 'https://avatars.githubusercontent.com/u/72712137?v=4',
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Igor</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={() => true}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightCardData?.entries?.amount}
              lastTransaction={`Última entrada dia ${highlightCardData?.entries?.lastTransaction}`}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightCardData?.expenses?.amount}
              lastTransaction={`Última saída dia ${highlightCardData?.expenses?.lastTransaction}`}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightCardData?.balance?.amount}
              lastTransaction={highlightCardData?.balance?.lastTransaction}
              type="total"
            />
          </HighlightCards>
          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
