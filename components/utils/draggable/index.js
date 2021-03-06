import React from 'react';
import {
  StyleSheet,
  PanResponder,
  Animated,
} from "react-native";

export default class Draggable1 extends React.Component {
	constructor(){
		super();
		this.state = {
			showDraggable: true,
			dropAreaValues: null,
			pan: new Animated.ValueXY(),
			opacity: new Animated.Value(1)
		};
  	}

	componentWillMount() {
		// Add a listener for the delta value change
		this._val = { x:0, y:0 }

		this.state.pan.addListener((value) => this._val = value);
		
		// Initialize PanResponder with move handling
		this.panResponder = PanResponder.create({
			onStartShouldSetPanResponder: (e, gesture) => true,
			onPanResponderMove: Animated.event([
				null, { dx: this.state.pan.x, dy: this.state.pan.y }
			]),
			onPanResponderGrant: (e, gesture) => {
				this.state.pan.setOffset({
					x: this._val.x,
					y: this._val.y
				})
				this.state.pan.setValue({ x:0, y:0})
			},
			onPanResponderRelease: (e, gesture) => {
				Animated.spring(this.state.pan, {
					toValue: { x: 0, y: 0 },
					friction: 5
				}).start();
			},
			onPanResponderRelease: (e, gesture) => {
				if (this.isDropArea(gesture)) {
					Animated.timing(this.state.opacity, {
						toValue: 0,
						duration: 1000
					}).start(() =>
						this.setState({
							showDraggable: false
						})
					);
				} else {
					Animated.spring(this.state.pan, {
						toValue: { x: 0, y: 0 },
						friction: 10
					}).start();
				}
			}
        });
	}

	isDropArea(gesture){
		return gesture.moveY < 200;
	}

	render(){
		const panStyle = {
			transform: this.state.pan.getTranslateTransform()
		}
		
		return (
			<Animated.View
				{...this.panResponder.panHandlers}
				style={[panStyle, styles.circle]}
			/>
		);
	}
}

let CIRCLE_RADIUS = 30;

let styles = StyleSheet.create({
    circle: {
		backgroundColor: "skyblue",
		width: CIRCLE_RADIUS * 2,
		height: CIRCLE_RADIUS * 2,
		borderRadius: CIRCLE_RADIUS
    }
});
