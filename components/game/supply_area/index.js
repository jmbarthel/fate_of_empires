import React from 'react';
import { View, StyleSheet } from "react-native";
import { connect } from 'react-redux';
import SupplyCard from './supply_card.js';

// Cards
import Banker from '../cards/starters/Banker.js';
import Scientist from '../cards/starters/Scientist.js';
import Artist from '../cards/starters/Artist.js';

const mapStateToProps = state => {
    return { ...state };
};

class SupplyArea1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.resourceContainer}>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard} playerNumber={this.props.playerNumber} real={true} card={Banker}/>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard} playerNumber={this.props.playerNumber} real={true} card={Artist}/>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard} playerNumber={this.props.playerNumber} real={true} card={Scientist}/>
				</View>

				<View style={styles.resourceContainer}>
					{
						this.props.supplyRevealed.map((card, i) => {
							return <SupplyCard 
									key={i} 
									num={i} 
									expandSupplyCard={this.props.expandSupplyCard} 
									real={true} 
									card={card}
									playerNumber={this.props.playerNumber}
							/>
						})
					}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%',
		justifyContent: 'flex-start'
	},
	resourceContainer: {
		flexDirection: 'row', 
		height: '30%', 
		width: '100%', 
		margin: 2,
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	card: {
		borderRadius: 5, 
		borderColor: '#000',
		borderWidth: 1,
		width: '20%',
		height: '100%',
		margin: 3,
		backgroundColor: '#555'
	}
});
  
export default SupplyArea = connect(mapStateToProps)(SupplyArea1);