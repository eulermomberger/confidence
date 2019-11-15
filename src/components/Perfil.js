import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    YellowBox,
    FlatList,
    Image,
    Alert
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import Menu, { MenuItem } from 'react-native-material-menu';

import Topo from './Topo.js';
import BarraNavegacao from './BarraNavegacao';
import { postsFetch, logoutUsuario } from '../actions/AutenticacaoActions';

const imagem = require('../imgs/perfil.png');

class Perfil extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            data: null
        };

        this.props.postsFetch();

        YellowBox.ignoreWarnings(['Setting a timer']);
        const _console = _.clone(console);
        console.warn = message => {
            if (message.indexOf('Setting a timer') <= -1) {
                _console.warn(message);
            }
        };
    }

    shouldComponentUpdate(prevProps) {
		if(this.state.data !== prevProps.posts){
			this.setState({ data: prevProps.posts });
			return this.state.data !== prevProps.posts;
		}
		else
			return false;
    }
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    showMenu = () => {
        this._menu.show();
    };

    sair = () => {
        this._menu.hide();
        Alert.alert ( 
            'Sair do Confidence?', 
            'Você poderá acessar a sua conta novamente a qualquer momento!', 
            [ 
              {text: 'SAIR', onPress: () => this.props.logoutUsuario()}, 
              {text:' CANCELAR '}, 
            ] 
        ); 
    }

    render() {
        let array = _.orderBy(this.state.data, ['hora'], ['desc']);
        return (
            <View style={styles.perfil}>
                <View>
                    <Topo texto={'Perfil '} imagem={imagem} />
                </View>
                <View style={styles.informacoes}>
                    <View style={styles.usuario}>
                        <Image source={{uri: this.props.avatar}} style={styles.imgInformacoes}/>
                        {console.log(this.props.usuario)}
                        <Text style={styles.txtInformacoes}>{this.props.usuario}</Text>
                    </View>
                    <View style={styles.menu}>
                        <Menu
                            ref={this.setMenuRef}
                            button={<Text style={styles.opcoes} onPress={this.showMenu}>˙˙˙</Text>}
                        >
                            <MenuItem onPress={this.sair}>Sair</MenuItem>
                        </Menu>
                    </View>
                </View>
                <View style={styles.publicacoes}>
                    <FlatList
                        data={array}
                        keyExtractor={item => item.uid}
                        renderItem={({item}) => {
                            if(item.usuario === this.props.usuario) {
                                return (
                                    <View style={styles.lista}>
                                        <View style={styles.viewAvatar}>
										    <Image source={{uri: item.avatar}} style={styles.avatar} />
									    </View>
									    <View style={styles.viewTexto}>
    										<Text style={styles.nome}>{item.usuario}</Text>
	    									<Text style={styles.post}>{item.post}</Text>
		    							</View>
                                    </View>
                                )
                            }
                            else{
                                return false;
                            }
                        }}
                    />
                </View>
                <View>
                    <BarraNavegacao />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const posts = _.map(state.ListaPostsReducer, (val, uid) => {
        return {...val, uid};
    });

    return ({
        posts,
        avatar: state.AutenticacaoReducer.avatar,
        usuario: state.AutenticacaoReducer.usuario
    });
}

export default connect(mapStateToProps, { postsFetch, logoutUsuario })(Perfil)

const styles = StyleSheet.create({
    perfil: {
        flex: 1
    },
    lista: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#CCC',
		flexDirection: 'row'
    },
    nome: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    post: {
        fontSize: 14
    },
    publicacoes: {
        flex: 5
    },
    viewAvatar: {
		paddingRight: 10
	},
	viewTexto: {
		paddingRight: 30
	},
	avatar: {
		height:40, 
		width:40
    },
    informacoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderColor: '#CCC',
    },
    txtInformacoes: {
        fontWeight: 'bold',
        paddingHorizontal: 15,
        fontSize: 20
    },
    imgInformacoes: {
        height: 70,
        width: 70
    },
    opcoes: {
        fontSize: 24
    },
    usuario: {
        flexDirection: 'row'
    }
});
