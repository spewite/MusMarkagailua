import styled from "styled-components/native"
import { isSinglePointQuarter } from "../../utils/utils"

const chickpeakImages: Record<number, string | undefined> = {
  0: undefined,
  1: require('../../assets/chickpeas/chickpeaks_1.png'),
  2: require('../../assets/chickpeas/chickpeaks_2.png'),
  3: require('../../assets/chickpeas/chickpeaks_3.png'),
  4: require('../../assets/chickpeas/chickpeaks_4.png'),
  5: require('../../assets/chickpeas/chickpeaks_5.png'),
  6: require('../../assets/chickpeas/chickpeaks_6.png'),
  7: require('../../assets/chickpeas/chickpeaks_7.png'),
  8: require('../../assets/chickpeas/chickpeaks_8.png'),
}

// -------------------------------------------------------- //

interface ChickpeaImageProps {
  teamScore: number,
  index: number,
}

const ChickpeaImage:React.FC<ChickpeaImageProps> = ({teamScore, index}) => {

  let cheackpeaImageIndex = isSinglePointQuarter(index) ? teamScore%5 : Math.trunc(teamScore/5);

  if (teamScore) {

    const imagePath = chickpeakImages[cheackpeaImageIndex];
    if (imagePath) {
      return (
        <Chickpea source={imagePath} />
      );
    }
  }

}

// -----   STYLED COMPONENTS   ----- //

interface ChickpeaProps {
  source: string
}

const Chickpea = styled.Image<ChickpeaProps>`
  width: 70px;
  resize-mode: contain;
`

export default ChickpeaImage;