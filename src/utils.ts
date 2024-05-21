import {MAX_PERCENT_STARS_WIDTH, STARS_COUNT, months} from './const';

export const getStarsWidth = (rating: number) => `${(MAX_PERCENT_STARS_WIDTH * rating) / STARS_COUNT}%`;

export const formatDate = (date: string) => {
  const dateParsed = new Date(date);
  return `${months[dateParsed.getMonth()]} ${dateParsed.getFullYear()}`;
};

export class Token {
  private static _name = 'auth-token';

  static get() {
    const token = localStorage.getItem(this._name);

    return token ?? '';
  }

  static save(token: string) {
    localStorage.setItem(this._name, token);
  }

  static drop() {
    localStorage.removeItem(this._name);
  }
}

export const pluralize = (str: string, count: number) => count === 1 ? str : `${str}s`;
export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
