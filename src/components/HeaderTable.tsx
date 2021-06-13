import React from 'react';
import {View, Text} from 'react-native';
interface Props {
  editHeader: string;
}
export const HeaderTable = ({editHeader}: Props) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 5,
          backgroundColor: '#f1f1f1',
          borderRadius: 10,
          padding: 10,
          marginRight: 5,
        }}>
        <View style={{flex: 4}}>
          <Text style={{textAlign: 'left', fontFamily: 'NovaSlim-Regular'}}>
            Producto
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text
            style={{
              fontFamily: 'NovaSlim-Regular',
              textAlign: 'center',
              marginLeft: 10,
            }}>
            Precio
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            marginLeft: 5,
          }}>
          <Text style={{fontFamily: 'NovaSlim-Regular', textAlign: 'center'}}>
            Cantidad
          </Text>
        </View>
        <View style={{flex: 2}}>
          <Text style={{fontFamily: 'NovaSlim-Regular', textAlign: 'center'}}>
            {editHeader}
          </Text>
        </View>
      </View>
    </>
  );
};
