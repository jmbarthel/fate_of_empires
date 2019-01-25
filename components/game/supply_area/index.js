import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class SupplyArea1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.resourceContainer}>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
				</View>

				<View style={styles.resourceContainer}>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		justifyContent: 'flex-start'
	},
	resourceContainer: {
		flexDirection: 'row', 
		height: '30%', 
		width: '100%', 
		margin: 2,
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	resource: {
		borderRadius: 5, 
		borderColor: '#000',
		borderWidth: 1,
		width: '20%',
		height: '100%',
		margin: 3,
		backgroundColor: '#555'
	}
});
  
export default SupplyArea = connect(mapStateToProps)(SupplyArea1);