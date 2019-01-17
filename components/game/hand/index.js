import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import Deck from '../deck/index.js';


const mapStateToProps = state => {
    return { ...state };
};

class Hand1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<View style={[this.props.style, styles.container]}>
                <View style={{height: '100%', width: '16%'}}>
                    <Deck name='deck'/>
                    <Deck name='discard'/>
                </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a7e',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'flex-start',
    },
});
  
export default Hand = connect(mapStateToProps)(Hand1);