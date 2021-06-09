import React, {useEffect, useState} from 'react';

import {ActivityIndicator, Modal, View} from 'react-native';

import styles from './style';
import {Image} from 'react-native-elements';
import {getFileNameFromUrl, getFilePath} from '../../../util/media';

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
    getFilePath(uri, tag + getFileNameFromUrl(uri)).then(path => {
      setImagePath(path);
    });

    // return () => {
    //   clearCache(tag);
    // };
  }, [fileName, uri]);

  const fullScreenImage = () => {
    return (
      <Modal supportedOrientations={['portrait', 'landscape']}>
        <Image
          resizeMode="contain"
          source={{uri: imagePath}}
          onPress={() => setIsFullscreen(false)}
          style={styles.imageFullScreen}
          containerStyle={styles.container}
        />
      </Modal>
    );
  };

  const inlineImage = () => {
    return imagePath ? (
      <Image
        resizeMode="cover"
        style={style}
        containerStyle={containerStyle}
        source={{uri: imagePath}}
        PlaceholderContent={<ActivityIndicator size="large" color="#0000ff" />}
        onPress={() => setIsFullscreen(true)}
      />
    ) : (
      <View style={[style, styles.loading]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return isFullscreen ? fullScreenImage() : inlineImage();
};

export default ImageCustom;
