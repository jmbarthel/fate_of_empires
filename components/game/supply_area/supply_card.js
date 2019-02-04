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
			expanded: false
		};
    }
    
    onPress(){
		console.log('pressed');
		if(this.props.card){
			// this.setState({expanded: true})
			this.props.expandSupplyCard(this.props.renderCard);
		} else{
			this.props.expandSupplyCard();
		}
	}
	
	closeCard(){
		this.setState({expanded: false})
	}

	render() {
		return (
			<View style={styles.container}>
                <TouchableOpacity onPress={this.onPress.bind(this)}>
					{
						this.props.card 
						
						? this.props.renderCard()
						
						: <Text style={{width: '100%', height: '100%'}}>Card</Text>
					}
                </TouchableOpacity>

				{/* {
					this.props.expanded

					? 
					<View style={{backgroundColor: '#f02', position:'absolute', width: '30%', height: '70%'}}>
						<TouchableWithoutFeedback onPress={this.closeCard.bind(this)}>
						{
							this.props.card

							? this.props.renderCard()

							: <Text style={{width: '100%', height: '100%'}}>Card</Text>

						}
						{this.props.renderCard()}
						
						</TouchableWithoutFeedback>
					</View>

					: null
				} */}

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