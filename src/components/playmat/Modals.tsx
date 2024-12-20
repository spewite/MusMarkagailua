
import { CenteredView } from "../CenteredView";
import ConfigurationButton from "../modals/SettingsButton";
import ResetButton from "../modals/ResetButton";
import SettingsModal from "../modals/SettingsModal";
import ResetModal from "../modals/ResetModal";

interface ModalsProps {
  settingsModalVisible: boolean,
  setSettingsModalVisible: Function,
  maxScore: number,
  setMaxScore: Function,
  resetModalVisible: boolean,
  setResetModalVisible: Function,
  setScore: Function,
  setGameScore: Function
}

const Modals: React.FC<ModalsProps> = ({
  settingsModalVisible,
  setSettingsModalVisible, 
  maxScore, 
  setMaxScore, 
  resetModalVisible, 
  setResetModalVisible, 
  setScore, 
  setGameScore
}) => {

  return (
    <>
      <CenteredView>
        <SettingsModal 
          modalVisible={settingsModalVisible}
          setModalVisible={setSettingsModalVisible}
          maxScore={maxScore}
          setMaxScore={setMaxScore}
        />
        <ResetModal
          modalVisible={resetModalVisible}
          setModalVisible={setResetModalVisible}
          setScore={setScore}
          setGameScore={setGameScore}
        />
      </CenteredView>

      <CenteredView>
        <ConfigurationButton 
          onPress={() => {setSettingsModalVisible(true)}}
        />
        <ResetButton 
          onPress={() => {setResetModalVisible(true)}}
        />
      </CenteredView>
    </>
  );

}

export default Modals;



