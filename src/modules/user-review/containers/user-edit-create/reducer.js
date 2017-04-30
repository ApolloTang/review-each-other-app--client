import _ from 'lodash';
import c from '../../common/actions-names';
import {nameSpace} from '../../config';
import {combineReducers} from 'redux';

const initialState = {
    draft: null,
    isLoading: false,
    error: void 0,
    isOpen: false,
    isDirty: false,
    showErrors : false,
    draftErrors : []
}

const user_EditOrCreate = (state = {...initialState}, action) => {
  switch (action.type) {
    case `@@router/LOCATION_CHANGE` : {
      return {...state}
    }
    case c[`${nameSpace}__user_editOrCreate_draft_open`]: {
      return {
        ...state,
        isOpen: true,
        isLoading: true
      };
    }
    case c[`${nameSpace}__user_editOrCreate_draft_initDefault`]: {
      const draft_prev = _.get(state, `draft`, null);
      let draft_next = _.cloneDeep(draft_prev);
      if ( draft_prev === null ) {
          // Only inititialize draft with default values if there isn't already one.
          // This is to prevent router reruning trigger initialization of form.
          draft_next = _.get(action, 'payload.draft', {});
      }

      // const meta={}; // <-- addition info for validation
      // const draftErrors = validateDraft(draft_next, meta); // @TODO validation not impliment
      const draftErrors = [];

      return {
        ...state,
        draft: draft_next,
        isLoading: false,
        draftErrors,
      };
    }
    case c[`${nameSpace}__user_editOrCreate_draft_initDefault_fail`]: {
      const error = _.get(action, 'payload.error', {});
      return {
        ...state,
        error,
        isLoading: false,
      };
    }
    case c[`${nameSpace}__user_editOrCreate_draft_changed`]: {
      const data = _.get(action, `payload.data`);
      let draft_prev;
      let draft_next;
      if (Object.prototype.toString.call(data) === '[object Array]') {
        // multi fields @TODO multi field update action not implimented
      } else {
        draft_prev =  _.cloneDeep(state.draft);
        draft_next =  {
          ...draft_prev,
          ...data
        };
      }

      // const meta={}; // <-- addition info for validation
      // const draftErrors = validateDraft(draft_next, meta); // @TODO validation not impliment
      const draftErrors = [];

      return {
        ...state,
        draft: draft_next,
        isDirty: true,
        draftErrors,
      };
    }
    case c[`${nameSpace}__user_editOrCreate_draft_saveInitiated`]: {
      return {
        ...state,
        showErrors: true
      };
    }
    case c[`${nameSpace}__user_editOrCreate_draft_submit_start`]: {
      return {
        ...state,
        isLoading: true
      };
    }
    case c[`${nameSpace}__user_editOrCreate_draft_submit_success`]: {
      return {
        ...state,
        isLoading: false
      };
    }
    case c[`${nameSpace}__user_editOrCreate_draft_submit_fail`]: {
      const error = _.get(action, 'payload.error', void 0);
      return {
        ...state,
        isLoading: false,
        error
      };
    }
    case c[`${nameSpace}__user_editOrCreate_draft_close`]: {
      return {
        ...initialState,
      };
    }
    default:
      return {...state};
  }
};

export default user_EditOrCreate;