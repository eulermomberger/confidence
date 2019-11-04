import React, {Component} from 'react';
import {View, ImageBackground, StyleSheet, Text} from 'react-native';

export default class IntroducaoII extends Component {
    render(){
        return(
            <ImageBackground style={styles.bg} source={require('../imgs/bgI.png')}>
                <View style={styles.introducaoII}>
                    <View style={styles.confidence}>
                        <Text style={styles.texto}> Procure por ajuda! </Text>
                    </View>
                    <View style={styles.frase}>
                        <Text style={styles.txtBold}>Guardar o acontecimento para si, não é uma boa escolha!</Text>
                        <Text style={styles.txt}>
                            Buscar a ajuda de profissionais, como psicólogos, é uma ótima opção para as vítimas. Uma vez, que esses, por saberem lidar com situações do gênero podem ajudar a vítima a criar confiança nela mesma e, com o tempo, coragem de denunciar o abuso sofrido.
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
    introducaoII: {
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