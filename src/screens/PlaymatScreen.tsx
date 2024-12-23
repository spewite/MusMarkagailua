import React, { useEffect, useState } from "react";
import { StatusBar, Dimensions } from "react-native";
import styled from 'styled-components/native';
import Immersive from 'react-native-immersive';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadSavedScores, firstOpen } from "../utils/utils";

// Components
import Clock from "../components/Clock";
import Modals from "../components/playmat/Modals";
import TutorialModal from "../components/tutorial/TutorialModal";
import Quarter from "../components/playmat/Quarter";
import { CenteredView } from "../components/CenteredView";
import InfoButton from "../components/buttons/InfoButton";

// Images
const playmatImage = require('../assets/textures/playmat.png');
const chickpeaksMiddle = require('../assets/chickpeas/chickpeaks_middle.png')

// -------------------------------------------------------- //

const { width, height } = Dimensions.get('window');

export default function PlaymatScreen() {

  const [loaded, setLoaded] = useState<boolean>(false);
  const [maxScore, setMaxScore] = useState<number>(20);  
  const [score, setScore] = useState<[number, number]>([0,0]); // First index: 0,3. Second index: 1,2
  const [gameScore, setGameScore] = useState<[number, number]>([0,0]); // First index: Team 1, Second index: Team 2 
  
  // Modals
  const [settingsModalVisible, setSettingsModalVisible] = useState<boolean>(false);
  const [resetModalVisible, setResetModalVisible] = useState<boolean>(false);
  const [tutorialModalVisible, setTutorialModalVisible] = useState<boolean>(false);

  useEffect(() => {

    // Function that executes when it is the first time that the user enters the app.
    (async () => {
      await firstOpen(setTutorialModalVisible);
      await AsyncStorage.setItem("firstTime", JSON.stringify({firstTime: true}));
    })();

    // When the player enters the app load the score saved in async storage.
    (async () => {
      await loadSavedScores(setMaxScore, setScore, setGameScore, setLoaded);
    })();

    // Enable immersive mode
    Immersive.on();

    // Cleanup: Disable immersive mode when the component unmounts
    return () => {
      Immersive.off();
    };
  }, []);


  useEffect(() => {

    if (!loaded) return;
    (async () => {
      try {
        const maxScoreJSON = { maxScore };
        await AsyncStorage.setItem("maxScore", JSON.stringify(maxScoreJSON));
        console.log("Max Score saved: ", maxScoreJSON.maxScore);
      } catch (error) {
        console.error("Error saving the max score:", error);
      }
    })();

    const [scoreA, scoreB] = score;
    const newScore: [number, number] = [
      scoreA>maxScore ? maxScore : scoreA,
      scoreB>maxScore ? maxScore : scoreB, 
    ]
    setScore(newScore);

  }, [maxScore]);
  
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        const scoreJSON = { score };
        await AsyncStorage.setItem("score", JSON.stringify(scoreJSON));
        console.log("Score saved: ", scoreJSON.score);
      } catch (error) {
        console.error("Error saving the score:", error);
      }
    })();
  }, [score, loaded]);

  useEffect(() => {
    if (!loaded) return; 
    (async () => {
      try {
        const gameScoreJSON = { gameScore };
        await AsyncStorage.setItem("gameScore", JSON.stringify(gameScoreJSON));
        console.log("Game Score saved: ", gameScoreJSON.gameScore);
      } catch (error) {
        console.error("Error saving the game score:", error);
      }
    })();
  }, [gameScore, loaded]);


  // ---------------------- //
  // -----   RENDER   ----- //
  // ---------------------- //

  return (
    <>
      <StatusBar hidden={true} />

      <TutorialModal 
        modalVisible={tutorialModalVisible}
        setModalVisible={setTutorialModalVisible}
      />

      <Modals 
        settingsModalVisible={settingsModalVisible}
        setSettingsModalVisible={setSettingsModalVisible}
        maxScore={maxScore}
        setMaxScore={setMaxScore}
        resetModalVisible={resetModalVisible}
        setResetModalVisible={setResetModalVisible}
        setScore={setScore}
        setGameScore={setGameScore}
      />

      <Clock />

      <InfoButton 
        onPress={() => {setTutorialModalVisible(true)}}
        style={{
          position: 'absolute',
          right: 20,
          top: height/2,
          transform: [{rotate: '90deg'}],
          
        }}
      />

      <CenteredView>
        <ChickpeaksMiddle source={chickpeaksMiddle} />
      </CenteredView>
    
      <MainView source={playmatImage}>

        {[...Array(4)].map((element, index) => {
          return <Quarter 
                    key={index}
                    index={index}
                    score={score}
                    setScore={setScore}
                    gameScore={gameScore}
                    setGameScore={setGameScore}
                    maxScore={maxScore}
                  />;
        })}

      </MainView>

    </>
  );
};

// ---------------------- //
// -----   STYLES   ----- //
// ---------------------- // 

const MainView = styled.ImageBackground`
  width: 100%;
  height: 100%;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ChickpeaksMiddle = styled.Image`
  width: 200px;
  height: 200px;
  resize-mode:contain;
  z-index:2;
`