import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class SupplyCard1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
    }
    
    onPress(){
		if(this.props.real){
			this.props.expandSupplyCard(this.props.card);
		} else{
			this.props.expandSupplyCard();
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
			<View style={styles.container}>
                <TouchableOpacity onPress={this.onPress.bind(this)}>
					{this.props.card()}
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
		width: '20%',
		height: '100%',
		margin: 3,
		backgroundColor: '#555'
    },
});
  
export default SupplyCard = connect(mapStateToProps)(SupplyCard1);