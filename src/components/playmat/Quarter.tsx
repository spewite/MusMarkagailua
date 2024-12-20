
import { StyleSheet } from "react-native";
import { PanResponderGestureState } from "react-native";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-detect";
import { quarterPointValue, isSinglePointQuarter, getTeamIndex } from "../../utils/utils";
import { pointTypes } from "../../constants/constants";
import styled from "styled-components/native";
import ChickpeaImage from "./ChickpeaImage";

const silverChickpea = require('../../assets/chickpeas/silver_chickpea.png');

const gestureConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

// -------------------------------------------------------- //

interface QuarterProps {
  index: number,
  score: [number, number],
  setScore: Function,
  gameScore: [number, number],
  setGameScore: Function,
  maxScore: number,
}

const Quarter:React.FC<QuarterProps> = ({index, score, setScore, gameScore, setGameScore, maxScore})  => {

  const teamIndex = getTeamIndex(index);
  const pointValue = quarterPointValue(index);

  // ----------------------- //
  // -----   UTILITY   ----- //
  // ----------------------- //

  const increaseScore = () => {
    let newTeamScore = score[teamIndex]+pointValue;
    if (newTeamScore>=maxScore) {newTeamScore = maxScore}
    let newScore = [...score];
    newScore[teamIndex] = newTeamScore;
    setScore(newScore);
  }

  const decreaseScore = () => {
    let newTeamScore = score[teamIndex]-pointValue;
    if (newTeamScore<=0) {newTeamScore = 0}
    let newScore = [...score];
    newScore[teamIndex] = newTeamScore;
    setScore(newScore);
  };

  const increaseGamePoint = (reset = true) => {
    let newGameScore = [...gameScore];
    newGameScore[teamIndex] = newGameScore[teamIndex]+1;
    setGameScore(newGameScore);
    if (reset) {
      setScore([0,0]);
    }
  }

  const decreaseGamePoint = (reset = true) => {
    let newTeamScore = gameScore[teamIndex]-1;
    if (newTeamScore<=0) {newTeamScore = 0}
    let newScore = [...gameScore];
    newScore[teamIndex] = newTeamScore;
    setGameScore(newScore);
    if (reset) {
      setScore([0,0]);
    }
  }

  // ----------------------- //
  // -----   GESTURE   ----- //
  // ----------------------- //

  const onTap = (pointType: string) => {

    if (pointType === pointTypes.REGULAR_POINT) {
      increaseScore();
    }

    if (pointType === pointTypes.GAME_POINT) {
      increaseGamePoint(false);
    }
  }
  
  const onSwipe = (direction: string, state: PanResponderGestureState, pointType: string) => {

    // Get rid of LEFT and RIGHT swipes.
    if (direction !== swipeDirections.SWIPE_UP && direction !== swipeDirections.SWIPE_DOWN) return;

    if (index === 0 || index === 1) {
      direction = direction === swipeDirections.SWIPE_UP ? swipeDirections.SWIPE_DOWN : swipeDirections.SWIPE_UP;
    }

    switch (direction) {
      case swipeDirections.SWIPE_UP:

        if (pointType === pointTypes.REGULAR_POINT) {
          increaseScore();
        }

        if (pointType === pointTypes.GAME_POINT) {
          increaseGamePoint(false);
        }

        break;
      case swipeDirections.SWIPE_DOWN:

        if (pointType === pointTypes.REGULAR_POINT) {
          decreaseScore();
        }

        if (pointType === pointTypes.GAME_POINT) {
          decreaseGamePoint(false);
        }

        break;
      default:

    }
  };

  // ----------------------- //
  // -----   RENDER   ----- //
  // ----------------------- //

  return (
    <QuarterElement
      borderLeft={[0, 3].includes(index)}
      borderTop={[1, 2].includes(index)}
      style={[
        !isSinglePointQuarter(index) ? styles.rotate : null,
      ]}
    >
      {!isSinglePointQuarter(index) && (
        
        <GestureRecognizer
          onSwipe={(direction, state) => onSwipe(direction, state, pointTypes.GAME_POINT)}
          config={gestureConfig}
          style={[
            styles.gamePointGestureRecognizer,
            index === 0 ? styles.positionRight : styles.positionLeft
          ]}
          
        >
          <GamePointContainer>

            <Tap
              onPress={() => onTap(pointTypes.GAME_POINT)}
              style={{flexWrap: 'wrap'}}
              activeOpacity={1}
            >

              {[...Array(gameScore[teamIndex])].map((gamePoints, index) => {
                return <GamePointImage key={index} source={silverChickpea} />
              })}

            </Tap>

          </GamePointContainer>
        </GestureRecognizer>
      )}

      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state, pointTypes.REGULAR_POINT)}
        config={gestureConfig}
        style={styles.gestureRecognizer}
      >
        <Tap
          onPress={() => onTap(pointTypes.REGULAR_POINT)}
          activeOpacity={1}
        >
          <ChickpeaImage teamScore={score[teamIndex]} index={index} />

          {!isSinglePointQuarter(index) && score[teamIndex] === maxScore && (

            <AddGamePointButton onPress={() => increaseGamePoint()}>
              <AddGamePointText>Ustela Gehitu</AddGamePointText>
            </AddGamePointButton>
          )}

        </Tap>

        <QuarterValueText position={[0,3].includes(index) ? 'right' : 'left'}>
          {isSinglePointQuarter(index) ? '1' : '5'}
        </QuarterValueText>

      </GestureRecognizer>
    </QuarterElement>

  )
}

// -----   STYLED COMPONENTS   ----- //

interface QuarterElementProps {
  borderLeft: boolean,
  borderTop: boolean
}

const QuarterElement = styled.View<QuarterElementProps>`
  width: 50%;
  height: 50%;
  z-index: 1;

  border-style: dashed;
  border-color: white;

  border-left-width: ${props => props.borderLeft ? '3px' : '0px'};
  border-top-width: ${props => props.borderTop ? '3px' : '0px'};
  border-bottom: 3px dashed white;

`;

const Tap = styled.TouchableOpacity`
  width:100%;
  padding: 10px;
  height:100%;
  justify-content:center;
  align-items:center;
`

interface QuarterValueTextProps {
  position: 'right' | 'left'
}

const QuarterValueText = styled.Text<QuarterValueTextProps>`
  color: white;  
  font-family: Kaxko;
  position: absolute;
  bottom: 10px;
  font-size: 20px;
  opacity: .5;
  ${props => props.position}: 40px;
`


// -----   RESET   ----- //

const ResetTextButton = styled.TouchableOpacity`
  z-index: 3;
  background: rgba(0,0,0,.5);
  color: white;
  border: 1px solid white;
  padding: 8px;
  border-radius: 3px;
  position: absolute;
`
const ResetText = styled.Text`
  font-size: 20px;
  font-family: Vascan;
  color: white;
`

// -----   GAME POINTS   ----- //

const GamePointContainer = styled.View`
  background: rgba(0,0,0,.2);
  border: 1px dashed white;
`

const AddGamePointButton = styled.TouchableOpacity`
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, .85);
  border-radius: 3px;
  background: rgba(0,0,0,.2);
`

const AddGamePointText = styled.Text`
  font-family: Vascan;
  font-size: 20px;
  color: rgba(255, 255, 255, .85);
`

const GamePointImage = styled.Image`
  width: 25px;
  height: 25px;
  resize-mode:contain;
`

const styles = StyleSheet.create({
  gestureRecognizer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gamePointGestureRecognizer: {
    height: '72%',
    position: 'absolute',
    minWidth: 48, 
    marginVertical: 10,
    zIndex: 4,
  },
  positionLeft: {
    left: 20
  }, 
  positionRight: {
    right: 20
  },
  rotate: {
    transform: [{rotate: '180deg'}]
  },
});


export default Quarter;