import React, { Component } from 'react';
import { 
    View, 
    TextInput, 
    Text, 
    Image,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { 
    modificaSenha,
    modificaUsuario, 
    cadastraUsuario,
    modificaAvatar
} from '../actions/AutenticacaoActions';

class formCadastro extends Component {

    _cadastraUsuario() {
        const { usuario, senha } = this.props;
        const avatar = this.avatar;
        this.props.cadastraUsuario({ usuario, senha, avatar });
    }
    
    renderBtnCadastrar(){
        if(this.props.loading_cadastro){
            return (
                <ActivityIndicator size="large" />
            );
        }
        return (
            <TouchableOpacity style={styles.btnCadastrar} onPress={() => this._cadastraUsuario()}>
                <Text style={styles.btnTexto}>CADASTRAR</Text>
            </TouchableOpacity>
        );
    }

    renderImagem(){
        switch(this.props.imagem){
            case 'leao':
                this.avatar = 'https://firebasestorage.googleapis.com/v0/b/confidence-6f766.appspot.com/o/leao.png?alt=media&token=90960b68-c791-4803-b7df-80d4dee5727a';
                return (
                    <TouchableHighlight underlayColor='transparent' onPress={() => Actions.listaAvatares()} >
                        <Image style={styles.imagem} source={require('../imgs/avatares/leao.png')} resizeMode='contain' />
                    </TouchableHighlight>
                );
            case 'macaco':
                this.avatar = 'https://firebasestorage.googleapis.com/v0/b/confidence-6f766.appspot.com/o/macaco.png?alt=media&token=f744cac4-6ac1-42a4-837a-c163c2b1d3eb';
                return (
                    <TouchableHighlight underlayColor='transparent' onPress={() => Actions.listaAvatares()} >
                        <Image style={styles.imagem} source={require('../imgs/avatares/macaco.png')} resizeMode='contain' />
                    </TouchableHighlight>
                );
            case 'porco':
                this.avatar = 'https://firebasestorage.googleapis.com/v0/b/confidence-6f766.appspot.com/o/porco.png?alt=media&token=2e94a169-9deb-4927-bc5f-9b86f4a54fcb';
                return (
                    <TouchableHighlight underlayColor='transparent' onPress={() => Actions.listaAvatares()} >
                        <Image style={styles.imagem} source={require('../imgs/avatares/porco.png')} resizeMode='contain' />
                    </TouchableHighlight>
                );
            default:
                return(
                    <TouchableHighlight underlayColor='transparent' onPress={() => Actions.listaAvatares()} >
                        <Image style={styles.imagem} source={require('../imgs/avatares/nulo.png')} resizeMode='contain' />
                    </TouchableHighlight>
                );
        }
    }

    render() {
        return (
            <ImageBackground style={styles.bg} source={require('../imgs/bg.png')}>
                <View style={styles.formCadastro}>
                    <View style={styles.titulo}>
                        <Text style={styles.txtTitulo}>Cadastro </Text>
                    </View>
                    <View style={styles.divImagem}>
                        {this.renderImagem()}
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
                        <Text style={styles.erro}>{this.props.erroCadastro}</Text>
                    </View>
                    <View style={styles.cadastrar}>
                        {this.renderBtnCadastrar()}
                    </View>
                    <View style={styles.entrar}>
                        <TouchableHighlight onPress={() => Actions.formLogin() } underlayColor='transparent'>
                            <Text style={styles.btnEntrar}>Já é cadastrado? Faça o login</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => { 
    
    return (
        {
            usuario: state.AutenticacaoReducer.usuario,
            senha: state.AutenticacaoReducer.senha,
            avatar: state.AutenticacaoReducer.avatar,
            erroCadastro: state.AutenticacaoReducer.erroCadastro,
            loading_cadastro: state.AutenticacaoReducer.loading_cadastro
        }
    );
}

export default connect(
    mapStateToProps, 
    {
        modificaSenha, 
        modificaUsuario,
        cadastraUsuario,
        modificaAvatar
    }
)(formCadastro);

const styles = StyleSheet.create({
    bg: {
        flex: 1, 
        width: null
    },
    formCadastro: { 
        flex: 1, 
        padding: 10
    },
    titulo:{
        flex: 1,
        alignItems: 'center'
    },
    txtTitulo: {
        fontFamily: 'MalykaDemo',
        fontSize: 50,
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
    cadastrar:{
        flex: 1,
        alignItems: 'center',
        margin: 10
    },
    btnCadastrar: {
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
    entrar: {
        flex: 1, 
        alignItems: 'center'
    },
    btnEntrar: {
        fontSize: 16, 
        color: '#fff'
    },
    erro: {
        color: '#ff0000',
        fontSize: 18
    },
    imagem: {
        width: 150,
        height: 150
    },
    divImagem: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40
    }
});
