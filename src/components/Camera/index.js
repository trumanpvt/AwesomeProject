'use strict';
import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';

import {Modal, TouchableOpacity, View} from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Text,
} from 'native-base';

import styles from './style.js';

const Camera = ({closeCamera, takePhoto}) => {
  const takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log('takePicture', data.uri);
    takePhoto(data.uri);
  };

  const renderPendingView = () => (
    <View style={styles.pending}>
      <Text>Waiting</Text>
    </View>
  );

  return (
    <Modal style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          // if (status !== 'READY') {
          //   return <PendingView />;
          // }
          return (
            <View style={styles.controls}>
              <TouchableOpacity onPress={closeCamera} style={styles.close}>
                <Text style={{fontSize: 14}}>X</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{fontSize: 14}}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </Modal>
  );
};

export default Camera;
