import React from 'react';
import { View, StyleSheet } from "react-native";
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

    enlarge(){

    }

    renderHand(){
        let hand = [];
        
        for(let i = 0; i < this.props.hand.length; i++){
            let degrees = ((45/(this.props.hand.length-i))-20),

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
                <Card 
                    key={i} 
                    num={i} 
                    angle={degrees} 
                    toggleDim={this.props.toggleDim} 
                    card={this.props.hand[i]} 
                    expandHandCard={this.props.expandHandCard}
                />
            )
        }
        
        return hand;
    }

	render() {
		return (
			<View style={[this.props.style, styles.container]}>
                {/* <View style={{height: '100%', width: '16%', left: 4}}>
                    <Deck name='deck' deck={this.props.deck}/>
                    <Deck name='discard' deck={this.props.discard}/>
                </View> */}
                <View style={styles.cardArea}>
                    {this.renderHand()}
                </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    cardArea: {
        flexDirection: 'row', 
        // width: '84%', 
        left: 4,
        // padding: 1,
        width: '100%', 
        height: '100%', 
        justifyContent: 'center',
        // paddingTop: '3%'
    }
});
  
export default Hand = connect(mapStateToProps)(Hand1);