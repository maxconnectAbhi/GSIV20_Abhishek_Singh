import {Platform,Dimensions} from "react-native";
const { width, height } = Dimensions.get('window');

//Font Family

//Colors
export const DISABLED = "#DFDFDF";
export const BACKGROUND = "#fff";
export const BLUE = "#4285F4";
export const GRAY = "#4A4A4A";
export const LIGHTGRAY = "#9b9b9b";


//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;
//const guidelineBaseWidth = 360;
//const guidelineBaseHeight = 640;
export const verticalScale = size => height / guidelineBaseHeight * size;
export const scale = size => width / guidelineBaseWidth * size;
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;
