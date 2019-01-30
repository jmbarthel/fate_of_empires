import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import SupplyCard from './supply_card.js';


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
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard}/>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard}/>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard}/>
				</View>

				<View style={styles.resourceContainer}>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard}/>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard}/>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard}/>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard}/>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard}/>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard}/>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard}/>
					<SupplyCard expandSupplyCard={this.props.expandSupplyCard}/>
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
});
  
export default SupplyArea = connect(mapStateToProps)(SupplyArea1);