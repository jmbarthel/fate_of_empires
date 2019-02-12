import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class Deck1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={[this.props.style, styles.container]}>
				<Text>{this.props.name}</Text><Text>{this.props.deck ? this.props.deck.length : null}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0e4',
        alignItems: 'center',
        justifyContent: 'center',
		borderWidth: 1,
		borderRadius: 5,
        margin: 1,
        height: '50%',
		transform: [{ rotate: '-5deg'}],
		top: -10
    },
});
  
export default Deck = connect(mapStateToProps)(Deck1);