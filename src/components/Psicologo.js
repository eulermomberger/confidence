import React, {Component} from 'react';
import {connect} from 'react-redux';

import Chat from './Chat';
import Conversas from './Conversas';

class Psicologo extends Component {
    render(){
        if(this.props.usuario!='psicologo'){
            return (
                <Chat />
            )
        } else {
            return (
                <Conversas />
            )
        }
    }
}

const mapStateToProps = state => {
    return ({ usuario: state.AutenticacaoReducer.usuario });
}

export default connect(mapStateToProps, {})(Psicologo)