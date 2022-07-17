import React, {useContext} from 'react';
import {View, Text, Platform, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BackButton} from './BackButton';
import {ThemeContext} from '../context/theme/ThemeContext';

interface Props {
  colors?: Array<string | number>;
  text: String;
  backButton: boolean;
  height: number;
}

export const TopScreen = (props: Props) => {
  const {text, backButton, height} = props;
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();
  return (
    <>
      {backButton && <BackButton navigation={navigation} />}
      <View
        style={{
          ...styles.headerContainer,
          height: height,
        }}>
        <View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: 'lightskyblue',
          }}>
          <Text
            style={{
              ...styles.mainName,
              top: height * 0.4,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            {text}
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    zIndex: 999,
    alignItems: 'center',
  },
  mainName: {
    color: 'white',
    fontSize: 40,
  },
});
