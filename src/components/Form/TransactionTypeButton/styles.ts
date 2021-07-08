/* eslint-disable no-nested-ternary */
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';

interface IconProps {
  type: 'income' | 'outcome';
}

interface IsActiveProps {
  activeButton: string;
  type: 'income' | 'outcome';
}

export const Container = styled.View<IsActiveProps>`
  width: 48%;

  border: ${({ theme, activeButton }) =>
    activeButton !== ''
      ? `1.5px solid transparent`
      : `1.5px solid ${theme.colors.text}`};
  border-radius: 5px;

  background-color: ${({ theme, type, activeButton }) =>
    activeButton === type
      ? type === 'income'
        ? theme.colors.success_light
        : theme.colors.attention_light
      : theme.colors.background};
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === 'income' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text<IsActiveProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, activeButton, type }) =>
    activeButton !== ''
      ? activeButton === type
        ? theme.colors.text_dark
        : theme.colors.text
      : theme.colors.text_dark};
`;
