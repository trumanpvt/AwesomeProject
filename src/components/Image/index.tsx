import React, {useState} from 'react';

import {ActivityIndicator, Modal} from 'react-native';

import styles from './style';
import {Image} from 'react-native-elements';

interface ImageCustomProps {
  uri: string;
  style: any;
  containerStyle: any;
}

const ImageCustom = ({uri, style, containerStyle}: ImageCustomProps) => {
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
        resizeMode="cover"
        style={style}
        containerStyle={containerStyle}
        source={{uri}}
        PlaceholderContent={<ActivityIndicator size="large" color="#0000ff" />}
        onPress={() => setIsFullscreen(true)}
      />
    );
  };

  return isFullscreen ? fullScreenImage() : inlineImage();
};

export default ImageCustom;
