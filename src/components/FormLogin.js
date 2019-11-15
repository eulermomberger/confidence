import React, { Component } from 'react';
import { 
    View, 
    TextInput, 
    TouchableOpacity,
    TouchableHighlight, 
    ImageBackground, 
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaUsuario, modificaSenha, autenticarUsuario, modificaAvatar } from '../actions/AutenticacaoActions';
import AsyncStorage from '@react-native-community/async-storage';

class FormLogin extends Component {
    _autenticarUsuario = async () => {
        this.props.modificaAvatar(this.props.usuario);
        this.setUsuario();
        this.setSenha();
        const usuario = await AsyncStorage.getItem('@usuario');
        const senha = await AsyncStorage.getItem('@senha');
        this.props.autenticarUsuario({ usuario, senha });
    }

    setUsuario = async () => {
        try{
            AsyncStorage.setItem('@usuario', this.props.usuario);
        } catch(e){

        }
    }

    setSenha = async () => {
        try{
            AsyncStorage.setItem('@senha', this.props.senha);
        } catch(e){

        }
    }

    renderBtnEntrar(){
        if(this.props.loading_login){
            return (
                <ActivityIndicator size="large" />
            );
        }
        return (
            <TouchableOpacity style={styles.btnEntrar} onPress={() => this._autenticarUsuario() }>
                <Text style={styles.btnTexto}>ENTRAR</Text>
            </TouchableOpacity>
        );
    }
    
    render() {
        return (
            <ImageBackground style={styles.bg} source={require('../imgs/bg.png')}>
                <View style={styles.formLogin}>
                    <View style={styles.titulo}>
                        <Text style={styles.txtTitulo}> Login </Text>
                    </View>
                    <View style={styles.formulario}>
                        <TextInput 
                            value={this.props.usuario}
                            style={styles.camposEntrada}
                            placeholder='Usuário'
                            placeholderTextColor='#4F4F4F'
                            underlineColorAndroid="transparent"
                            onChangeText={texto => this.props.modificaUsuario(texto)} 
                        />
                        <TextInput 
                            secureTextEntry
                            value={this.props.senha}
                            style={styles.camposEntrada} 
                            placeholder='Senha'
                            placeholderTextColor='#4F4F4F'
                            underlineColorAndroid="transparent"
                            onChangeText={texto => this.props.modificaSenha(texto)} 
                        />
                        <Text style={styles.erro}>
                            {this.props.erroLogin}
                        </Text>
                    </View>
                    <View style={styles.entrar}>
                        {this.renderBtnEntrar()}
                    </View>
                    <View style={styles.cadastrar}>
                        <TouchableHighlight onPress={() => Actions.formCadastro() } underlayColor='transparent'>
                            <Text style={styles.btnCadastrar}>Ainda não possui cadastro? Cadastre-se</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        usuario: state.AutenticacaoReducer.usuario,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loading_login: state.AutenticacaoReducer.loading_login
    }
)

export default connect(mapStateToProps, { 
    modificaUsuario, 
    modificaSenha, 
    autenticarUsuario,
    modificaAvatar
})(FormLogin);

const styles = StyleSheet.create({
    bg: {
        flex: 1, 
        width: null
    },
    formLogin: { 
        flex: 1, 
        padding: 10
    },
    titulo:{
        flex: 1,
        alignItems: 'center'
    },
    txtTitulo: {
        fontFamily: 'MalykaDemo',
        fontSize: 60,
        color: '#fff'
    },
    formulario: {
        flex: 4, 
        justifyContent: 'center'
    },
    camposEntrada: {
        fontSize: 20, 
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 5
    },
    entrar:{
        flex: 1,
        alignItems: 'center'
    },
    btnEntrar: {
        backgroundColor: '#FD7757',
        width: 300,
        borderRadius: 10
    },
    btnTexto: {
        color: '#fff',
        fontSize: 20,
        paddingVertical: 5,
        textAlign: 'center'
    },
    cadastrar: {
        flex: 1, 
        alignItems: 'center'
    },
    btnCadastrar: {
        fontSize: 16, 
        color: '#fff'
    },
    erro: { 
        color: '#ff0000', 
        fontSize: 18
    }
});
