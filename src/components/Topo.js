import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';

export default props => (
	<View style={styles.topo}>
		<View style={{flex:1}}>
			<Image style={styles.imagem} source={props.imagem} />
		</View>
		<View style={{ flex: 4, alignContent: 'center' }}>
			<Text style={styles.texto}>{props.texto}</Text>
		</View>
	</View>
);

const styles = StyleSheet.create({
	topo: {
		backgroundColor: '#106161',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingVertical: 10
	},
	texto: {
		color: '#fff',
		fontSize: 20,
		textAlign: 'center',
		fontFamily: 'MV Boli',
		marginRight: 50
	},
	imagem: {
		width: 40,
		height: 40,
		marginLeft: 30
	}
});
