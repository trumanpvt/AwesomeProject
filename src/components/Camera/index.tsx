'use strict';
import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';

import {Modal, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {Button, Fab, Icon, Spinner} from 'native-base';

import styles from './style.js';

export interface Props {
  closeCamera: () => void;
  takePhoto: (uri: string) => void;
}

const Camera = ({closeCamera, takePhoto}: Props) => {
  const [isBack, setIsBack] = useState(true);
  const [flashMode, setFlashMode] = useState('auto');
  const [isFlashModeMenuOpen, setIsFlashModeMenuOpen] = useState(false);

  const takePicture = async function (camera: RNCamera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log('takePicture', data.uri);
    takePhoto(data.uri);
  };

  // const renderPendingView = () => (
  //   <View style={styles.pending}>
  //     <Text>Waiting</Text>
  //   </View>
  // );

  return (
    <Modal style={styles.container}>
      <RNCamera
        style={styles.preview}
        // type={RNCamera.Constants.Type.back}
        type={isBack ? 'back' : 'front'}
        flashMode={flashMode}
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
                  active={isFlashModeMenuOpen}
                  direction="down"
                  containerStyle={{}}
                  style={styles.flashmode}
                  position="topRight"
                  onPress={() => setIsFlashModeMenuOpen(!isFlashModeMenuOpen)}>
                  <Icon type="MaterialIcons" name={`flash-${flashMode}`} />
                  <Button
                    style={{backgroundColor: '#34A34F'}}
                    onPress={() => setFlashMode('auto')}>
                    <Icon type="MaterialIcons" name="flash-auto" />
                  </Button>
                  <Button
                    style={{backgroundColor: '#3B5998'}}
                    onPress={() => setFlashMode('off')}>
                    <Icon type="MaterialIcons" name="flash-off" />
                  </Button>
                  <Button
                    style={{backgroundColor: '#DD5144'}}
                    onPress={() => setFlashMode('on')}>
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
