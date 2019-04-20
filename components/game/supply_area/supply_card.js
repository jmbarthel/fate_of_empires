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

	componentWillMount(){
		if(typeof this.props.card === 'object'){
			this.props.card.props.props.hand = 0;
			this.props.card.props.props.expanded = false;
		}
	}
    
	onPress(){
		if(this.props.turn === this.props.playerNumber){
			if(typeof this.props.card === 'function'){
				this.props.expandSupplyCard(this.props.card({num: this.props.num, expanded: true}));
			} else{
				this.props.expandSupplyCard(this.props.card);
			}
		} else{
            alert('Not your turn.');
        }
	}
	
	closeCard(){
		this.setState({expanded: false})
	}

	render() {
		let card;

		if(typeof this.props.card === 'function'){
			card = this.props.card({hand: 0, num: this.props.num})
		} else{
			card = this.props.card.props.props.returnCard({...this.props.card.props.props, hand: 0, num: this.props.num, expanded: false})
		}
		let type = card.props.props.type;

		return (
			(this.props.highlight && (this.props.typeToChoose === 'any' || type === this.props.typeToChoose) ? (
				<View style={[styles.container, styles.highlight]}>
					<TouchableOpacity onPress={this.onPress.bind(this)}>
						{card}
					</TouchableOpacity>
				</View>
			
			) : (
				<View style={styles.container}>
					<TouchableOpacity onPress={this.onPress.bind(this)}>
						{card}
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