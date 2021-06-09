import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  Modal,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';

import Video from 'react-native-video';
// @ts-ignore
import VideoPlayer from 'react-native-video-controls';

import styles from './style';
import {getFilePath} from '../../../util/media';

interface VideoPlayerProps {
  uri: string;
  style: any;
  fileTag?: string;
  disableBack?: boolean;
}

const VideoPlayerCustom = ({
  uri,
  style,
  disableBack = true,
  fileTag = '',
}: VideoPlayerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [videoPath, setVideoPath] = useState('');

  useEffect(() => {
    getFilePath(uri, fileTag).then(path => setVideoPath(path));
  }, [uri]);

  const fullScreenVideo = () => {
    return (
      <Modal supportedOrientations={['portrait', 'landscape']}>
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
    if (Platform.OS === 'ios') {
      return (
        <Video
          // source={{
          //   uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          // }}
          source={{
            uri: videoPath,
          }}
          style={style}
          onError={(e: any) => {
            console.log('videoPath', videoPath);
            console.log('video error', e);
          }}
          controls
          paused
        />
      );
    }

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
    <View style={[style, styles.loading]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default VideoPlayerCustom;
