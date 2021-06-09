import RNFS from 'react-native-fs';

export const guidGenerator = () => {
  const S4 = function () {
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

export const getFilePath = async (uri: string, name: string) => {
  const path = RNFS.DocumentDirectoryPath + '/' + name;

  if (uri.includes('file://')) {
    return uri;
  } else if (await RNFS.exists(path)) {
    console.log('RNFS.exists(path)');
    return path;
  } else {
    console.log('!RNFS.exists(path)');
    return RNFS.downloadFile({
      fromUrl: uri,
      toFile: path,
    }).promise.then(() => {
      console.log('path', path);
      return 'file://' + path;
    });
  }
};

export const clearCache = (tag: string) => {
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
