import React, {useEffect, useState} from 'react';

import {ActivityIndicator, Modal, SafeAreaView} from 'react-native';
// @ts-ignore
import VideoPlayer from 'react-native-video-controls';

import RNFS from 'react-native-fs';

import styles from './style';

interface VideoPlayerProps {
  uri: string;
  postId: string;
  style: any;
  disableBack?: boolean;
}

const VideoPlayerCustom = ({
  uri,
  postId,
  style,
  disableBack = true,
}: VideoPlayerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [videoReady, setVideoReady] = useState(false);

  const path = RNFS.DocumentDirectoryPath + '/video-' + postId;

  useEffect(() => {
    RNFS.downloadFile({
      fromUrl: uri,
      toFile: path,
    }).promise.then(() => {
      setVideoReady(true);
    });

    return () => {
      RNFS.unlink(path).then();
    };
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
        style={style}
        controlTimeout={0}
        tapAnywhereToPause
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
