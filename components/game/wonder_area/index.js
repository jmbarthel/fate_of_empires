import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import Wonder from './wonder.js';


const mapStateToProps = state => {
    return { ...state };
};

class WonderArea1 extends React.Component {
	constructor() {
		super();
        this.state = {};
//          players_to_wonders
//          wondersRevealed
//          wonderSupply
//          num_of_players
    }
    
    renderRevealedWonders(){
        let x = [];

        for(let i=0; i<this.props.players_to_wonders[this.props.num_of_players]; i++){
            // if(i===0){
            //     x.push(
            //         <View key={this.props.num_of_players*2} style={styles.wonderSupply}>
            //             <Text>{this.props.wonderSupply.length}</Text>
            //         </View>
            //     )
            // }
            x.push(
                // <View key={i}>
                    <Wonder key={i} k={i} style={styles.wonderCard}/>
                // </View>
            );
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
		backgroundColor: '#f0e',
		alignItems: 'center',
		justifyContent: 'center',
		width: '50%'
    },
    revealedWonderArea: {
        backgroundColor: '#075',
        width: '90%', 
        height: '80%',
        margin: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end'
    },
    wonderCard: {
        width: 60, 
        height: 80,
        borderWidth: 2, 
        margin: 2,
        borderColor: '#000',
        backgroundColor: '#fff',
        zIndex: 10,
    },
    wonderSupply: {
        width: '30%',
        height: '50%',
        borderWidth: 2, 
        borderColor: '#000',
    }
});
  
export default WonderArea = connect(mapStateToProps)(WonderArea1);