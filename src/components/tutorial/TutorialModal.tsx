import React from 'react';
import {
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { CenteredView } from '../CenteredView';
import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import TutorialSlider from './TutorialSlider';

const { width, height } = Dimensions.get('window');
const woodTexture = require('../../assets/textures/wood.jpg');

interface TutorialModalProps {
  modalVisible: boolean,
  setModalVisible: Function
}

const TutorialModal: React.FC<TutorialModalProps> = ({modalVisible, setModalVisible}) => {

  const opacity = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    if (modalVisible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [modalVisible]);

  if (!modalVisible) return null;

  return (

    <CenteredView>
      <AnimatedModalBackground style={{ opacity }}>
        <AnimatedModalView
          style={{
            transform: [
              { translateX: slideAnim },
            ],
          }}
        >
          <ModalBackgroundImage source={woodTexture} resizeMode="repeat">

            <ModalTitle>LAGUNTZA</ModalTitle>

            <CloseButtonContainer onPress={() => setModalVisible(false)}>
              <CloseButton>X</CloseButton>
            </CloseButtonContainer>
            
            <TutorialSlider />

          </ModalBackgroundImage>
        </AnimatedModalView>
      </AnimatedModalBackground>
    </CenteredView>
  )
}

const ModalTitle = styled.Text`
  margin-top:20px;  
  font-family: Vascan;
  font-size: 32px;
`

const CloseButtonContainer = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 8px;
  position: absolute;
  right: 20px;
  top: 15px;
  text-align:center;
  vertical-align: middle;
  background: rgba(0,0,0,.3);
  border: 1px solid black;

`

const CloseButton = styled.Text`
  border-radius: 5px;
  font-family: Vascan;
  text-align:center;
  vertical-align: middle;
  font-size:25px;
`

const AnimatedModalBackground = Animated.createAnimatedComponent(styled.View`
  width: 100%;
  height: 100%;
  z-index: 20;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`);

// Eliminamos la transformación de rotación aquí
const AnimatedModalView = Animated.createAnimatedComponent(styled.View`
  width: ${width*(2.5/3)}px;
  height: ${height*(2.5/3)}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  gap: 5px;
`);

const ModalBackgroundImage = styled.ImageBackground`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 20px;
`;

export default TutorialModal