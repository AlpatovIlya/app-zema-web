import {Education} from '../Education';
import {Gender} from '../Gender';

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  verified: boolean;
  birthCity?: string;
  currentCity?: string;
  birthCityId?: number;
  currentCityId?: number;
  education?: Education;

  helpNeeded?: string;
  helpOffer?: string;
  areasOfInterest?: string;
  career?: string;
  age?: number;
  surname?: string;
  patronymic?: string;
  avatar?: string;
  gender?: Gender;
}
