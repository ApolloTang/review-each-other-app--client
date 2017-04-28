import _ from 'lodash';
import c from '../../common/actions-names';
import {nameSpace} from '../../config';
import {combineReducers} from 'redux';

const initialState = {
  isLoading: true,
  id_selectedUser: null,
  httpError: null
}

const userCatelog = (state = {...initialState}, action) => {
  switch (action.type) {
    case `@@router/LOCATION_CHANGE` : {
      return {...state}
    }
    case c[`${nameSpace}__userCatelog_init`]: {
      return { ...state, }
      }
    case c[`${nameSpace}__userCatelog_fetch_begin`]: {
      const state_prev = {...state};
      const state_next = {...state};
      return state_next;
    }
    case c[`${nameSpace}__userCatelog_fetch_success`]: {
      const state_prev = {...state};
      const state_next = {
        ...state,
        isLoading: false
      };
      return state_next;
    }
    case c[`${nameSpace}__userCatelog_fetch_fail`] : {
      const payload = action.payload;
      const state_prev = {...state};
      const state_next = {
        ...state,
        isLoading: false,
        httpError: payload.error
      };
      return state_next;
    }
    case c[`${nameSpace}__userCatelog_selectUser`] : {
      const payload = action.payload;
      const state_prev = {...state};
      const state_next = {
        ...state,
        id_selectedUser: payload.userId
      };
      return state_next;
    }
    default: {
      return state
    }
  }
}

export default userCatelog;
