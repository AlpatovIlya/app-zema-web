/* eslint-disable require-jsdoc */
import {ApiUser} from '../types/api';
import {Education} from '../types/Education';
import {Gender} from '../types/Gender';
import {IUser} from '../types/interfaces';

class User implements IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  verified: boolean;
  birthCityId?: number;
  birthCity?: string;
  currentCity?: string;
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

  constructor(data: IUser) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.verified = data.verified;
    this.birthCity = data.birthCity;
    this.currentCity = data.currentCity;
    this.birthCityId = data.birthCityId;
    this.currentCityId = data.currentCityId;
    this.education = data.education;
    this.helpNeeded = data.helpNeeded;
    this.helpOffer = data.helpOffer;
    this.areasOfInterest = data.areasOfInterest;
    this.career = data.career;
    this.age = data.age;
    this.surname = data.surname;
    this.patronymic = data.patronymic;
    this.avatar = data.avatar;
    this.gender = data.gender;
  }

  static createUserByApi(data: ApiUser) {
    return new User({
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      verified: !!data.verified,
      birthCityId: data.birth_city_id,
      currentCityId: data.current_city_id,
      education: data.education,
      helpNeeded: data.help_needed,
      helpOffer: data.help_offer,
      areasOfInterest: data.areas_of_interest,
      career: data.career,
      age: data.id,
      surname: data.surname,
      patronymic: data.patronymic,
      avatar: data.avatar,
      gender: data.gender,
    });
  }

  get fullName() {
    return `${this.name} ${this.surname || ''}`;
  }
}

export default User;
