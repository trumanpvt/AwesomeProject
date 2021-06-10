import RNFS from 'react-native-fs';

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

  const tagWithDash = tag ? tag + '-' : '';

  const path = RNFS.DocumentDirectoryPath + '/' + tagWithDash + fileName;

  if (uri.includes('file://')) {
    console.log("uri.includes('file://')");
    return uri;
  }

  return RNFS.exists(path).then(exists => {
    if (exists) {
      console.log('await RNFS.exists(path)');
      return path;
    } else {
      return RNFS.downloadFile({
        fromUrl: uri,
        toFile: path,
      })
        .promise.then(() => {
          console.log('downloaded', path);
          return 'file://' + path;
        })
        .catch(e => {
          console.log('RNFS.downloadFile error', e);
          return '';
        });
    }
  });

  // else if (await RNFS.exists(path)) {
  //     console.log('await RNFS.exists(path)');
  //     return path;
  //   } else {
  //     return RNFS.downloadFile({
  //       fromUrl: uri,
  //       toFile: path,
  //     }).promise.then(() => {
  //       console.log('downloaded', path);
  //       return 'file://' + path;
  //     });
  //   }
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

export const getFileNameFromUrl = (url: string) => {
  return (
    url
      .split('/')
      .pop()
      ?.split('%2F')
      .pop()
      ?.split('?')[0]
      // eslint-disable-next-line no-control-regex
      .replace(/[^\x00-\xFF]/g, '') || ''
  );
};
