import React from 'react';
import { StyleSheet, View, Animated, PanResponder, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';


// const mapStateToProps = state => {
//     return { ...state };
// };

export default class Card extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
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
            onStartShouldSetPanResponder: () => true,
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
                this.state.pan.flattenOffset();
				Animated.spring(this.state.pan, {
					toValue: { x: 0, y: 0 },
					friction: 15
				}).start();
			},
        });
	}

	render() {
        const panStyle = {
			transform: this.state.pan.getTranslateTransform()
        }
        panStyle.transform.push({ rotate: -this.props.angle+'deg'})

        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        // let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

		return (
                <Animated.View 
                    {...this.panResponder.panHandlers}
                    style={[panStyle, styles.card]}
                >
                    
                </Animated.View>
		);
	}
}

const styles = StyleSheet.create({
    card: {
        width: '100%', 
        height: '100%', 
        backgroundColor: '#f03'
    }
});
  
// export default Card = connect(mapStateToProps)(Card1);