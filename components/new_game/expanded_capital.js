import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Animated } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class ExpandedCapital1 extends React.Component {
	constructor() {
		super();
        this.state = {};

        this.goldAnimation = new Animated.ValueXY({ x: 50, y: 0 });
        this.scienceAnimation = new Animated.ValueXY({ x: 50, y: 0 });
        this.influenceAnimation = new Animated.ValueXY({ x: 50, y: 0 });
        this.textAnimation = new Animated.ValueXY({ x: 50, y: 0 });
        this.errorTextAnimation = new Animated.ValueXY({ x: 50, y: 0 });

    }
    
    expandResources = () => {
        Animated.spring(this.goldAnimation, {
            toValue: { x: 0, y: 55 },
            friction: 6,
        }).start();

        Animated.spring(this.scienceAnimation, {
            toValue: { x: 40, y: 55 },
            friction: 6,
        }).start();

        Animated.spring(this.influenceAnimation, {
            toValue: { x: 80, y: 55 },
            friction: 6,
        }).start();
        
        Animated.spring(this.textAnimation, {
            toValue: { x: 0, y: 75 },
            friction: 6,
        }).start();
        
        // Animated.spring(this.errorTextAnimation, {
        //     toValue: { x: 0, y: 75 },
        //     friction: 6,
        // }).start();
    }

	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.closeCapital}>

                <View style={styles.cardRow}>
                    <Text style={styles.labelText}>Workers:</Text>
                    {
                        this.props.capital.workers.length > 0 
                        ? 
                            this.props.capital.workers.map((card, i) => {
                                return <TouchableOpacity key={i} onPress={() => this.props.expandHandCard(card({num: i, expanded: true, capital: true}))} style={styles.card}>{card({hand: true})}</TouchableOpacity>;
                            })

                        : <Text style={{color: '#fff', alignSelf: 'center', fontWeight: 'bold'}}>There are no workers on your capital.</Text>
                    }
                </View>

				<View style={styles.cardRow}>
                    <Text style={styles.labelText}>Armies:</Text>
                    {
                        this.props.capital.armies.length > 0
                        ? 
                            this.props.capital.armies.map((card, i) => {
                                return <TouchableOpacity key={i} onPress={() => this.props.expandHandCard(card({num: i, expanded: true, capital: true}))} style={styles.card}>{card({hand: true})}</TouchableOpacity>;
                            })

                        : <Text style={{color: '#fff', alignSelf: 'center', fontWeight: 'bold'}}>There are no armies on your capital.</Text>

                    }
                </View>

                {
                    this.props.capital.other.length > 0
                    ? 
                        <View style={styles.cardRow}>
                            <Text style={styles.labelText}>Other:</Text>
                            
                            {this.props.capital.other.map((card, i) => {
                                return <TouchableOpacity key={i} onPress={() => this.props.expandHandCard(card({num: i, expanded: true, capital: true}))} style={styles.card}>{card({hand: true})}</TouchableOpacity>;
                            })}

                        </View>
                    : undefined
                }

                <TouchableOpacity 
					style={styles.buyGovt} 
					onPress={this.expandResources.bind(this)}
				>
                    <Animated.View style={[styles.resourceOrb, this.goldAnimation.getLayout(), {backgroundColor: 'yellow'}]}></Animated.View>
                    <Animated.View style={[styles.resourceOrb, this.scienceAnimation.getLayout(), {backgroundColor: 'blue'}]}></Animated.View>
                    <Animated.View style={[styles.resourceOrb, this.influenceAnimation.getLayout(), {backgroundColor: 'purple'}]}></Animated.View>
                    <Animated.View style={[styles.resourceOrb, this.textAnimation.getLayout()]}><Text style={{color: 'white'}}>A government costs 10 of any one resource. Excess will be taken from your 'Any Mix'.</Text></Animated.View>
                    <Animated.View style={[styles.resourceOrb, this.errorTextAnimation.getLayout()]}><Text style={{color: 'white'}}>Something something</Text></Animated.View>
                    <View style={styles.govtTextCon}><Text style={styles.govtText}>Form a government!</Text></View>
                </TouchableOpacity>

			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(100, 100, 100, 0.7)',
        position: 'absolute',
    },
    cardRow: {
        height: '30%', 
        width: '70%',
        // backgroundColor: '#fff',
        margin: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    card: {
        height: '100%',
        width: '20%',
        margin: 5, 
        borderWidth: 2, 
        borderColor: '#000',
        borderRadius: 10,
    },
    labelText: {
        transform: [
            {rotate: '-90deg'}
        ],
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        textShadowColor:'#000',
        textShadowOffset:{
            width: 1,
            height: 1
        }, 
        textAlign: 'center', 
        textShadowRadius: 1, 
        height: 20, 
        top: 50
    },
    buyGovt: {top: 10, right: 10, position: 'absolute', backgroundColor: '#f83', borderRadius: 15},
    govtTextCon: {width: '100%', height: '100%', backgroundColor: '#ff3', padding: 15, borderRadius: 15} ,
    govtText: {width: '100%', height: '100%'},
    resourceOrb: {left: 50, position: 'absolute', padding: 15, borderRadius: 15}
});
  
export default ExpandedCapital = connect(mapStateToProps)(ExpandedCapital1);