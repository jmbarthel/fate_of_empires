import React from 'react';
import { View, StyleSheet } from "react-native";
import Droppable from './droppable/index.js';
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
				{/* menu to choose: 
					-- new game 
					-- rules/instructions
					-- 
				
				*/}
				<Droppable/>
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