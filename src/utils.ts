import {MAX_PERCENT_STARS_WIDTH, STARS_COUNT, months} from './const';

export const getStarsWidth = (rating: number) => `${(MAX_PERCENT_STARS_WIDTH * rating) / STARS_COUNT}%`;

export const formatDate = (date: string) => {
  const dateParsed = new Date(date);
  return `${months[dateParsed.getMonth()]} ${dateParsed.getFullYear()}`;
};

