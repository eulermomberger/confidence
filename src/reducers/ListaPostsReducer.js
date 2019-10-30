import { LISTA_POSTS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LISTA_POSTS:
            return action.payload;
        default:
            return state;
    }
}