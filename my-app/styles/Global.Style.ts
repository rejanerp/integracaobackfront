import { Appearance } from "react-native";

const isDarkMode = Appearance.getColorScheme() === 'dark';

const FontConstants = {
  familyRegular: 'Ubunto',
  color: isDarkMode ? '#ffffff' : '#000000',
  sizeTitle: 26,
  sizesubtitle: 24,
  sielabel: 18,
};


const ColorsConstants = {
  backgroundColor: isDarkMode ? '#000000' : '#ffffff',
};

const SizeConstants = {
  width: {
    small: 50,
    medium: 100,
    large: 200,
  },
  height: {
    small: 50,
    medium: 100,
    large: 200,
  },
};

export { FontConstants, ColorsConstants, SizeConstants };