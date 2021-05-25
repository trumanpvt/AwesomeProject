import React from 'react';

import {ActivityIndicator, Modal, View} from 'react-native';

import {useStores} from '../../../store';
import {observer} from 'mobx-react-lite';

import styles from './style';

const LoadingOverlay = () => {
  const {loading} = useStores().stateStore;

  return loading ? (
    <Modal transparent={true}>
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    </Modal>
  ) : null;
};

export default observer(LoadingOverlay);
