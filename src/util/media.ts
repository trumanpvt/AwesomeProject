import RNFS from 'react-native-fs';
import storage from '@react-native-firebase/storage';

export const guidGenerator = () => {
  const S4 = function () {
    // eslint-disable-next-line no-bitwise
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};

export const getFilePath = async (uri: string, tag: string) => {
  const fileName = getFileNameFromUrl(uri);

  console.log(uri);
  const tagWithDash = tag ? tag + '-' : '';

  const path = RNFS.DocumentDirectoryPath + '/' + tagWithDash + fileName;

  if (uri.includes('file://')) {
    console.log("uri.includes('file://')");
    return uri;
  }

  return RNFS.exists(path).then(exists => {
    if (exists) {
      console.log('await RNFS.exists(path)');
      return 'file://' + path;
    } else {
      return RNFS.downloadFile({
        fromUrl: uri,
        toFile: path,
      })
        .promise.then(() => {
          console.log('RNFS.downloadFile success', path);
          return 'file://' + path;
        })
        .catch(e => {
          console.log('RNFS.downloadFile error', e);
          return '';
        });
    }
  });
};

export const clearCacheByTag = (tag: string) => {
  RNFS.readDir(RNFS.DocumentDirectoryPath).then(result => {
    console.log('GOT RESULT', result);
    return result.forEach(file => {
      if (file.name.includes(tag)) {
        RNFS.unlink(file.path).catch(e => {
          console.log('RNFS.unlink error', e);
        });
      }
    });
  });
};

export const clearCache = (tags: string[]) => {
  tags.forEach(clearCacheByTag);
};

export const removeFromStorage = (path: string) => {
  const ref = storage().ref(path);
  return ref.delete();
};

export const getFileNameFromUrl = (url: string) => {
  return (
    url.split('/').pop()?.split('%2F').pop()?.split('?')[0].replace('%', '') ||
    ''
  );
};
