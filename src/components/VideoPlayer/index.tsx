import React, {useEffect, useState} from 'react';

import {ActivityIndicator, Modal, SafeAreaView} from 'react-native';
// @ts-ignore
import VideoPlayer from 'react-native-video-controls';

import RNFS from 'react-native-fs';

import styles from './style';

interface VideoPlayerProps {
  uri: string;
  disableBack?: boolean;
}

const VideoPlayerCustom = ({uri, disableBack = true}: VideoPlayerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [videoReady, setVideoReady] = useState(false);

  const path = RNFS.DocumentDirectoryPath + '/video.mp4';

  // const downloadFile = () => {
  //   RNFS.downloadFile({
  //     fromUrl: uri,
  //     toFile: path,
  //   }).promise.then(() => {
  //     return setVideoReady(true);
  //   });
  // };

  // const removeFIle = async () => {
  //   return await RNFS.unlink(path);
  // };

  useEffect(() => {
    RNFS.downloadFile({
      fromUrl: uri,
      toFile: path,
    }).promise.then(res => {
      console.log('ready', path);
      console.log('res', res);
      setVideoReady(true);
    });

    // return RNFS.unlink(path).then(() => {
    //   console.log('FILE DELETED');
    // });
    // return removeFIle();
  }, [path, uri]);

  const fullScreenVideo = () => {
    return (
      <Modal>
        <SafeAreaView style={styles.container}>
          <VideoPlayer
            source={`file://${path}`.replace('///', '//')}
            onBack={() => setIsFullscreen(false)}
            disableFullscreen
          />
        </SafeAreaView>
      </Modal>
    );
  };

  const inlineVideo = () => {
    console.log(`file://${path}`.replace('///', '//'));
    return (
      <VideoPlayer
        // source={`file://${path}`.replace('///', '//')}
        source={
          '/Users/out-kurgin-ad/Library/Developer/CoreSimulator/Devices/56F33875-3D0F-48AF-A7CE-DF40F573E9D4/data/Containers/Data/Application/DC4DE4D8-BF94-4EFC-93EA-7A9ED56EC3F1/Documents/video.mp4'
        }
        onEnterFullscreen={() => setIsFullscreen(true)}
        disableBack={disableBack}
      />
    );
  };

  return videoReady ? (
    isFullscreen ? (
      fullScreenVideo()
    ) : (
      inlineVideo()
    )
  ) : (
    <ActivityIndicator size="large" color="#0000ff" />
  );
};

export default VideoPlayerCustom;
