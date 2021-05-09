import React, {useState} from 'react';
import {RNCamera} from 'react-native-camera';

import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';

import {Icon, SpeedDial, useTheme} from 'react-native-elements';

import styleSheet from './style';

interface CameraProps {
  closeCamera: () => void;
  setMedia: (uri: string, isVideo?: boolean) => void;
  enableVideo?: boolean;
}

const Camera = ({closeCamera, setMedia, enableVideo = false}: CameraProps) => {
  const [isBack, setIsBack] = useState(true);
  const [flash, setFlash] = useState({mode: 'auto', isOpen: false});

  const [isVideoRecording, setIsVideoRecording] = useState(false);

  const {theme} = useTheme();

  const styles = styleSheet();

  const takePicture = async function (camera: RNCamera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    return setMedia(data.uri);
  };

  const startRecordVideo = async function (camera: RNCamera) {
    setIsVideoRecording(true);
    const data = await camera.recordAsync();
    return setMedia(data.uri, true);
  };

  const stopRecordVideo = (camera: RNCamera) => {
    setIsVideoRecording(false);
    return camera.stopRecording();
  };

  const handleChangeFlashMode = (mode: string = flash.mode) => {
    return setFlash({
      mode,
      isOpen: false,
    });
  };

  const renderVideoControls = (camera: RNCamera) => {
    if (isVideoRecording) {
      return (
        <TouchableOpacity
          onPress={() => stopRecordVideo(camera)}
          style={styles.controlBtn}>
          <Icon type="ionicon" name="stop" color={theme.colors?.error} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => startRecordVideo(camera)}
        style={styles.controlBtn}>
        <Icon type="ionicon" name="ellipse" color={theme.colors?.error} />
      </TouchableOpacity>
    );
  };

  const flashModes: any = RNCamera.Constants.FlashMode;

  return (
    <Modal style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={isBack ? 'back' : 'front'}
        flashMode={flashModes[flash.mode]}
        captureAudio={enableVideo}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status}) => {
          if (status !== 'READY') {
            return <ActivityIndicator size="large" color="#0000ff" />;
          }

          return (
            <SafeAreaView style={styles.controls}>
              <View style={styles.controlsTop}>
                <SpeedDial
                  isOpen={flash.isOpen}
                  icon={{name: `flash-${flash.mode}`, color: '#fff'}}
                  openIcon={{name: `flash-${flash.mode}`, color: '#fff'}}
                  onClose={() => setFlash({mode: flash.mode, isOpen: false})}
                  onOpen={() => setFlash({mode: flash.mode, isOpen: true})}
                  overlayColor="transparent"
                  transitionDuration={50}>
                  <SpeedDial.Action
                    color={theme.colors?.success}
                    icon={{name: 'flash-auto', color: '#fff'}}
                    onPress={() => handleChangeFlashMode('auto')}
                  />
                  <SpeedDial.Action
                    color={theme.colors?.error}
                    icon={{name: 'flash-off', color: '#fff'}}
                    onPress={() => handleChangeFlashMode('off')}
                  />
                  <SpeedDial.Action
                    color={theme.colors?.primary}
                    icon={{name: 'flash-on', color: '#fff'}}
                    onPress={() => handleChangeFlashMode('on')}
                  />
                </SpeedDial>
              </View>
              <View style={styles.controlsBottom}>
                <TouchableOpacity
                  onPress={() => closeCamera()}
                  style={styles.controlBtn}>
                  <Icon type="ionicon" name="ios-backspace-outline" />
                </TouchableOpacity>
                {enableVideo ? renderVideoControls(camera) : null}
                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.controlBtn}>
                  <Icon type="ionicon" name="camera-outline" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsBack(!isBack)}
                  style={styles.controlBtn}>
                  <Icon type="ionicon" name="camera-reverse-outline" />
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
