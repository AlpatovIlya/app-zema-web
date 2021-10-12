/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {makeAutoObservable} from 'mobx';
import {Candidate, News, User} from '../models';
import {accountServices, friendServices, newsServices} from '../services';
import {FriendsSearch, ProfileType} from '../types';


class AccountStore {
    token: string | null = null;
    user: User | null = null;
    news: News[] = [];
    friends: User[] = [];
    candidates: Candidate[] = [];
    searchFriends: User[] = [];

    error: string = '';
    newsFetchingError: string = '';
    friendsError = '';
    candidatesError = '';
    profileError = '';
    searchFriendError = '';

    isLoading = false;
    newsLoading = false;
    friendsLoading = false;
    profileLoading = false;
    candidatesLoading = false;
    searchFriendLoading = false;


    constructor() {
      makeAutoObservable(this);
    }

    async login(phone: string, password: string ) {
      this.isLoading = true;
      try {
        [this.user, this.token] = await accountServices().signIn(phone, password);
      } catch (e: any) {
        this.error = e.message;
      }
      this.isLoading = false;
    }

    async create(name: string, email: string, phone: string, password: string) {
      this.isLoading = true;
      try {
        [this.user, this.token] = await accountServices().signUp(name, email, phone, password);
      } catch (e: any) {
        this.error = e.message;
      }
      this.isLoading = false;
    }

    async changeProfile(data: ProfileType) {
      if (!this.user) return;
      this.profileLoading = true;
      try {
        this.user = await accountServices().refreshProfile(this.user.id, data);
      } catch (e: any) {
        this.profileError = e.message;
      }
      this.profileLoading = false;
    }
    // News
    async fetchNews() {
      if (!this.user) return;
      this.newsLoading = true;
      try {
        this.news = await newsServices(this.user.id).getUserNews();
      } catch (e: any) {
        this.newsFetchingError = e.message;
      }
      this.newsLoading = false;
    }
    async addNews(files: string[], content: string) {
      if (!this.user) return;
      try {
        newsServices(this.user?.id).add(files, content);
      } catch (e) {
        this.newsFetchingError ='Упс... что-то пошло не так';
      }
    }
    // FRIENDS
    async init() {
      await this.fetchFriends();
      await this.fetchCandidates();
      await this.fetchSearchUsers();

      this.searchFriends = this.searchFriends.filter((user) => {
        if (user.id === this.user?.id) return false;
        else if (this.friends.find((f) => f.id === user.id)) return false;
        else if (this.candidates.find((f) => f.user.id === user.id)) return false;
        return true;
      });
    }
    async fetchFriends() {
      this.friendsLoading = true;
      try {
        if (!this.user) return;
        this.friends = await friendServices(this.user.id).getAll();
      } catch (e: any) {
        this.friendsError = e.message;
      }
      this.friendsLoading = false;
    }

    async fetchCandidates() {
      if (!this.user) return;
      this.candidatesLoading = true;
      try {
        this.candidates = await friendServices(this.user.id).getCandidates();
      } catch (e: any) {
        this.candidatesError = e.message;
      }
      this.candidatesLoading = false;
    }

    async fetchSearchUsers(filter?: FriendsSearch) {
      if (!this.user) return;
      this.searchFriendLoading = true;
      try {
        this.searchFriends = await friendServices(this.user.id).searchUsersByFilter(filter);
      } catch (e: any) {
        this.candidatesError = e.message;
      }
      this.searchFriendLoading = false;
    }
    // friendEvents
    async deleteFriend(id: number) {
      if (!this.user) return;
      try {
        friendServices(this.user.id).delete(id);
        alert('Друг успешно удален');
        this.friends = this.friends.filter((friend) => friend.id != id);
      } catch (e) {}
    }

    async applyCandidate(candidate: Candidate) {
      if (!this.user) return;
      try {
        friendServices(this.user.id).applyCandidate(candidate);
        this.candidates = this.candidates.filter((cand) => cand.requestId !- candidate.requestId);
        this.friends.push(candidate.user);
        alert('Теперь у вас новый друг');
      } catch (e) {}
    }

    async rejectCandidate(candidate: Candidate) {
      if (!this.user) return;
      try {
        friendServices(this.user.id).rejectCandidate(candidate);
        this.candidates = this.candidates.filter((cand) => cand.requestId !- candidate.requestId);
        alert('В заявке в друзья отказанно');
      } catch (e) {}
    }

    async sendRequestFriend(id: number) {
      if (!this.user) return;
      try {
        friendServices(this.user.id).sendRequestById(id);
      } catch (e) {}
    }
    // utils
    signOut() {
      this.user = null;
      this.token = null;
    }
    clearError() {
      this.error = '';
    }
}


const accountStore = new AccountStore();

export default accountStore;
