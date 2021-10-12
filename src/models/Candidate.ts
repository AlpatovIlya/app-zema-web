/* eslint-disable require-jsdoc */

import User from './User';

class Candidate {
    requestId: number;
    user: User;

    constructor(requestId: number, user: User) {
      this.requestId = requestId;
      this.user = user;
    }
}


export default Candidate;
