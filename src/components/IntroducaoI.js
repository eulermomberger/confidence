import React, {Component} from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';

export default class IntroducaoI extends Component {
    render(){
        return(
            <ImageBackground style={styles.bg} source={require('../imgs/bgI.png')}>
                <View style={styles.introducaoI}>
                    <View style={styles.confidence}>
                        <Text style={styles.texto}> Você sabe o que é um abuso? </Text>
                    </View>
                    <View style={styles.frase}>
                        <Text style={styles.txtBold}>Não sabe? Nós explicamos!</Text>
                        <Text style={styles.txt}>
                            Abuso é um fenômeno universal que atinge à todos independentemente de idade, pode ser considerado abuso qualquer ato ou conduta baseado no gênero, que cause dano ou sofrimento físico, sexual ou psicológico à vítima.
                        </Text>
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
    introducaoI: {
        flex:1, 
        padding: 15
    },
    confidence: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    texto: {
        fontSize: 20, 
        color:'#fff',
        textAlign: 'center',
        fontFamily: 'MV Boli'
    },
    frase: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 30
    },
    txtBold: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    }
})