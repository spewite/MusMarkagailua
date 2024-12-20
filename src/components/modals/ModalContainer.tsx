import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import styled from "styled-components/native";
import { ReactNode } from 'react';
const woodTexture = require('../../assets/textures/wood.jpg');

interface ModalContainerProps {
  children: ReactNode,
  modalVisible: boolean
}

const ModalContainer: React.FC<ModalContainerProps> = ({ children, modalVisible }) => {
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
    <AnimatedModalBackground style={{ opacity }}>
      <AnimatedModalView
        style={{
          transform: [
            { translateX: slideAnim },
            { rotate: '90deg' },
          ],
        }}
      >
        <ModalBackgroundImage source={woodTexture} resizeMode="repeat">
          {children}
        </ModalBackgroundImage>
      </AnimatedModalView>
    </AnimatedModalBackground>
  );
};

const ModalBackgroundImage = styled.ImageBackground`
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const AnimatedModalBackground = Animated.createAnimatedComponent(styled.View`
  width: 100%;
  height: 100%;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`);

// Eliminamos la transformación de rotación aquí
const AnimatedModalView = Animated.createAnimatedComponent(styled.View`
  width: 40%;
  background: #666666;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  gap: 5px;
`);

export default ModalContainer;
