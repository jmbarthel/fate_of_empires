import React from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class CapitalCard1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
		
	returnCard(){
		this.props.card.props.props.hand = 0; 
		return this.props.card.props.props.returnCard(this.props.card.props.props);
	}

	render() {
		return (
			<View style={[styles.container, {top: 0-(this.props.num * 100)}, (this.props.highlight ? styles.highlight : null)]}>
				<View>
					{typeof this.props.card === 'function' ? this.props.card({hand: 0}) : this.returnCard() }
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
			borderRadius: 5, 
			borderColor: '#000',
			borderWidth: 1,
			width: '100%',
			// height: '100%',
			margin: 3,
		},
		highlight: {
			padding: 2, 
			backgroundColor: '#f00'
		}
});
  
export default CapitalCard = connect(mapStateToProps)(CapitalCard1);