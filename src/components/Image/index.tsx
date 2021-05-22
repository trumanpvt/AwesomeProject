import React, {useState} from 'react';

import {ActivityIndicator, Modal, SafeAreaView} from 'react-native';

import styles from './style';
import {Image} from 'react-native-elements';

interface VideoPlayerProps {
  uri: string;
  style: any;
}

const ImageCustom = ({uri, style}: VideoPlayerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fullScreenImage = () => {
    return (
      <Modal>
        <Image
          source={{uri}}
          onPress={() => setIsFullscreen(false)}
          style={styles.imageFullScreen}
          containerStyle={styles.container}
        />
      </Modal>
    );
  };

  const inlineImage = () => {
    return (
      <Image
        resizeMode="contain"
        style={style}
        source={{uri}}
        PlaceholderContent={<ActivityIndicator size="large" color="#0000ff" />}
        onPress={() => setIsFullscreen(true)}
      />
    );
  };

  return isFullscreen ? fullScreenImage() : inlineImage();
};

export default ImageCustom;
