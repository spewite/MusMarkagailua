import styled from "styled-components/native";

interface ModalButtonProps {
  onPress: Function, 
  title: string,
  active?: boolean
}

const ModalButton: React.FC<ModalButtonProps> = ({ onPress, title, active = false }) => {
  const VascanTexts = ['ITXI'];
  const fontFamily = VascanTexts.includes(title) ? 'Vascan' : 'Kaxko';

  return (
    <Button onPress={() => onPress()} active={active}>
      <ButtonText style={{ fontFamily }}>{title}</ButtonText>
    </Button>
  );
};

// ----- STYLED COMPONENTS ----- //

const Button = styled.TouchableOpacity<{active: boolean}>`
  border: 1px solid black;
  padding: 10px 15px;
  background: ${props => props.active ? 'rgba(46, 29, 0, .65)' : 'rgba(0, 0, 0, .2)'};
  margin: 5px 20px;
  border-radius: 3px;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: black;
`;

export default ModalButton;