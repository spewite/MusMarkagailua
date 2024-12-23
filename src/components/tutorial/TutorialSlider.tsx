import Swiper from "react-native-swiper";
import { View, StyleSheet, Text } from "react-native";
import styled from "styled-components/native";

const TutorialSlider = () => {
  return (
    <Swiper 
      style={styles.wrapper}
      showsButtons={true}
      activeDotColor="#ad6511"
      nextButton={<Text style={styles.buttonText}>›</Text>}
      prevButton={<Text style={styles.buttonText}>‹</Text>}
    >
      <View style={styles.slide}>
        <TutorialImage source={require('../../assets/tutorial/tutorial_1.png')} />
      </View>
      <View style={styles.slide}>
        <TutorialImage source={require('../../assets/tutorial/tutorial_2.png')} />
      </View>
      <View style={styles.slide}>
        <TutorialImage source={require('../../assets/tutorial/tutorial_3.png')} />
      </View>
      <View style={styles.slide}>
        <TutorialImage source={require('../../assets/tutorial/tutorial_4.png')} />
      </View>
    </Swiper>
  );
};

const TutorialImage = styled.Image`
  width: 80%;
  resize-mode: contain;
`
const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#30200b', // Cambia este color al que desees
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default TutorialSlider