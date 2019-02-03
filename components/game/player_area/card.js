import React from 'react';
import { StyleSheet, View, Animated, PanResponder, Text } from "react-native";
import { connect } from 'react-redux';


// const mapStateToProps = state => {
//     return { ...state };
// };

export default class Card extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            pan: new Animated.ValueXY(),
        }
    }

    englarge(){
        let coordinates = [];



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
                if(gesture.dy < -150){
                    this.setState({expanded: true});
                } else{
                    this.state.pan.flattenOffset();
                    this.setState({expanded: false})
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 15
                    }).start();
                }
			},
        });
	}

	render() {
        const panStyle = { transform: this.state.pan.getTranslateTransform() }

        panStyle.transform.push({rotate: this.props.angle+"deg"});

        // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
        // let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};
		return (
                <Animated.View 
                    {...this.panResponder.panHandlers}
                    style={[panStyle, styles.card, this.state.expanded ? styles.expandedCard : null]}
                >
                {this.state.expanded ? 
                    <View>
                    <View style={{justifyContent: 'center', alignItems: 'center', height: '50%'}}>
                        <Text>Artwork</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '45%'}}>
                        <View style={{width: '50%'}}>
                            <Text>Option 1</Text>
                        </View>
                        <View style={{borderWidth: 1, borderRightColor: '#000', borderLeftColor: '#000', height: '100%', width: '0%'}}>
                        </View>
                        <View style={{width: '45%'}}>
                            <Text>Option 2</Text>
                        </View>
                    </View>
                    </View> 
                    : 
                        this.props.card.real ? 
                        this.props.card.render() 
                        : <Text>{this.props.card.name}</Text>
                }
                    
                </Animated.View>
		);
	}
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#075",
        height: 70,
        width: 50,
        borderColor: '#fff', 
        borderWidth: 2,
        borderRadius: 5,
        margin: 3,
        backgroundColor: '#555'
    },
    expandedCard: {
        height: 210, 
        width: 150,
    }

});
  
// export default Card = connect(mapStateToProps)(Card1);