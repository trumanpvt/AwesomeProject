import React from 'react';

import {useStores} from '../../store';

import {SafeAreaView} from 'react-native-safe-area-context';
import {FlatList} from 'react-native';
import {Button, ListItem} from 'react-native-elements';

import {useTranslation} from 'react-i18next';

import User from './user';

import styleSheet from './style';
import {languageCodes} from '../../constants';
import {useActionSheet} from '@expo/react-native-action-sheet';
import {observer} from 'mobx-react-lite';

interface Props {
  routeNames: string[];
  navigation: any;
}

const SideBar = ({navigation, routeNames}: Props) => {
  const {language, setLanguage, loading, setLoading} = useStores().localeStore;

  const {showActionSheetWithOptions} = useActionSheet();

  const {t} = useTranslation();

  const styles = styleSheet();

  const routes = routeNames.filter(route => route !== 'ProfileScreen');

  // const changeLanguage = () => {
  //   const newLanguage = language === 'en' ? 'ru' : 'en';
  //
  //   setLanguage(newLanguage);
  // };

  const renderListItem = ({item}: {item: any}) => (
    <ListItem bottomDivider onPress={() => navigation.navigate(item)}>
      <ListItem.Content>
        <ListItem.Title style={styles.listItemText}>
          {t(`routes.${item}`)}
        </ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  const getLanguageSelector = () => {
    return showActionSheetWithOptions(
      {
        options: [...languageCodes, 'Cancel'],
        cancelButtonIndex: languageCodes.length,
        title: t('sideBar.selectLanguage'),
        useModal: true,
        showSeparators: true,
        textStyle: styles.pickerOptions,
      },
      buttonIndex => {
        if (buttonIndex !== languageCodes.length) {
          setLoading(true);
          return setLanguage(languageCodes[buttonIndex]);
        }
      },
    );
  };

  return (
    <SafeAreaView style={styles.sideBar}>
      <User navigation={navigation} />
      <FlatList
        data={routes}
        renderItem={renderListItem}
        keyExtractor={(item: any, index: number) => index.toString()}
      />
      <Button
        icon={{
          name: 'language',
          size: 20,
          color: 'white',
        }}
        title={language}
        loading={loading}
        containerStyle={styles.languageBtnContainer}
        buttonStyle={styles.languageBtn}
        titleStyle={styles.languageBtnText}
        onPress={getLanguageSelector}
      />
    </SafeAreaView>
  );
};

export default observer(SideBar);
