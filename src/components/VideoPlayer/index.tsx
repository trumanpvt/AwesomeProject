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

  const path = RNFS.DocumentDirectoryPath + '/video';

  useEffect(() => {
    RNFS.downloadFile({
      fromUrl: uri,
      toFile: path,
    }).promise.then(() => {
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
            source={{uri: path}}
            onBack={() => setIsFullscreen(false)}
            disableFullscreen
          />
        </SafeAreaView>
      </Modal>
    );
  };

  const inlineVideo = () => {
    return (
      <VideoPlayer
        source={{uri: path}}
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
