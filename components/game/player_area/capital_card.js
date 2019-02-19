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
    
    onPress(){
        console.log('hi');
		// if(this.props.turn === 1){
		// 	if(this.props.real){
		// 		this.props.expandCapitalCard(this.props.card({num: this.props.num, expanded: true}));
		// 	} else{
		// 		this.props.expandCapitalCard();
		// 	}
		// } else{
        //     alert('Not your turn.');
        // }
	}
	
	// closeCard(){
	// 	this.setState({expanded: false})
	// }

	render() {
		return (
			<View style={[styles.container, {top: 0-(this.props.num * 100)}]}>
				<TouchableOpacity onPress={this.onPress.bind(this)}>
					{this.props.card({hand: 0})}
				</TouchableOpacity>
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
		backgroundColor: '#555'
    },
});
  
export default CapitalCard = connect(mapStateToProps)(CapitalCard1);