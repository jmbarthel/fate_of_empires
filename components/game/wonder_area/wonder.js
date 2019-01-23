import React from 'react';
import { StyleSheet, View, Animated, PanResponder, Text, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';


// const mapStateToProps = state => {
//     return { ...state };
// };

export default class Wonder extends React.Component {
	constructor() {
        super();
        this.state = {
            pan: new Animated.ValueXY(),
			opacity: new Animated.Value(1)
        }
    }

    componentWillMount() {
        console.log(this.props.k);

		// Add a listener for the delta value change
		this._val = { x:0, y:0 }

		this.state.pan.addListener((value) => this._val = value);
		
		// Initialize PanResponder with move handling
		this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => {
                console.log('one')
                return true;
            },
            onStartShouldSetPanResponderCapture: () => {
                console.log('four');
                return false
            },
            onMoveShouldSetPanResponder: () => {
                console.log('two')
                return true;
            },
            onMoveShouldSetPanResponderCapture: () => {
                console.log('three');
                return true;
            },
			onPanResponderGrant: (e, gesture) => {
                this.state.pan.setOffset({
                    x: this._val.x,
					y: this._val.y
				})
				this.state.pan.setValue({ x:0, y:0})
			},
            onPanResponderMove: Animated.event([
                null, { dx: this.state.pan.x, dy: this.state.pan.y }
            ]),
			onPanResponderRelease: (e, gesture) => {
                this.state.pan.flattenOffset();
				Animated.spring(this.state.pan, {
					toValue: { x: 0, y: 0 },
					friction: 5
				}).start();
			},
        });
	}

	render() {
        const panStyle = {
			transform: this.state.pan.getTranslateTransform()
        }
        
        console.log(panStyle);

        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        // let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};

		return (
                <Animated.View 
                    {...this.panResponder.panHandlers}
                    style={[panStyle, this.props.style]}
                >
                    
                </Animated.View>
		);
	}
}

const styles = StyleSheet.create({
});
  
// export default Wonder = connect(mapStateToProps)(Wonder1);