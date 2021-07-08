import React from 'react';

import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  CategoryList,
  Category,
  Icon,
  Name,
  Separator,
  Footer,
} from './styles';

export interface CategoryProps {
  key: string;
  name: string;
  icon: string;
}

interface Props {
  category: CategoryProps;
  setCategory: (category: CategoryProps) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props): JSX.Element {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <CategoryList
        data={categories}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => setCategory(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
