import React, { Component } from 'react';
import { 
    View, 
    TextInput, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import { modificaPost, publicar } from '../actions/AutenticacaoActions';

class AdicionaPost extends Component {

    render() {
        return (
            <View style={styles.div} >
                <View style={styles.topo}>
                    <TouchableHighlight underlayColor='transparent' onPress={() => Actions.feed()}>
                        <Image style={styles.topoImg} source={require('../imgs/sair.png')} />
                    </TouchableHighlight>

                    <TouchableOpacity onPress={ () => {
                        this.props.publicar(this.props.post, this.props.avatar);
                        Actions.feed()
                        }} 
                        style={styles.btnPublicar}>
                        <Text style={styles.topoTxt}>PUBLICAR</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.divInput}>
                    <TextInput
                        style={styles.input} 
                        placeholder='O que você tem a falar?'
                        underlineColorAndroid='transparent'
                        autoFocus
                        multiline
                        value={this.props.post}
                        onChangeText={texto => this.props.modificaPost(texto)}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return ({
        post: state.AutenticacaoReducer.post,
        avatar: state.AutenticacaoReducer.avatar
    });
}

export default connect(mapStateToProps, {modificaPost, publicar } )(AdicionaPost)

const styles = StyleSheet.create({
    div: {
        flex: 1
    },
    input: {
        fontSize: 18,
        height: '100%',
        textAlignVertical: 'top'
    },
    btnPublicar: {
        backgroundColor: '#159898',
        width: 100,
        height: 30,
        borderRadius: 10,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    topo: {
        height: 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#106161',
        paddingHorizontal: 20
    },
    divInput: {
        flex: 5
    },
    topoImg: {
        height: 20,
        width: 20
    },
    topoTxt: {
        fontSize: 18,
        color: '#fff'
    }
});
