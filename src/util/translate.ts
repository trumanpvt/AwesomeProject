import {backendUrl} from '../constants';

export const convertObjectToArray = (json: any): string[] => {
  let newArray: string[] = [];

  for (let key in json) {
    if (typeof json[key] === 'object' && json[key] !== null) {
      newArray = [...newArray, ...convertObjectToArray(json[key])];
    } else {
      newArray.push(json[key]);
    }
  }

  return newArray;
};

export const translateObjectFromArray = (
  array: {translation: string}[],
  target: any,
  index: number = 0,
): {index: number; newObject: object} => {
  const newObject = {...target};

  for (let key in newObject) {
    if (typeof newObject[key] === 'object' && newObject[key] !== null) {
      const convertedResult = translateObjectFromArray(
        array,
        newObject[key],
        index,
      );

      newObject[key] = convertedResult.newObject;
      index = convertedResult.index;
    } else {
      newObject[key] = array[index].translation;
      index += 1;
    }
  }

  return {index, newObject};
};

export const getTranslatedArray = (language: string, object: any) => {
  return fetch(backendUrl + '/translate', {
    method: 'POST',
    body: JSON.stringify({
      language: language,
      array: convertObjectToArray(object),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => {
    return res.json().then(json => {
      console.log(translateObjectFromArray(json.result.translations, object));
      return translateObjectFromArray(json.result.translations, object)
        .newObject;
    });
  });
};
