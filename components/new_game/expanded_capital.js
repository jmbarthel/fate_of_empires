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
        this.textSizeAnimation = new Animated.Value(-1);
        this.errorTextAnimation = new Animated.ValueXY({ x: 50, y: 0 });
        this.errorTextSizeAnimation = new Animated.Value(-1);
        this.govtWidth = 0;
    }
    
    expandResources = () => {
        Animated.spring(this.goldAnimation, {
            toValue: { x: 0, y: 55 },
            friction: 6,
        }).start();

        Animated.spring(this.scienceAnimation, {
            toValue: { x: (this.govtWidth/3) + 7, y: 55 },
            friction: 6,
        }).start();

        Animated.spring(this.influenceAnimation, {
            toValue: { x: (2 * (this.govtWidth/3)) + 15, y: 55 },
            friction: 6,
        }).start();
        
        Animated.spring(this.textAnimation, {
            toValue: { x: 0, y: 95 },
            friction: 6,
        }).start();

        Animated.timing(this.textSizeAnimation, {
            toValue: 15, 
            duration: 100
        }).start();
        
        // Animated.timing(this.errorTextSizeAnimation, {
        //     toValue: { x: 0, y: 75 },
        //     friction: 6,
        // }).start();
    }

    returnCard = (card, obj) => {
        for(let prop in obj){
            card.props.props[prop] = obj[prop];
        }
        return card.props.props.returnCard(card.props.props);
    }

	render(){
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.closeCapital}>

                <View style={styles.cardRow}>
                    <Text style={styles.labelText}>Workers:</Text>
                    {
                        this.props.capital.workers.length > 0 
                        ? 
                            this.props.capital.workers.map((card, i) => {
                                return <TouchableOpacity 
                                    key={i} 
                                    style={[styles.card, (this.props.highlight ? styles.highlight : null)]} 
                                    onPress={() => this.props.expandHandCard(
                                                typeof card === 'function' 
                                                ? card({num: i, expanded: true, capital: true}) 
                                                : this.returnCard(card, card, {num: i, expanded: true, capital: true})
                                            )}
                                    >
                                    {
                                        typeof card === 'function' 
                                        ? card({hand: true}) 
                                        : this.returnCard(card, {expanded: false, hand: true})
                                    }
                                </TouchableOpacity>;
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
                                return <TouchableOpacity 
                                    key={i} 
                                    style={[styles.card, (this.props.highlight ? styles.highlight : null)]} 
                                    onPress={() => this.props.expandHandCard(
                                                typeof card === 'function' 
                                                ? card({num: i, expanded: true, capital: true}) 
                                                : this.returnCard(card, {num: i, expanded: true, capital: true})
                                            )}
                                    >
                                    {
                                        typeof card === 'function' 
                                        ? card({hand: true}) 
                                        : this.returnCard(card, {expanded: false, hand: true})
                                    }
                                </TouchableOpacity>;
                            })

                        : <Text style={{color: '#fff', alignSelf: 'center', fontWeight: 'bold'}}>There are no armies on your capital.</Text>

                    }
                </View>

                {
                    this.props.capital.other.length > 0
                    ? 
                        <View style={styles.cardRow}>
                            <Text style={styles.labelText}>Other:</Text>
                            
                            {
                                this.props.capital.other.map((card, i) => {
                                    return <TouchableOpacity 
                                        key={i} 
                                        style={[styles.card, (this.props.highlight ? styles.highlight : null)]} 
                                        onPress={() => this.props.expandHandCard(
                                                    typeof card === 'function' 
                                                    ? card({num: i, expanded: true, capital: true}) 
                                                    : this.returnCard(card, {num: i, expanded: true, capital: true})
                                                )}
                                        >
                                        {
                                            typeof card === 'function' 
                                            ? card({hand: true}) 
                                            : this.returnCard(card, {expanded: false, hand: true})
                                        }
                                    </TouchableOpacity>;
                                })
                            }

                        </View>
                    : undefined
                }

                <TouchableOpacity 
                    style={styles.buyGovt} 
                    onPress={this.expandResources.bind(this)}
				>
                    <Animated.View style={[styles.resourceOrb, this.goldAnimation.getLayout(), {backgroundColor: 'yellow'}]}><TouchableOpacity style={{width: 15, height: 15}}><Text style={{textAlign: 'center'}}>G</Text></TouchableOpacity></Animated.View>
                    <Animated.View style={[styles.resourceOrb, this.scienceAnimation.getLayout(), {backgroundColor: 'blue'}]}><TouchableOpacity style={{width: 15, height: 15}}><Text style={{textAlign: 'center'}}>S</Text></TouchableOpacity></Animated.View>
                    <Animated.View style={[styles.resourceOrb, this.influenceAnimation.getLayout(), {backgroundColor: 'purple'}]}><TouchableOpacity style={{width: 15, height: 15}}><Text style={{textAlign: 'center'}}>I</Text></TouchableOpacity></Animated.View>
                    <Animated.View style={[styles.resourceOrb, this.textAnimation.getLayout()]}><Animated.Text style={{color: 'white', fontSize: (this.textSizeAnimation)}}>A government costs 10 of any one resource. Excess will be taken from your 'Any Mix'.</Animated.Text></Animated.View>
                    <Animated.View style={[styles.resourceOrb, this.errorTextAnimation.getLayout()]}><Animated.Text style={{color: 'white', fontSize: (this.errorTextSizeAnimation)}}>Something something</Animated.Text></Animated.View>
                    <View style={styles.govtTextCon} onLayout={(e) => {this.govtWidth = e.nativeEvent.layout.width;}}><Text style={styles.govtText}>Form a government!</Text></View>
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
        margin: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    highlight: {padding: 3, backgroundColor: '#f00'},
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
    buyGovt: {top: 10, right: 10, position: 'absolute', borderRadius: 15},
    govtTextCon: {width: '100%', height: '100%', backgroundColor: '#fff', padding: 15, borderRadius: 15} ,
    govtText: {width: '100%', height: '100%'},
    resourceOrb: {left: 50, position: 'absolute', padding: 15, borderRadius: 15},
});
  
export default ExpandedCapital = connect(mapStateToProps)(ExpandedCapital1);