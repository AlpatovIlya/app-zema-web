/* eslint-disable max-len */
import {AxiosResponse} from 'axios';
import {Candidate, User} from '../models';
import {FriendsSearch} from '../types';
import {GetCandidatesType, GetFriendsType} from '../types/api';
import {SearchFriendsType} from '../types/api/FriendsApiType';
import {api} from './_api/api';

const getAll = async (id: number): Promise<User[]> => {
  const res: AxiosResponse<GetFriendsType> = await api.get('/friendship/friends', {
    params: {
      friends_for_user_id: id,
    },
  });
  return res.data.data.users.map((user) => User.createUserByApi(user));
};


const getCandidates = async (id: number): Promise<Candidate[]> => {
  try {
    const res: AxiosResponse<GetCandidatesType> = await api.get(`${id}/friendship/requests`);
    const canidates = res.data.data.friend_requests.map((req) => {
      const user = User.createUserByApi(req.user);
      return new Candidate(req.id, user);
    });
    return canidates;
  } catch (err: any) {
    throw new Error(err.response.data.message || 'Упс... что-то пошло не так');
  }
};

const searchUsersByFilter = async (filter?: FriendsSearch): Promise<User[]> => {
  const res: AxiosResponse<SearchFriendsType> = await api.get('/friendship/friends', {
    params: {
      age_to: filter?.ageTo || '',
      age_from: filter?.ageFrom || '',
      birth_city_id: filter?.birthCityId || '',
      current_city_id: filter?.currentCityId || '',
    },
  });
  const users = res.data.data.users.map((user) => User.createUserByApi(user));
  return users;
};

// Events
const deleteById = async (userId: number, friendId: number) => {
  await api.post(`${userId}/friendship/friends/delete`, {
    deleted_friend_id: friendId,
  });
};

const sendRequestById = async (userId: number, friendId: number) => {
  await api.post(`${userId}/friendship/request`, {
    requested_friend_id: friendId,
  });
};

const applyCandidate = async (candidate: Candidate) => {
  await api.get(`/friendship/requests/${candidate.requestId}/apply`);
};

const rejectCandidate= async (candidate: Candidate) => {
  await api.get(`/friendship/requests/${candidate.requestId}/reject`);
};


const friendServices = (id: number) => ({
  getAll: () => getAll(id),
  getCandidates: () => getCandidates(id),
  delete: (friendId: number) => deleteById(id, friendId),
  sendRequestById: (friendId: number) => sendRequestById(id, friendId),
  applyCandidate,
  rejectCandidate,
  searchUsersByFilter,
});


export default friendServices;
