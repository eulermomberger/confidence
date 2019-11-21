import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import b64 from 'base-64';
import AsyncStorage from '@react-native-community/async-storage';

import {
    MODIFICA_SENHA, 
    MODIFICA_USUARIO, 
    CADASTRO_USUARIO_SUCESSO, 
    CADASTRO_USUARIO_ERRO, 
    LOGIN_USUARIO_SUCESSO, 
    LOGIN_USUARIO_ERRO,
    LOGIN_EM_ANDAMENTO,
    CADASTRO_EM_ANDAMENTO,
    MODIFICA_POST,
    LISTA_POSTS,
    PUBLICAR_SUCESSO,
    MODIFICA_AVATAR,
    LOGOUT_USUARIO,
    ENVIA_MENSAGEM_SUCESSO,
    LISTA_CONVERSA,
    MODIFICA_MENSAGEM,
    LISTA_CONVERSAS,
    EXCLUIR_POST,
    DENUNCIAR,
    LIKE
} from './types';

export const modificaSenha = texto => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaUsuario = texto => {
    return {
        type: MODIFICA_USUARIO,
        payload: texto
    }
}

export const modificaAvatar = usuario => {
    return dispatch => {
        firebase.database().ref(`/usuarios/${usuario}`)
            .once("value")
            .then(snapshot => {
                let avatar = _.first(_.values(snapshot.val())).avatar;
                dispatch({ type: MODIFICA_AVATAR, payload: avatar});
            })
    }
}

export const cadastraUsuario = ({ usuario, senha, avatar }) => {
    return dispatch => {
        dispatch({ type: CADASTRO_EM_ANDAMENTO });
        const email = `${usuario}@confidence.com`;
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                if(usuario!='psicologo'){
                    firebase.database().ref(`/usuarios/${usuario}`)
                        .push({usuario, senha, email, avatar})
                        .then(value => cadastroUsuarioSucesso(dispatch));
                } else {
                    firebase.database().ref(`/usuarios/${usuario}`)
                        .push({usuario, senha, email })
                        .then(value => cadastroUsuarioSucesso(dispatch));
                }
            })
            .catch(erro => cadastroUsuarioErro(erro, dispatch));
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch (
        {
            type: CADASTRO_USUARIO_SUCESSO
        }
    );
    Actions.boasVindas();
}

const cadastroUsuarioErro = (erro, dispatch) => {
    let mensagemErro = "";
    switch(erro.code){
        case "auth/weak-password" : 
            mensagemErro = "Senha muito fraca!";
            break;
        case "auth/email-already-in-use" :
            mensagemErro = "Usuário já existente!";
            break;
    }
    dispatch ({
        type: CADASTRO_USUARIO_ERRO,
        payload: mensagemErro
    });
}    

export const autenticarUsuario = ({ usuario, senha }) => {
    this.usuario = usuario;
    this.senha = senha;
    return dispatch => {
        dispatch({ type: LOGIN_EM_ANDAMENTO });
        firebase.auth().signInWithEmailAndPassword(`${usuario}@confidence.com`, senha)
            .then(value => loginUsusarioSucesso(dispatch))
            .catch(erro => loginUsusarioErro(erro, dispatch));
    }
}

const loginUsusarioSucesso = (dispatch) => {
    dispatch (
        {
            type: LOGIN_USUARIO_SUCESSO
        }
    );
    Actions.feed();
}

const loginUsusarioErro = (erro, dispatch) => {
    let mensagemErro = "";
    switch(erro.code){
        case "auth/wrong-password": 
            mensagemErro="Senha inválida!"; 
            break;
        case "auth/user-not-found": 
            mensagemErro="Usuário inválido!";
            break;
        case "auth/user-disabled":
            mensagemErro = "Usuário desabilitado!";
            break;
    }
    dispatch ({
        type: LOGIN_USUARIO_ERRO,
        payload: mensagemErro
    });
}

export const modificaPost = texto => {
    return ({
        type: MODIFICA_POST,
        payload: texto
    });
}

export const publicar = (post, avatar) => {
    let timestamp = new Date().getTime();
    return dispatch => {
        firebase.database().ref(`/posts`)
            .push({ post, usuario: this.usuario, avatar, hora: timestamp, likes: 0, denuncia: 0, denunciaUser: [""] })
            .then(() => dispatch ( { type: PUBLICAR_SUCESSO} ) )
    }
}

export const postsFetch = () => {
    return dispatch => {
        firebase.database().ref('/posts')
            .on("value", snapshot => {
                snapshot.forEach(element => {
                    if(element.child("denuncia").val() != null) {
                        if(element.child("denuncia").val() == 3){
                            element.ref.remove()
                        }
                    }
                })
                dispatch({ type: LISTA_POSTS, payload: snapshot.val() })
            })
    }
}

export const logoutUsuario = () => {
    return dispatch => {
        firebase.auth().signOut();
        AsyncStorage.setItem('@usuario', null);
        AsyncStorage.setItem('@senha', null);
        dispatch({ type: LOGOUT_USUARIO });
        Actions.formLogin();
    }
}

export const modificaMensagem = texto => {
    return ({
        type: MODIFICA_MENSAGEM,
        payload: texto
    });
}

export const enviarMensagem = (mensagem, usuario, usuarioNome) => {
    const id = b64.encode(usuario);
    let avatar = "";
    if(usuario!="psicologo") {
        return dispatch => {
            firebase.database().ref(`/mensagens/${usuario}`)
                .push({ mensagem, tipo: 'e' })
                .then(() => {
                    firebase.database().ref(`/mensagens/psicologo/${usuario}`)
                        .push({ mensagem, tipo: 'r'})
                        .then(() => dispatch ( { type: ENVIA_MENSAGEM_SUCESSO } ) )
                })
                .then(() => {//armazenar o cabeçalho de conversa para o psicologo
                    firebase.database().ref(`/usuarios/${usuario}`)
                        .on("value", snapshot => {
                            avatar = _.first(_.values(snapshot.val())).avatar;
                            firebase.database().ref(`/conversas/${id}`)
                                .set({ nome: usuario, avatar })
                        })
                            
                })
        }
    } else {
        return dispatch => {
            firebase.database().ref(`/mensagens/${usuario}/${usuarioNome}`)
                .push({ mensagem, tipo: 'e' })
                .then(() => {
                    firebase.database().ref(`/mensagens/${usuarioNome}`)
                        .push({ mensagem, tipo: 'r'})
                        .then(() => dispatch ( { type: ENVIA_MENSAGEM_SUCESSO } ) )
                })
        }
    }
}

export const conversaFetch = (usuario, vitima) => {
    if(usuario!="psicologo"){
        return dispatch => {
            firebase.database().ref(`/mensagens/${usuario}`)
                .on("value", snapshot => {
                    dispatch({ type: LISTA_CONVERSA, payload: snapshot.val() })
                })
        }
    } else {
        return dispatch => {
            firebase.database().ref(`/mensagens/psicologo/${vitima}`)
                .on("value", snapshot => {
                    dispatch({ type: LISTA_CONVERSA, payload: snapshot.val() })
                })
        }
    }
}

export const conversasFetch = () => {
    return dispatch => {
        firebase.database().ref('/conversas')
        .on("value", snapshot => {
            dispatch({ type: LISTA_CONVERSAS, payload: snapshot.val() })
        })
    }
}

export const like = uid => {
    let like = 0;
    return dispatch => {
        let ref = firebase.database().ref(`/posts/${uid}`)
        if(ref != null) {
            ref.on("value", snapshot => {
                if(snapshot.val() != null)
                    like = snapshot.val().likes;
            })
            ref.update({likes: ++like})
        }
        dispatch({ type: LIKE })
    }
}

export const excluir = uid => {
    return dispatch => {
        firebase.database().ref(`/posts/${uid}`).remove();
        dispatch({ type: EXCLUIR_POST})
    }
}

export const denunciar = (uid, usuario) => {
    let denuncia = 0;
    let usuarios = null;
    return dispatch => {
        let ref = firebase.database().ref(`/posts/${uid}`)
        if(ref != null) {
            ref.on("value", snapshot => {
                if(snapshot.val() != null) {
                    denuncia = snapshot.val().denuncia;
                    usuarios = snapshot.val().denunciaUser;
                }
            })
            if(usuarios != null)
                ref.update({denunciaUser: [...usuarios,usuario]})
            if(denuncia != null)
                ref.update({denuncia: ++denuncia})
        }
        dispatch({type: DENUNCIAR})
    }
}
