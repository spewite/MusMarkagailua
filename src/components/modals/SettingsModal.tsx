import styled from "styled-components/native";
import ModalContainer from './ModalContainer';
import ModalButton from "./ModalButton";

interface SettingsModalProps {
  modalVisible: boolean
  setModalVisible: Function,
  maxScore: number,
  setMaxScore: Function
}

const SettingsModal: React.FC<SettingsModalProps> = ({ modalVisible, setModalVisible, maxScore, setMaxScore }) => {

  return (
    <ModalContainer modalVisible={modalVisible}>
      <ModalText fontSize={26}>EZARPENAK</ModalText>
      <ModalText fontSize={20}>Joko-tantoak</ModalText>

      <Row>
        <ModalButton 
          onPress={() => { console.log("CLICKED"); setMaxScore(20); }}
          title={'20'}
          active={maxScore === 20}
        />
        <ModalButton 
          onPress={() => { setMaxScore(30); }}
          title={'30'}
          active={maxScore === 30}
        />
        <ModalButton 
          onPress={() => { setMaxScore(40); }}
          title={'40'}
          active={maxScore === 40}
        />
      </Row>
      
      <ModalButton 
        onPress={() => { setModalVisible(false); }}
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

export default SettingsModal;
