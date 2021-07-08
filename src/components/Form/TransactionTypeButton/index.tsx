import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Button, Icon, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  type: 'income' | 'outcome';
  activeButton: string;
}

const icons = {
  income: 'arrow-up-circle',
  outcome: 'arrow-down-circle',
};

export function TransactionTypeButton({
  title,
  type,
  activeButton,
  ...rest
}: Props): JSX.Element {
  return (
    <Container activeButton={activeButton} type={type}>
      <Button {...rest}>
        <Icon name={icons[type]} type={type} />
        <Title activeButton={activeButton} type={type}>
          {title}
        </Title>
      </Button>
    </Container>
  );
}
