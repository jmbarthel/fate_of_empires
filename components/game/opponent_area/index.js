import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class OpponentArea1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>OpponentArea</Text>
				{this.props.expanded ? <View style={styles.expanded}><Text>Expanded</Text></View> : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		backgroundColor: '#f0f',
		margin: 10,
	},
	expanded: {
		height: 150, 
		width: 150
	},
});
  
export default OpponentArea = connect(mapStateToProps)(OpponentArea1);