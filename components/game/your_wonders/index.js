import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class WonderArea1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View style={[this.props.style, styles.container]}>
				<Text>WonderArea</Text>
				<Text>This is your WonderArea</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#def',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
});
  
export default WonderArea = connect(mapStateToProps)(WonderArea1);