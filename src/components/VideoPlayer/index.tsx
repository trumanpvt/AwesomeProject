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

  const [videoPath, setVideoPath] = useState('');

  useEffect(() => {
    if (uri.includes('file://')) {
      setVideoPath(uri);
    } else {
      const path = RNFS.DocumentDirectoryPath + '/video-' + postId;

      RNFS.downloadFile({
        fromUrl: uri,
        toFile: path,
      }).promise.then(() => {
        console.log('path', path);
        setVideoPath(path);
      });

      return () => {
        RNFS.unlink(path).then();
      };
    }
  }, [postId, uri]);

  const fullScreenVideo = () => {
    return (
      <Modal>
        <SafeAreaView style={styles.container}>
          <VideoPlayer
            source={{uri: videoPath}}
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
        source={{uri: videoPath}}
        style={style}
        tapAnywhereToPause
        paused
        onEnterFullscreen={() => setIsFullscreen(true)}
        disableBack={disableBack}
      />
    );
  };

  return videoPath ? (
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
