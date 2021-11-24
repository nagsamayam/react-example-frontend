
import {createStore} from 'redux';
import setUserReducer from './reducers/setUserReducer';

const store = createStore(setUserReducer)

export default store

