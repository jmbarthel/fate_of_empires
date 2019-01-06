import React from 'react';
import { View, StyleSheet } from "react-native";
import Draggable from './draggable/index.js';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class Index1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View>
				<Draggable/>
				<Draggable/>
				<Draggable/>
				<Draggable/>
				<Draggable/>
				<Draggable/>
				<Draggable/>
			</View>
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
  });
  
export default Index = connect(mapStateToProps)(Index1);