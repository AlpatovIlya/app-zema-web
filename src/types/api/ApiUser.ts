/* eslint-disable camelcase */
import {Education} from '../Education';
import {Gender} from '../Gender';

export interface ApiUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  verified: number;
  birth_city_id?: number;
  current_city_id?: number;
  education?: Education;
  help_needed?: string;
  help_offer?: string;
  areas_of_interest?: string;
  career?: string;
  age?: number;
  surname?: string;
  patronymic?: string;
  avatar?: string;
  gender?: Gender;
  deleted_at?: any;
}
