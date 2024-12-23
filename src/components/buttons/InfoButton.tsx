import React from 'react';
import InfoIcon from '../../assets/svg/info.svg'
import styled from 'styled-components/native';

interface SettingsButtonProps {
  onPress: Function, 
  style?: object
}

const InfoButton: React.FC<SettingsButtonProps> = ({ onPress, style = {}}) => {
  const size = 35;
  return (
    <Button onPress={() => onPress()} style={style}>
       <InfoIcon 
        width={size} 
        height={size} 
        style={{ 
          color: '#e3dcdc', 
          stroke: 'black', 
          strokeWidth: 2
        }} 
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

export default InfoButton;
