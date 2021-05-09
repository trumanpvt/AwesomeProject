import moment from 'moment';
import {languageLocales} from '../constants';

import 'moment/locale/ar';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/he';
import 'moment/locale/it';
import 'moment/locale/nl';
// import 'moment/locale/no';
import 'moment/locale/pt';
import 'moment/locale/ru';
// import 'moment/locale/se';
// import 'moment/locale/ud';
import 'moment/locale/zh-cn';

export const getLocaleDate = (
  date: string | undefined,
  language: string,
  format: string = 'LLL',
) => {
  if (!date) {
    return '';
  }

  const locale = languageLocales[language];

  return moment(date).locale(locale).format(format);
};
