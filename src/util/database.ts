import database from '@react-native-firebase/database';

export const readDatabaseValue = (ref: string | undefined) => {
  return database()
    .ref(ref)
    .once('value')
    .then(snapshot => {
      return snapshot.val();
    });
};

export const pushDatabaseValue = (ref: string, data: any, key?: string) => {
  // const dataKey =
  //   key ||
  //   database().ref(ref).push().key ||
  //   Math.random().toString(36).substr(2, 9);

  return database().ref(ref).set(data);
};

export const updateDatabaseValue = (ref: string, data: any, key: string) => {
  return database()
    .ref(ref)
    .update({
      [key]: data,
    });
};

export const removeDatabaseValue = (ref: string) => {
  return database().ref(ref).remove();
};
