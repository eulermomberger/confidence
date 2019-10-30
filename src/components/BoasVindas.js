import React, {Component} from 'react';
import { 
    View, 
    TouchableOpacity, 
    Image, 
    ImageBackground,
    Text,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { autenticarUsuario, modificaAvatar } from '../actions/AutenticacaoActions';

class BoasVindas extends Component {
    _autenticarUsuario() {
        const { usuario, senha } = this.props;
        this.props.modificaAvatar(usuario);
        this.props.autenticarUsuario({ usuario, senha });
    }

    renderBtnEntrar(){
        if(this.props.loading_login){
            return (
                <ActivityIndicator size="large" />
            );
        }
        return (
            <TouchableOpacity style={styles.btnLogin} onPress={() => this._autenticarUsuario()}>
                <Text style={styles.btnTexto}>ENTRAR</Text>
            </TouchableOpacity>
        );
    }

    render(){
        return (
            <ImageBackground style={styles.bg} source={require('../imgs/bg.png')}>
                <View style={styles.boasVindas}>
                    <View style={styles.frase}>
                        <Text style={styles.texto}> Bem-Vindo </Text>
                    </View>
                    <View style={styles.logo}>
                        <Image style={styles.imagem} source={require('../imgs/logo.png')} />
                    </View>
                    <View style={styles.login}>
                        {this.renderBtnEntrar()}
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
        loading_login: state.AutenticacaoReducer.loading_login
    }
)

export default connect(mapStateToProps, { 
    autenticarUsuario,
    modificaAvatar
})(BoasVindas);

const styles = StyleSheet.create({
    bg: {
        flex: 1, 
        width: null
    },
    boasVindas: {
        flex:1, 
        padding: 15
    },
    logo: {
        flex:2, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    imagem: {
        height: 300,
        width: 250
    },
    frase: {
        flex: 1,
        alignItems: 'center'
    },
    texto: {
        fontSize: 40, 
        color:'#fff',
        fontFamily: 'MalykaDemo'
    },
    login:{
        flex: 1,
        alignItems: 'center'
    },
    btnLogin: {
        backgroundColor: '#FD7757',
        width: 300,
        borderRadius: 10,
        marginTop: 60
    },
    btnTexto: {
        color: '#fff',
        fontSize: 20,
        paddingVertical: 5,
        textAlign: 'center'
    },
});
