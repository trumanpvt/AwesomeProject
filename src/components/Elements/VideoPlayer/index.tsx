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

import RNFS from 'react-native-fs';

import styles from './style';

interface VideoPlayerProps {
  uri: string;
  name: string;
  style: any;
  disableBack?: boolean;
}

const VideoPlayerCustom = ({
  uri,
  name,
  style,
  disableBack = true,
}: VideoPlayerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [videoPath, setVideoPath] = useState('');

  useEffect(() => {
    if (uri.includes('file://')) {
      setVideoPath(uri);
    } else {
      const path = RNFS.DocumentDirectoryPath + '/video-' + name + '.mp4';

      console.log(path);
      RNFS.downloadFile({
        fromUrl: uri,
        toFile: path,
      }).promise.then(() => {
        console.log('path', path);
        setVideoPath('file://' + path);
      });

      return () => {
        RNFS.readDir(RNFS.DocumentDirectoryPath).then(result => {
          console.log('GOT RESULT', result);
          return result.forEach(file => {
            if (file.name.includes('video')) {
              RNFS.unlink(file.path).catch(e => {
                console.log('RNFS.unlink error', e);
              });
            }
          });
        });
      };
    }
  }, [name, uri]);

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
            console.log(videoPath);
            console.log(e);
          }}
          controls
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
