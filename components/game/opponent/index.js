import React from 'react';
import { View, StyleSheet, Text, Animated, PanResponder } from "react-native";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { ...state };
};

class Opponent1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showDraggable: true,
			dropAreaValues: null,
			pan: new Animated.ValueXY(),
			opacity: new Animated.Value(1)
		};
		
		if(props.enemy.animateEntry){
			this.moveAnimation = new Animated.ValueXY({ x: 800*props.enemy.animateEntry, y: 0 });
		} else{
			this.moveAnimation = new Animated.ValueXY({ x: 0, y: 0 });
		}

		this.gestureRadius = 150;
		
	}
	_slideIn() {
		Animated.spring(this.moveAnimation, {
			toValue: { x: 0, y: 0 },
			friction: 10,
		}).start();
	}

	componentWillMount() {
		if(this.props.expanded){
			// Add a listener for the delta value change
			this._val = { x:1000, y:0 }

			if(this.props.enemy.animateEntry){
				this._slideIn();
			}
	
			// Initialize PanResponder with move handling
			this.panResponder = PanResponder.create({
				onStartShouldSetPanResponder: (e, gesture) => true,
				onPanResponderMove: Animated.event([
					// Move the element on the x axis only
					null, { 
						dx: this.state.pan.x, 
					}
				]),
				onPanResponderRelease: (e, gesture) => {
					// Spring back to the original value if it is not over the drop zone, 
					// Otherwise, load the next component or the previous component
					if (this.swipeLeft(gesture)){
						Animated.spring(this.state.pan, {
							toValue: { x: -8000, y: 0 },
							friction: 10,
							// useNativeDriver: true,
						}).start();
						this.props.goToNextEnemy(-1, this.props.enemy.id);
					} else if(this.swipeRight(gesture)){
						Animated.spring(this.state.pan, {
							toValue: { x: 8000, y: 0},
							friction: 10, 
							// useNativeDriver: true,
						}).start();
						this.props.goToNextEnemy(1, this.props.enemy.id);
					} else{
						Animated.spring(this.state.pan, {
							toValue: { x: 0, y: 0 },
							friction: 10,
							// useNativeDriver: true,
						}).start();
					}
				}
			});
		}
	}

	swipeLeft(gesture){
		return gesture.dx < -1*this.gestureRadius;
	}

	swipeRight(gesture){
		return gesture.dx > this.gestureRadius;
	}


	render() {
		if(this.props.expanded){
			style = [styles.container, styles.expanded]
		} else if(this.props.dim){
			style = [styles.container, {backgroundColor: '#abc', width: 0, height: 0}]
		} else{
			style = [styles.container, {borderRadius: 5, padding: 4}]
		}

		if(this.props.dim && !this.props.expanded){
			return null;
		}

		const panStyle = {
			transform: this.state.pan.getTranslateTransform()
		}

		if(this.props.expanded){
			return (
				<Animated.View 
					{...this.panResponder.panHandlers}
					style={[panStyle, this.moveAnimation.getLayout(), style]}
				>
					<Text>{this.props.enemy.name}</Text>
					<View style={[styles.expanded, styles.enemyBoard]}>
						<Text>Expanded</Text>
						<Text style={styles.number}>{this.props.enemy.id}</Text>
					</View> 
				</Animated.View>
			);
		} else{
			return (
				<View style={style}>
					<Text>{this.props.enemy.name}</Text>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
    container: {
		backgroundColor: '#0aa',
		margin: 10,
		alignItems: 'center',
	},
	expanded: {
		height: '100%', 
		width: '100%',
		marginTop: 20,
	},
	number: {
		fontSize: 200
	},
	enemyBoard:{
		alignItems: 'center',
	}
});
  
export default Opponent = connect(mapStateToProps)(Opponent1);