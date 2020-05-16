import {combineReducers} from 'redux';
// we import notes because it was exported by default
// so i can name it what i want with no issue
import notes from './noteReducer';
const rootReducer = combineReducers({
  notes,
});
export default rootReducer;
