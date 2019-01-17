import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class SharedArea1 extends React.Component {
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
				</View>

				<View style={styles.resourceContainer}>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
					<View style={styles.resource}/>
				</View>


				{/* <Text>SharedArea</Text> */}
				{/* <Text>This is where the board is held, and items that are available for purchase can be viewed. </Text> */}
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		backgroundColor: '#fde',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%'
	},
	resourceContainer: {
		flexDirection: 'row', 
		height: '30%', 
		width: '100%', 
		margin: 2,
		justifyContent: 'center'
	},
	resource: {
		borderRadius: 5, 
		borderColor: '#000',
		borderWidth: 1,
		width: '20%',
		height: '100%',
		margin: 3,
	}
});
  
export default SharedArea = connect(mapStateToProps)(SharedArea1);