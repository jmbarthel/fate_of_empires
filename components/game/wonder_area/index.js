import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import Wonder from './wonder.js';


const mapStateToProps = state => {
    return { ...state };
};

class WonderArea1 extends React.Component {
	constructor(props) {
		super(props);
        this.state = {};
    }
    
    renderRevealedWonders(){
        let x = [];

        for(let i=0; i < this.props.wondersRevealed.length; i++){
            x.push(
                <Wonder key={i} num={i} card={this.props.wondersRevealed[i]} real={true} expandWonderCard={this.props.expandWonderCard}/>
            );

            if(i===this.props.players_to_wonders[this.props.num_of_players]-1){
                x.push(
                    <View key={this.props.num_of_players*2} style={styles.wonderSupply}>
                        <Text>{this.props.wonderSupply.length}</Text>
                    </View>
                )
            }
        }

        return x;
    }

	render() {
		return (
			<View style={styles.container}>
                <View style={styles.revealedWonderArea}>
                    {this.renderRevealedWonders()}
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
        marginTop: 40,
    },
    revealedWonderArea: {
        width: '90%', 
        height: '80%',
        margin: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
    },
    wonderSupply: {
        width: '20%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        margin: 3,

        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 2, 
    }
});
  
export default WonderArea = connect(mapStateToProps)(WonderArea1);