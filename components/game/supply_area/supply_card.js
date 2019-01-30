import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
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
        this.props.expandSupplyCard();
    }

	render() {
		return (
			<View style={styles.container}>
                <TouchableWithoutFeedback onPress={this.onPress.bind(this)}>
                    <Text style={{width: '100%', height: '100%'}} >Card</Text>
                </TouchableWithoutFeedback>
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