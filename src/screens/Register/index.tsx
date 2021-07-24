import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';

import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';

interface FormData {
  name: string;
  amount: number;
}

interface TransactionType {
  id: string;
  name: string;
  amount: number;
  type: string;
  categoryKey: string;
  date: Date;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor deve ser positivo')
    .required('O valor é obrigatório'),
});

export function Register(): JSX.Element {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [category, setCategory] = useState({
    key: 'category',
    name: 'categoria',
    icon: 'any',
  });
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const navigation = useNavigation();

  function handleTransactionTypeSelect(type: 'income' | 'outcome') {
    setTransactionType(type);
  }

  async function handleRegister(
    form: FormData,
  ): Promise<TransactionType[] | void> {
    if (!transactionType) return Alert.alert('Selecione o tipo da transação');

    if (category.key === 'category')
      return Alert.alert('Selecione a categoria');

    const newTransaction: TransactionType = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      categoryKey: category.key,
      date: new Date(),
    };

    let dataFormatted = [] as TransactionType[];

    try {
      const dataKey = '@gofinance:transactions';

      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      dataFormatted = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'categoria',
        icon: 'any',
      });

      navigation.navigate('Listagem');
    } catch (e) {
      console.log(e);
      Alert.alert('Não foi possível salvar');
    }

    return dataFormatted;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton
                title="Income"
                type="income"
                onPress={() => handleTransactionTypeSelect('income')}
                activeButton={transactionType}
              />
              <TransactionTypeButton
                title="Outcome"
                type="outcome"
                onPress={() => handleTransactionTypeSelect('outcome')}
                activeButton={transactionType}
              />
            </TransactionsTypes>
            <CategorySelectButton
              title={category.name}
              onPress={() => setCategoryModalOpen(true)}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={() => setCategoryModalOpen(false)}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
