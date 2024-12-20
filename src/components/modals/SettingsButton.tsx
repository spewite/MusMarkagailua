import React from 'react';
import SettingsIcon from '../../assets/svg/settings.svg'
import styled from 'styled-components/native';

interface SettingsButtonProps {
  onPress: Function, 
  style?: object
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onPress, style = {}}) => {
  const size = 40;
  return (
    <Button onPress={() => onPress()} style={style}>
       <SettingsIcon 
        width={size} 
        height={size} 
        fill='#e3dcdc' 
      />
    </Button>
  );
};

const Button = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  justify-content: center;
  z-index: 99;
`

export default SettingsButton;
