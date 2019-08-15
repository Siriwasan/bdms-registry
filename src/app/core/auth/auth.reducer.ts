import { AuthActions, LOGIN, LOGOUT } from './auth.actions';
import { User } from './user.model';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;
