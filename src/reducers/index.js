import { combineReducers } from 'redux';
import AutenticacaoReducer from './AutenticacaoReducer';
import ListaPostsReducer from './ListaPostsReducer';
import ListaConversaReducer from './ListaConversaReducer';
import ListaConversasReducer from './ListaConversasReducer';

export default combineReducers({
    AutenticacaoReducer,
    ListaPostsReducer,
    ListaConversaReducer,
    ListaConversasReducer
});
