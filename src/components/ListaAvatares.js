import React, {Component} from 'react';
import {View, Image, ImageBackground, TouchableHighlight, StyleSheet, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class listaAvatares extends Component {
    render(){
        return (
            <ImageBackground style={styles.bg} source={require('../imgs/bgAvatares.png')}>
                <View style={styles.titulo}>
                    <Text style={styles.txt}> Selecione um avatar </Text>
                </View>
                <View style={styles.listaAvatares}>
                    <TouchableHighlight onPress={() => Actions.formCadastro({ imagem: 'leao' }) } underlayColor='transparent'>
                        <Image style={styles.imagens} source={require('../imgs/avatares/leao.png')} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => Actions.formCadastro({ imagem: 'macaco' })} underlayColor='transparent'>
                        <Image style={styles.imagens} source={require('../imgs/avatares/macaco.png')} />
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => Actions.formCadastro({ imagem: 'porco' })} underlayColor='transparent'>
                        <Image style={styles.imagens} source={require('../imgs/avatares/porco.png')} />
                    </TouchableHighlight>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    imagens: {
        width: 100,
        height: 100
    },
    listaAvatares: {
        height: 150,
        padding: 20,
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    bg: {
        flex: 1,
        width: null
    },
    titulo: {
        backgroundColor: '#fafafa',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        fontSize: 18,
        paddingTop: 5,
        fontWeight: 'bold'
    }
});
