import {
    MODIFICA_SENHA, 
    MODIFICA_USUARIO, 
    CADASTRO_USUARIO_SUCESSO, 
    CADASTRO_USUARIO_ERRO, 
    LOGIN_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO,
    MODIFICA_POST,
    PUBLICAR_SUCESSO,
    MODIFICA_AVATAR,
    LOGOUT_USUARIO,
    MODIFICA_MENSAGEM,
    ENVIA_MENSAGEM_SUCESSO
} from '../actions/types';

const INITIAL_STATE = {
    usuario: '',
    senha: '',
    erroCadastro: '',
    erroLogin: '',
    loading_login: false,
    loading_cadastro: false,
    post: '',
    avatar: null,
    mensagem: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case MODIFICA_SENHA:
            return { ...state, senha: action.payload }
        case MODIFICA_USUARIO:
            return { ...state, usuario: action.payload }
        case CADASTRO_USUARIO_ERRO:
            return { ...state, erroCadastro: action.payload, loading_cadastro: false }
        case CADASTRO_USUARIO_SUCESSO:
            return { ...state, loading_cadastro: false }
        case LOGIN_USUARIO_ERRO:
            return { ...state, erroLogin: action.payload, loading_login: false}
        case LOGIN_EM_ANDAMENTO:
            return { ...state, loading_login: true }
        case CADASTRO_EM_ANDAMENTO:
            return { ...state, loading_cadastro: true }
        case MODIFICA_POST:
            return {...state, post: action.payload}
        case PUBLICAR_SUCESSO:
            return {...state, post: ''}
        case MODIFICA_AVATAR:
            return { ...state, avatar: action.payload}
        case LOGOUT_USUARIO:
            return { ...state, ...INITIAL_STATE }
        case MODIFICA_MENSAGEM:
            return {...state, mensagem: action.payload}
        case ENVIA_MENSAGEM_SUCESSO:
            return {...state, mensagem: '' }
        default:
            return state;
    }
}
