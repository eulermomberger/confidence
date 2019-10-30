import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import Feed from './components/Feed';
import Perfil from './components/Perfil';
import Notificacoes from './components/Notificacoes';
import BoasVindas from './components/BoasVindas';
import Psicologo from './components/Psicologo';
import Chat from './components/Chat';
import Conversas from './components/Conversas';
import AdicionaPost from './components/AdicionaPost';
import ListaAvatares from './components/ListaAvatares';

const Rotas = () => (
  <Router>
    <Scene key='root'>
      <Scene key='formLogin' component={FormLogin} hideNavBar/>
      <Scene key='formCadastro' component={FormCadastro} hideNavBar/>
      <Scene key='listaAvatares'component={ListaAvatares} hideNavBar />
      <Scene key='feed' component={Feed} hideNavBar />
      <Scene key='boasVindas' component={BoasVindas} hideNavBar />
      <Scene key='perfil' component={Perfil} hideNavBar />
      <Scene key='notificacoes' component={Notificacoes} hideNavBar />
      <Scene key='psicologo' component={Psicologo} hideNavBar />
      <Scene key='chat' component={Chat} hideNavBar />
      <Scene key='conversas' component={Conversas} hideNavBar />
      <Scene key='adicionaPost' component={AdicionaPost} hideNavBar />
    </Scene>
  </Router>
);

export default Rotas;
