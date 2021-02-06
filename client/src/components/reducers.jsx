import { AUTHENTICATED} from './actions';

const initialState = {
  isLoggedIn: false,
  isStudent: true
};
//const initialState = {
  //data: [...dummydata]
//}
function reducer(state = initialState, action) {
switch(action.type) {
  case AUTHENTICATED:
    return {
      isLoggedIn: action.payload,
    };

  default:
    return state;
  }
}
export default reducer;