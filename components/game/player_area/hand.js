import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import Deck from './deck.js';
import Card from './card.js';


const mapStateToProps = state => {
    return { ...state };
};

class Hand1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

    renderHand(){
        let hand = [];
        
        for(let i = 0; i < this.props.hand.length; i++){
            let degrees = ((45/(this.props.hand.length-i))-20),
            rotation = {
                transform: [{ rotate: degrees+'deg'}]
            },
            position = {
                top: 0
            };

            if(i > Math.ceil(this.props.hand.length / 2)){
                position.top = 5 * i;
            } else if (i < Math.ceil(this.props.hand.length / 2)){
                position.top = 5 * (this.props.hand.length / (i+1));
            } else {
                position.top = 0
            }

            hand.push(
                <Card key={i} angle={degrees} toggleDim={this.props.toggleDim}/>
            )
        }

        return hand;
    }

	render() {
		return (
			<View style={[this.props.style, styles.container]}>
                <View style={{height: '100%', width: '16%'}}>
                    <Deck name='deck'/>
                    <Deck name='discard'/>
                </View>
                <View style={styles.cardArea}>
                    {this.renderHand()}
                </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#a7e',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    card: {
        
    },
    cardArea: {
        flexDirection: 'row', 
        width: '84%', 
        height: '100%', 
        backgroundColor: '#044', 
        justifyContent: 'center',
        paddingTop: '3%'
    }
});
  
export default Hand = connect(mapStateToProps)(Hand1);