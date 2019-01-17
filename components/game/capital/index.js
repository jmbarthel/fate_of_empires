import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class Capital1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View style={[this.props.style, styles.container]}>
				<Text>Capital
                
                </Text>
				<Text>This is the capital.</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ade',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
});
  
export default Capital = connect(mapStateToProps)(Capital1);