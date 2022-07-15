/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useRef, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Animated,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigation/ShopStack';
import {useCarnets} from '../../hooks/useCarnets';
import {ThemeContext} from '../../context/theme/ThemeContext';
import {useNavigation} from '@react-navigation/native';
import {BackButton} from '../../components/BackButton';
import {ModalEditCarnet} from '../../components/ModalEditCarnet';
import {ModalAddCarnet} from '../../components/ModalAddCarnet';
import {Fab} from '../../components/Fab';
import {CarnetComponent} from '../../components/CarnetComponent';
import {Carnet} from '../../interfaces/CarnetResponse.interface';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props
  extends StackScreenProps<RootStackParams, 'InputCarnetScreen'> {}

const HEADER_MAX_HEIGHT = 170;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export const InputCarnetScreen = (props: Props) => {
  const {route} = props;
  const {paquetes} = route.params;

  const cantCarnets = Math.ceil(paquetes / 10);
  const {carnets, loadCarnets, deleteCarnet, isLoading} = useCarnets();
  const {
    theme: {colors},
  } = useContext(ThemeContext);
  const navigation = useNavigation();

  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [carnetEdit, setCarnetEdit] = useState<Partial<Carnet>>({});

  const [selectedCarnet, setSelectedCarnet] = useState<string[]>([]);

  const addCarnet = () => {
    setTitle('Datos');
    setBody('');

    setOpenModal(true);
  };
  const editCarnet = () => {
    setOpenModalEdit(true);
  };
  const handleCheck = (carnet: any) => {
    if (selectedCarnet.includes(carnet)) {
      setSelectedCarnet(selectedCarnet.filter(c => c !== carnet));
    } else {
      setSelectedCarnet([...selectedCarnet, carnet]);
    }
  };

  const confirmModal = () => {
    setOpenModal(false);
    setOpenModalEdit(false);
    setCarnetEdit({});
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const headerZindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 170],
    outputRange: [0, 0, 1000],
    extrapolate: 'clamp',
  });

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT + 26,
    ],
    outputRange: [-30, -30, -30, 5],
    extrapolate: 'clamp',
  });

  return (
    <>
      <BackButton navigation={navigation} />
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'lightskyblue',
          height: headerHeight,
          zIndex: headerZindex,
          elevation: headerZindex, //required for android
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: headerTitleBottom,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 22,
              fontWeight: 'bold',
            }}>
            Carnets
          </Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        style={{flex: 1, marginBottom: 120}}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}>
        <View
          style={{
            ...styles.headerContainer,
            height: 150,
            overflow: 'hidden',
          }}>
          <Text
            style={{
              ...styles.titleList,
              color: 'white',
              alignSelf: 'center',
              marginTop: 80,
            }}>
            Carnets
          </Text>
        </View>
        <View
          style={{
            marginTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Necesitamos {cantCarnets} carnets</Text>
          {carnets.map((carnet, index) => (
            <View
              key={index}
              style={{
                width: '100%',
                backgroundColor: '#fcfcfc',
                padding: 10,
                paddingLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{padding: 10}}
                onPress={() => handleCheck(carnet.id)}>
                <Icon
                  name={
                    selectedCarnet.includes(carnet.id)
                      ? 'check-circle-outline'
                      : 'circle-outline'
                  }
                  size={22}
                  color={
                    selectedCarnet.includes(carnet.id) ? 'green' : '#e0e0e0'
                  }
                  style={{
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
              <View style={{flex: 1}}>
                <CarnetComponent carnet={carnet} />
              </View>
            </View>
          ))}
        </View>
        {isLoading && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 300,
            }}>
            <ActivityIndicator size={32} color={colors.card} />
          </View>
        )}
      </ScrollView>
      <Fab
        iconName={'add-outline'}
        onPress={addCarnet}
        style={{
          position: 'absolute',
          bottom: 70,
          right: 20,
        }}
      />

      <ModalAddCarnet
        title={title}
        body={body}
        setBody={setBody}
        openModal={openModal}
        setOpenModal={setOpenModal}
        onConfirmModal={confirmModal}
        loadCarnets={loadCarnets}
      />

      <ModalEditCarnet
        carnetEdit={carnetEdit}
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        loadCarnets={loadCarnets}
      />
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 170,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: Platform.OS === 'ios' ? 1000 : 100,
    borderBottomLeftRadius: 0,
  },
  title: {
    fontSize: 24,
  },
  card: {
    margin: 5,
    backgroundColor: '#f8f7f7',
    borderRadius: 3,
    padding: 5,
  },
  subcategory: {
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  firstText: {
    fontSize: 16,
  },
  titleList: {
    color: 'white',
    fontSize: 40,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    marginTop: 1,
    padding: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 15,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    marginHorizontal: 15,
  },
});
