import React from 'react';
import { StyleSheet, Animated, PanResponder, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { 
        turn: state.turn 
    };
};

class Card1 extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            pan: new Animated.ValueXY(),
        }
    }

    enlarge = () => {
        console.log('this.props.turn', this.props.turn);
        if(this.props.turn === this.props.playerNumber){
            this.props.expandHandCard(this.props.card({ num: this.props.num, expanded: true }));
        } else{
            alert('Not your turn.');
        }
    }

    componentWillMount() {
		// Add a listener for the delta value change
		this._val = { x:0, y:0 }

		this.state.pan.addListener((value) => {
            this._val = value
        });
		
		// Initialize PanResponder with move handling
		this.panResponder = PanResponder.create({
            // Only animate if it is being dragged. Otherwise, allow the touchable opacity responder to expand. 
            onMoveShouldSetPanResponder: (event, gesture) => { return Math.abs(gesture.dx) > 5 || Math.abs(gesture.dy) > 5; },
			onPanResponderGrant: (e, gesture) => {
                this.state.pan.setOffset({
                    x: this._val.x,
					y: this._val.y
                })
				this.state.pan.setValue({ x:0, y:0})
			},
            onPanResponderMove: Animated.event([
                null, { 
                    dx: this.state.pan.x, 
                    dy: this.state.pan.y
                }
            ]),
			onPanResponderRelease: (e, gesture) => {
                if(gesture.dy < -150){
                    this.enlarge();
                } 
                this.state.pan.flattenOffset();
                Animated.spring(this.state.pan, {
                    toValue: { x: 0, y: 0 },
                    friction: 15
                }).start();
			},
        });
	}

	render() {
        const panStyle = { transform: this.state.pan.getTranslateTransform() }
        panStyle.transform.push({rotate: '8deg'})

        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        // let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};
		return (
            <Animated.View 
                {...this.panResponder.panHandlers}
                style={[panStyle, styles.card, {left: 0+(this.props.num * 60)}, (this.props.highlight ? styles.highlight : null)]}
            >
                <TouchableOpacity onPress={this.enlarge.bind(this)}>
                    {this.props.card({num: this.props.num, hand: true})} 
                </TouchableOpacity>
            </Animated.View>
		);
	}
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#075",
        position: 'absolute',
        left: 0,
        height: '100%',
        width: '25%',
        borderColor: '#000', 
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: '#555'
    },
    highlight: {
        padding: 2, 
        backgroundColor: '#f00',
    }
});
  
export default Card = connect(mapStateToProps)(Card1);