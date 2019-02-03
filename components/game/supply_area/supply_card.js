import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class SupplyCard1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		};
    }
    
    onPress(){
		console.log('pressed');
		if(this.props.card){
			this.setState({expanded: true})
		} else{
			this.props.expandSupplyCard(this.props.renderCard.bind(this));
		}
	}
	
	closeCard(){
		this.setState({expanded: false})
	}

	render() {
		return (
			<View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
					{
						this.props.card 

						? this.props.renderCard()

						: <Text style={{width: '100%', height: '100%'}}>Card</Text>
					}
                </TouchableWithoutFeedback>

				{
					this.props.expand 

					? this.props.renderCard()

					: null
				}

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