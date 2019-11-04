import React, {Component} from 'react';
import {View, Image, ImageBackground, StyleSheet, Text} from 'react-native';

export default class Inicializacao extends Component {
    render(){
        return(
            <ImageBackground style={styles.bg} source={require('../imgs/bg.png')}>
                <View style={styles.inicializacao}>
                    <View style={styles.confidence}>
                        <Text style={styles.texto}> Confidence </Text>
                    </View>
                    <View style={styles.logo}>
                        <Image source={require('../imgs/logo.png')} style={styles.imagem}/>
                    </View>
                    <View style={styles.frase}>
                        <Text style={styles.txt}>Juntos somos mais fortes</Text>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1, 
        width: null
    },
    inicializacao: {
        flex:1, 
        padding: 15
    },
    logo: {
        flex:5,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    imagem: {
        height: 300,
        width: 250
    },
    confidence: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    texto: {
        fontSize: 40, 
        color:'#fff',
        fontFamily: 'MalykaDemo'
    },
    frase: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'MV Boli'
    },
})