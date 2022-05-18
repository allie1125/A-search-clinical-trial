import { atom } from 'recoil';
import { IItem } from 'types/clinicalTrial.d';

export const searchedTrialState = atom<IItem[]>({
  key: '#searchedTrial',
  default: [],
});

export const searchedWordState = atom<any>({
  key: '#searchedWord',
  default: '',
});

export const keyDownState = atom<number>({
  key: '#keydown',
  default: 0,
});
