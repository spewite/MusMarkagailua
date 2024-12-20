import AsyncStorage from '@react-native-async-storage/async-storage';

export const quarterPointValue = (index: number): number => {
  return isSinglePointQuarter(index) ? 1 : 5;
}

export const isSinglePointQuarter = (index: number): boolean => {
  return [2,3].includes(index);
}

export const getTeamIndex = (index: number): number => {
  return index === 0 || index === 3 ? 0 : 1;
}

export const loadSavedScores = async (setMaxScore: Function, setScore: Function, setGameScore: Function, setLoaded: Function) => {
  
  try {

    // -- Max Score -- //
    const maxScoreJSON = await AsyncStorage.getItem("maxScore");
    if (maxScoreJSON) {
      const parsed = JSON.parse(maxScoreJSON);
      setMaxScore(parsed.maxScore);
      console.log("Max score loaded successfully: ", parsed.maxScore);
    } else {
      console.log("Max score not found on AsyncStorage");
    }

    // -- Regular Score -- // 
    const scoreJSON = await AsyncStorage.getItem('score');
    if (scoreJSON) {
      const parsed = JSON.parse(scoreJSON);
      setScore(parsed.score);
      console.log("Score loaded successfully: ", parsed.score);
    } else {
      console.log("Score not found on AsyncStorage");
    }
    
    // -- Game Score -- // 
    const gameScoreJSON = await AsyncStorage.getItem('gameScore');
    if (gameScoreJSON) {
      const parsed = JSON.parse(gameScoreJSON);
      setGameScore(parsed.gameScore);
      console.log("Game Score loaded successfully: ", parsed.gameScore);
    } else {
      console.log("Game Score not found on AsyncStorage");
    }

  } catch (error) {
    console.error("Error reading score:", error);
  } finally {
    setLoaded(true);
  }

} 