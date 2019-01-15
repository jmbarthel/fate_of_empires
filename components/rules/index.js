import React from 'react';
import { StyleSheet, Text, ScrollView, Image } from "react-native";
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';


const mapStateToProps = state => {
    return { ...state };
};

class Rules1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

  render() {
		return (
			<ScrollView>
				<Text style={{fontSize:96}}>This is an </Text>
				<Text style={{fontSize:96}}>exhastive</Text>
				<Text style={{fontSize:96}}>table</Text>
				<Text style={{fontSize:96}}>of all of</Text>
				<Text style={{fontSize:96}}>the rules</Text>
				<Ionicons style={styles.goBack} name="md-arrow-back" size={32} color="black" onPress={this.props.goBack}/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
	},
	goBack: {
		position: 'absolute', 
		top: 5, 
		right: 15,
	},
});
  
export default Rules = connect(mapStateToProps)(Rules1);