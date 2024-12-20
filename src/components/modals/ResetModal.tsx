import styled from "styled-components/native";
import ModalContainer from './ModalContainer';
import ModalButton from "./ModalButton";

interface ResetModalProps {
  modalVisible: boolean
  setModalVisible: Function,
  setScore: Function,
  setGameScore: Function
}

const ResetModal: React.FC<ResetModalProps> = ({ modalVisible, setModalVisible, setScore, setGameScore }) => {

  return (
    <ModalContainer modalVisible={modalVisible}>
      <ModalText fontSize={26}>BERREZARRI</ModalText>
        <ModalText fontSize={20}>Berrezarri tantoak</ModalText>
        <Row>
          <ModalButton 
            onPress={() => { setScore([0, 0]) }}
            title={'TANTOAK'}
          />
          <ModalButton 
            onPress={() => { setGameScore([0, 0]) }}
            title={'USTELAK'}
          />
        </Row>
        <ModalButton 
          onPress={() => { setModalVisible(false) }}
          title={'ITXI'}
        />
    </ModalContainer>
  );
};

// ----- STYLED COMPONENTS ----- //

const Row = styled.View`
  flex-direction: row;
`;

const ModalText = styled.Text<{fontSize: number}>`
  font-size: ${props => props.fontSize}px;
  font-family: Kaxko;
  text-align: center;
  margin-top: 10px;
`;

export default ResetModal;
