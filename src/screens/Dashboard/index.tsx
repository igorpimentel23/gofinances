import React from 'react';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';

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
  Icon,
  Transactions,
  Title,
  TransactionsList,
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

const data = [
  {
    id: '1',
    type: 'positive',
    title: 'Desenvolvimento de site',
    amount: 'R$ 12.000,00',
    category: { name: 'Vendas', icon: 'dollar-sign' },
    date: '13/04/2021',
  },
  {
    id: '2',
    type: 'negative',
    title: 'Desenvolvimento de site',
    amount: 'R$ 12.000,00',
    category: { name: 'Vendas', icon: 'dollar-sign' },
    date: '13/04/2021',
  },
  {
    id: '3',
    type: 'positive',
    title: 'Desenvolvimento de site',
    amount: 'R$ 12.000,00',
    category: { name: 'Vendas', icon: 'dollar-sign' },
    date: '13/04/2021',
  },
  {
    id: '4',
    type: 'negative',
    title: 'Desenvolvimento de site',
    amount: 'R$ 12.000,00',
    category: { name: 'Vendas', icon: 'dollar-sign' },
    date: '13/04/2021',
  },
] as DataListProps[];

export function Dashboard(): JSX.Element {
  return (
    <Container>
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

          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 14 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 17.400,00"
          lastTransaction="Última saída dia 14 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 17.400,00"
          lastTransaction="01 à 16 de abril"
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
    </Container>
  );
}
