import React from 'react';
import {Image as Imagen} from '../interfaces/Image.interface';
import {Modal, ActivityIndicator} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  images: Imagen[];
}
export const ModalComponent = ({isVisible, setIsVisible, images}: Props) => {
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      transparent={true}
      onRequestClose={() => setIsVisible(false)}>
      <ImageViewer
       imageUrls={images}
       onSwipeDown={() => setIsVisible(false)}
       enableSwipeDown
       backgroundColor={'rgba(0,0,0,0.8)'}
       useNativeDriver
       enablePreload
      /*  renderImage={(image: ImageViewer) =>  {console.log(image); return <Text> {JSON.stringify(image)}</Text>}} */
       loadingRender={() => <ActivityIndicator  color='#fb2331' size={32}/>}
      />
    </Modal>
  );
};
