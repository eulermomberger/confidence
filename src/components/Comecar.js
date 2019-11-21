import React, {Component} from 'react';
import {View, ImageBackground, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Comecar extends Component {
    render(){
        return(
            <ImageBackground style={styles.bg} source={require('../imgs/bgII.png')}>
                <View style={styles.comecar}>
                    <View style={styles.confidence}>
                        <Text style={styles.texto}> Confidence </Text>
                    </View>
                    <View style={styles.frase}>
                        <Text style={styles.txt}>Aplicativo de autoajuda para pessoas vítimas de abuso</Text>
                    </View>
                    <View style={styles.btn}>
                        <TouchableOpacity style={styles.btnComecar} onPress={Actions.formLogin.bind(this)}>
                            <Text style={styles.btnTexto}>COMEÇAR</Text>
                        </TouchableOpacity>
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
    comecar: {
        flex:1, 
        padding: 15
    },
    texto: {
        fontSize: 40, 
        color:'#fff',
        fontFamily: 'MalykaDemo'
    },
    confidence: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    frase: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'MV Boli'
    },
    btn: {
        flex: 1,
        alignItems: 'center'
    },
    btnComecar: {
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
})