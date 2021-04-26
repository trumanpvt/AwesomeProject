import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';

import {
  Modal,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Fab, Icon, Spinner} from 'native-base';

import styles from './style.js';

interface Props {
  closeCamera: () => void;
  takePhoto: (uri: string) => void;
}

const Camera = ({closeCamera, takePhoto}: Props) => {
  const [isBack, setIsBack] = useState(true);
  const [flash, setFlash] = useState({mode: 'auto', isOpen: false});

  const takePicture = async function (camera: RNCamera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log('takePicture', data.uri);
    return takePhoto(data.uri);
  };

  const handleChangeFlashMode = (mode: string) => {
    return setFlash({
      mode,
      isOpen: false,
    });
  };

  const flashModes: any = RNCamera.Constants.FlashMode;

  return (
    <Modal style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={isBack ? 'back' : 'front'}
        flashMode={flashModes[flash.mode]}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status}) => {
          if (status !== 'READY') {
            return <Spinner />;
          }

          return (
            <SafeAreaView style={styles.controls}>
              <View style={styles.controlsTop}>
                <Fab
                  active={flash.isOpen}
                  direction="down"
                  containerStyle={
                    Platform.OS && !flash.isOpen ? styles.flashContainer : null
                  }
                  style={{...styles}[flash.mode]}
                  position="topRight"
                  onPress={() =>
                    setFlash({mode: flash.mode, isOpen: !flash.isOpen})
                  }>
                  <Icon type="MaterialIcons" name={`flash-${flash.mode}`} />
                  <Button
                    style={styles.auto}
                    onPress={() => handleChangeFlashMode('auto')}>
                    <Icon type="MaterialIcons" name="flash-auto" />
                  </Button>
                  <Button
                    style={styles.off}
                    onPress={() => handleChangeFlashMode('off')}>
                    <Icon type="MaterialIcons" name="flash-off" />
                  </Button>
                  <Button
                    style={styles.on}
                    onPress={() => handleChangeFlashMode('on')}>
                    <Icon type="MaterialIcons" name="flash-on" />
                  </Button>
                </Fab>
              </View>
              <View style={styles.controlsBottom}>
                <TouchableOpacity
                  onPress={() => closeCamera()}
                  style={styles.controlBtn}>
                  <Icon type="Ionicons" name="ios-backspace-outline" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.controlBtn}>
                  <Icon type="Ionicons" name="camera-outline" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsBack(!isBack)}
                  style={styles.controlBtn}>
                  <Icon type="Ionicons" name="camera-reverse-outline" />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          );
        }}
      </RNCamera>
    </Modal>
  );
};

export default Camera;
