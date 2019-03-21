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
                <Wonder 
                    key={i} 
                    num={i} 
                    card={this.props.wondersRevealed[i]} 
                    real={true} 
                    number_of_wonders={this.props.wondersRevealed.length}
                    expandWonderCard={this.props.expandWonderCard}
                    playerNumber={this.props.playerNumber}
                />
            );

            // if(i===this.props.players_to_wonders[this.props.num_of_players]-1){
            //     x.push(
            //         <View key={this.props.num_of_players*2} style={styles.wonderSupply}>
            //             <Text>{this.props.wonderSupply.length}</Text>
            //         </View>
            //     )
            // }
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
        width: '100%',
        height: '100%',
        // marginTop: 40,
        top: 0,
        right: 0,
        // backgroundColor: '#f39'
    },
    revealedWonderArea: {
        width: '100%', 
        height: '100%',
        margin: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        // backgroundColor: '#849'
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