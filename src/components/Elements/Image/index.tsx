import React, {useCallback, useEffect, useState} from 'react';

import {ActivityIndicator, Modal} from 'react-native';

import styles from './style';
import {Image} from 'react-native-elements';
import RNFS from 'react-native-fs';
import {clearCache, getFilePath} from '../../../util/media';

interface ImageCustomProps {
  uri: string;
  style: any;
  containerStyle: any;
  fileName: string;
}

const ImageCustom = ({
  uri,
  style,
  containerStyle,
  fileName,
}: ImageCustomProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    const tag = 'image';
    getFilePath(uri, tag + fileName).then(path => setImagePath(path));

    return () => {
      clearCache(tag);
    };
  }, [fileName, uri]);

  const fullScreenImage = () => {
    return (
      <Modal supportedOrientations={['portrait', 'landscape']}>
        <Image
          source={{uri: imagePath}}
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
