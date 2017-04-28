import _ from 'lodash';
import store from 'root/store';
import {createHttp} from 'util/rest';
import c from '../../common/actions-names';
import {nameSpace, rootUrl} from '../../config';


const users = {
  getAll() {
    return createHttp
      .get(`${rootUrl}/users`)
      .then(
        users => {
          store.dispatch( {
            type: c[`${nameSpace}__resources_users_update`],
            payload: {users}
          });
          return users;
        }
        /* @TODO handle error */
      );
  },
  getOne(userId) {
    return createHttp
      .get(`${rootUrl}/users/${userId}`)
      .then(
        user => {
          store.dispatch( {
            type: c[`${nameSpace}__resources_users_update`],
            payload: {user}
          });
          return user;
        }
        /* @TODO handle error */
      );
  },
  create() {
    return createHttp
      .post(`${rootUrl}/users`)
      .then(
        newUser => {
          store.dispatch( {
            type: c[`${nameSpace}__resources_users_update`],
            payload: {newUser}
          });
          return newUser;
        }
        /* @TODO handle error */
      )
  }

}


export default users;
