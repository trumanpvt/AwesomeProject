import React from 'react';

import {Text, View} from 'react-native';
import {FAB} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import styleSheet from './style';

const BlogScreen = () => {
  const {t} = useTranslation();

  const styles = styleSheet();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t('blog.text')}</Text>
      <FAB
        icon={{
          name: 'post-add',
          size: 15,
          color: 'white',
        }}
      />
    </View>
  );
};

export default BlogScreen;
