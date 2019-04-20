import React from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class SupplyCard1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
    
	onPress(){
		if(this.props.turn === this.props.playerNumber){
			if(this.props.real){
				this.props.expandSupplyCard(this.props.card({num: this.props.num, expanded: true}));
			} else{
				this.props.expandSupplyCard();
			}
		} else{
            alert('Not your turn.');
        }
	}
	
	closeCard(){
		this.setState({expanded: false})
	}

	render() {
		if(this.props.real){
			let Card = this.props.card();
		}

		return (
			(this.props.highlight ? (
				<View style={[styles.container, styles.highlight]}>
					<TouchableOpacity onPress={this.onPress.bind(this)}>
						{this.props.card({hand: 0})}
					</TouchableOpacity>
				</View>
			
			) : (
				<View style={styles.container}>
					<TouchableOpacity onPress={this.onPress.bind(this)}>
						{this.props.card({hand: 0})}
					</TouchableOpacity>
				</View>
			))
		);
	}
}

const styles = StyleSheet.create({
    container: {
		borderRadius: 5, 
		borderColor: '#000',
		borderWidth: 1,
		width: '20%',
		height: '100%',
		margin: 3,
		backgroundColor: '#555'
		},
	highlight: {
		backgroundColor: '#f00',
		padding: 2,
	}
});
  
export default SupplyCard = connect(mapStateToProps)(SupplyCard1);