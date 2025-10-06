import React from 'react';
import ResetIcon from '../../assets/svg/reset.svg'
import styled from 'styled-components/native';

interface SettingsButtonProps {
  onPress: Function, 
  style?: object
}

const ResetButton: React.FC<SettingsButtonProps> = ({ onPress, style = {}}) => {
  const size = 40;
  return (
    <Button onPress={() => onPress()} style={style}>
       <ResetIcon 
        width={size} 
        height={size} 
      />
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  justify-content: center;
  z-index: 10;
`

export default ResetButton;
