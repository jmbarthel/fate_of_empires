import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import Calculus from '../game/cards/technology/Calculus';


const mapStateToProps = state => {
    return { ...state };
};

class ExpandedCards1 extends React.Component {
	constructor(props) {
        super(props);
		this.state = {};
    }
    
    getImage(flag){
        if(flag === 'japan'){
            return require('../../assets/symbols/flags/japanflag.png');
        } else if(flag === 'uk'){
            return require('../../assets/symbols/flags/ukflag.png');
        } else if(flag === 'usa'){
            return require('../../assets/symbols/flags/usaflag.png');
        } else if(flag === 'greece'){
            return require('../../assets/symbols/flags/greeceflag.png');
        } else if(flag === 'germany'){
            return require('../../assets/symbols/flags/germanyflag.png');
        } else if(flag === 'india'){
            return require('../../assets/symbols/flags/indiaflag.png');
        } else if(flag === 'france'){
            return require('../../assets/symbols/flags/franceflag.png');
        } else if(flag === 'china'){
            return require('../../assets/symbols/flags/chinaflag.png');
        } else if(flag === 'rome'){
            return require('../../assets/symbols/flags/romeflag.png');
        }
    }

	render() {
        let screenHeight = this.props.screenHeight,
		    cardHeight = this.props.cardHeight,
		    screenWidth = this.props.screenWidth,
            cardWidth = this.props.cardWidth;
        
        if(this.props.expandSupplyCard){
            // SUPPLY CARD
            return <View pointerEvents='box-none' style={{backgroundColor: '#000', position:'absolute', width: cardWidth, height: cardHeight, right: 15}}>
                        {this.props.expandedSupplyCard}
                        <TouchableOpacity 
                            onPress={this.props.unExpandSupplyCard}
                            style={{position: 'absolute', height: '70%', width: '100%', top: 0}}
                        />
                        <TouchableOpacity
                            style={{position: 'absolute', height: '20%', width: '50%', bottom: 0, right: 0 }}
                            onPress={() => {this.props.buySupplyCard(this.props.expandedSupplyCard)}}
                        />
                        <View style={{
                            position: 'absolute', 
                            right: cardWidth,
                            top: 30,
                            justifyContent: 'flex-start',
                            height: '100%',
                        }}>
                            {/* {
                                this.props.expandedSupplyCard.props.props.type === 'worker' 
                                || this.props.expandedSupplyCard.props.props.type === 'army'
    
                                ? 
                                    <TouchableOpacity 
                                        style={{
                                            width: 150,
                                            alignSelf: 'flex-start',
                                            backgroundColor: '#f0f',
                                            borderRadius: 50,
                                            padding: 20,
                                        }}
                                        onPress={this.putOnCapital.bind(this, this.props.expandedSupplyCard)}
                                    >
                                        <Text>Put on Capital</Text>
                                    </TouchableOpacity>
                                : undefined
                            } */}
                            
                            {
                                this.props.expandedSupplyCard.props.props.cost.gold > 0 
                                ? 
                                    <View style={styles.sideBubblesCon}>
                                        <LinearGradient 
                                            colors={['#fff', '#f27']}
                                            style={styles.sideBubbles}
                                        >
                                            <Image 
                                                source={require('../../assets/symbols/actions/Gold.png')}
                                                style={{
                                                    width: '100%', 
                                                    height: '100%', 
                                                }} 
                                            />
                                        </LinearGradient>
                                    </View>
                                : undefined
                            }
                            {
                                this.props.expandedSupplyCard.props.props.cost.science > 0 
                                ? 
                                    <View style={styles.sideBubblesCon}>
                                        <LinearGradient 
                                            colors={['#fff', '#f27']}
                                            style={styles.sideBubbles}
                                        >
                                            <Image 
                                                source={require('../../assets/symbols/actions/Science.png')}
                                                style={{
                                                    width: '100%', 
                                                    height: '100%', 
                                                }} 
                                            />
                                        </LinearGradient>
                                    </View>
                                : undefined
                            }
                            {
                                this.props.expandedSupplyCard.props.props.cost.influence > 0 
                                ? 
                                    <View style={styles.sideBubblesCon}>
                                        <LinearGradient 
                                            colors={['#fff', '#f27']}
                                            style={styles.sideBubbles}
                                        >
                                            <Image 
                                                source={require('../../assets/symbols/actions/Influence.png')}
                                                style={{
                                                    width: '100%', 
                                                    height: '100%', 
                                                }} 
                                            />
                                        </LinearGradient>
                                    </View>
                                : undefined
                            }
                        </View>
                    </View>
        } else if(this.props.expandWonderCard){
            // WONDER CARD
            return <View pointerEvents='box-none' style={{backgroundColor: '#000', position:'absolute', width: cardWidth, height: cardHeight, left: 15}}>
                {this.props.expandedWonderCard}
                <TouchableOpacity 
                    onPress={this.props.unExpandWonderCard}
                    style={{position: 'absolute', height: '70%', width: '100%', top: 0}}
                />
                <TouchableOpacity
                    style={{position: 'absolute', height: '30%', width: '50%', bottom: 0, left: 0 }}
                />
                <TouchableOpacity
                    style={{position: 'absolute', height: '30%', width: '50%', bottom: 0, right: 0 }}
                />

                <View style={{
                    position: 'absolute', 
                    right: -150,
                    left: (cardWidth),
                    // top: 30,
                    justifyContent: 'flex-start',
                    height: '100%',
                    // backgroundColor: '#0f3'
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <View>

                            {
                                (
                                    !this.props.player.claimedWonder
                                    && this.props.player.claimedWonder !== this.props.expandedWonderCard.props.props.name
                                    && this.props.expandedWonderCard.props.props.claimedBy[this.props.player.flag] == undefined
                                )

                                ? <TouchableOpacity 
                                        style={{
                                            alignSelf: 'flex-start',
                                            backgroundColor: '#f0f',
                                            borderRadius: 50,
                                            padding: 20,
                                            marginBottom: 5,
                                        }}
                                        onPress={() => {this.props.placeFlag(this.props.expandedWonderCard)}}
                                    >
                                        <Text>Place Your Flag</Text>
                                    </TouchableOpacity>
                                : undefined
                            }
                            {
                                this.props.expandedWonderCard.props.props.cost.gold > 0 
                                ? 
                                    <View style={styles.sideBubblesCon}>
                                        <LinearGradient 
                                            colors={['#fff', '#f27']}
                                            style={styles.sideBubbles}
                                        >
                                            <Image 
                                                source={require('../../assets/symbols/actions/Gold.png')}
                                                style={{
                                                    width: '100%', 
                                                    height: '100%', 
                                                }} 
                                            />
                                        </LinearGradient>
                                    </View>
                                : undefined
                            }
                            {
                                this.props.expandedWonderCard.props.props.cost.science > 0 
                                ? 
                                    <View style={styles.sideBubblesCon}>
                                        <LinearGradient 
                                            colors={['#fff', '#f27']}
                                            style={styles.sideBubbles}
                                        >
                                            <Image 
                                                source={require('../../assets/symbols/actions/Science.png')}
                                                style={{
                                                    width: '100%', 
                                                    height: '100%', 
                                                }} 
                                            />
                                        </LinearGradient>
                                    </View>
                                : undefined
                            }
                            {
                                this.props.expandedWonderCard.props.props.cost.influence > 0 
                                ? 
                                    <View style={styles.sideBubblesCon}>
                                        <LinearGradient 
                                            colors={['#fff', '#f27']}
                                            style={styles.sideBubbles}
                                        >
                                            <Image 
                                                source={require('../../assets/symbols/actions/Influence.png')}
                                                style={{
                                                    width: '100%', 
                                                    height: '100%', 
                                                }} 
                                            />
                                        </LinearGradient>
                                    </View>
                                : undefined
                            }

                        </View>

                        <View>
                            {
                                Object.keys(this.props.expandedWonderCard.props.props.claimedBy).length > 0
                                ? 
                                    <View>
                                        <View style={styles.flagGroupContainer}>
                                            {Object.keys(this.props.expandedWonderCard.props.props.claimedBy).map((flag, i) => {

                                                let resources = this.props.expandedWonderCard.props.props.claimedBy[flag];
                                                let progress = this.props.expandedWonderCard.props.props.progress;

                                                console.log('flag', flag);

                                                let flagImage = this.getImage(flag);

                                                let goldTicks = [], scienceTicks = [], influenceTicks = [];

                                                let scienceSpacing = ((cardHeight - 50) / this.props.expandedWonderCard.props.props.cost.science); 
                                                let influenceSpacing = ((cardHeight - 50) / this.props.expandedWonderCard.props.props.cost.influence); 
                                                let goldSpacing = ((cardHeight - 50) / this.props.expandedWonderCard.props.props.cost.gold); 

                                                if(this.props.expandedWonderCard.props.props.cost.gold > 0){
                                                    for(let i = 0; i < this.props.expandedWonderCard.props.props.cost.gold; i++){
                                                        goldTicks.push(
                                                            <View key={i}
                                                                style={{
                                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                                }}
                                                            ><Text style={{fontSize: 10}}>{i+1}</Text></View>
                                                        );
                                                    }
                                                }
                                                
                                                if(this.props.expandedWonderCard.props.props.cost.science > 0){
                                                    for(let i = 0; i < this.props.expandedWonderCard.props.props.cost.science; i++){
                                                        scienceTicks.push(
                                                            <View key={i}
                                                                style={{
                                                                    width: '100%', 
                                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                                }}
                                                            ><Text style={{fontSize: 10}}>{i+1}</Text></View>
                                                        );
                                                    }
                                                }

                                                if(this.props.expandedWonderCard.props.props.cost.influence > 0){
                                                    for(let i = 0; i < this.props.expandedWonderCard.props.props.cost.influence; i++){
                                                        influenceTicks.push(
                                                            <View key={i}
                                                                style={{
                                                                    width: '100%', 
                                                                    backgroundColor: 'rgb(255, 255, 255)',
                                                                }}
                                                            ><Text style={{fontSize: 10}}>{i+1}</Text></View>
                                                        );
                                                    }
                                                }

                                                return (
                                                    <View key={i} style={styles.flagContainer}> 
                                                        <Image 
                                                            source={flagImage}
                                                            resizeMode='contain'
                                                            style={{
                                                                position: 'absolute',
                                                                height: 50,
                                                                maxWidth: 75
                                                            }}
                                                        />

                                                        {
                                                            this.props.expandedWonderCard.props.props.cost.gold > 0
                                                            ? 
                                                                <View style={[{height: cardHeight-50}, styles.progressBarCon]}>
                                                                    {goldTicks}
                                                                    {
                                                                        progress[flag]
                                                                        ? 
                                                                            <Image 
                                                                                source={require('../../assets/symbols/actions/Gold.png')}
                                                                                resizeMode='contain'
                                                                                style={{
                                                                                    position: 'absolute', 
                                                                                    width: 25,
                                                                                    height: 25,
                                                                                    borderRadius: 10,
                                                                                    bottom: (progress[flag].gold === 1 ? 0 : progress[flag].gold*goldSpacing-30), 
                                                                                    backgroundColor: '#f4f'
                                                                                }}
                                                                            />
                                                                        : undefined
                                                                    }
                                                                </View>
                                                            : undefined
                                                        }

                                                        {
                                                            this.props.expandedWonderCard.props.props.cost.science > 0
                                                            ?   
                                                                <View style={[{height: cardHeight-50}, styles.progressBarCon]}>
                                                                    {scienceTicks}
                                                                    {
                                                                        progress[flag]
                                                                        ? 
                                                                            <Image 
                                                                                source={require('../../assets/symbols/actions/Science.png')}
                                                                                resizeMode='contain'
                                                                                style={{
                                                                                    position: 'absolute', 
                                                                                    width: 25,
                                                                                    height: 25,
                                                                                    borderRadius: 10,
                                                                                    bottom: (progress[flag].science === 1 ? 0 : progress[flag].science*scienceSpacing-30), 
                                                                                    backgroundColor: '#f4f'
                                                                                }}
                                                                            />
                                                                        : undefined
                                                                    }
                                                                </View>
                                                            : undefined
                                                        }

                                                        {
                                                            this.props.expandedWonderCard.props.props.cost.influence > 0
                                                            ? 
                                                                <View style={[{height: cardHeight-50}, styles.progressBarCon]}>
                                                                    {influenceTicks}
                                                                    {
                                                                        progress[flag]
                                                                        ? 
                                                                            <Image 
                                                                                source={require('../../assets/symbols/actions/Influence.png')}
                                                                                resizeMode='contain'
                                                                                style={{
                                                                                    position: 'absolute', 
                                                                                    width: 25,
                                                                                    height: 25,
                                                                                    borderRadius: 10,
                                                                                    bottom: (progress[flag].influence === 1 ? 0 : progress[flag].influence*influenceSpacing-30), 
                                                                                    backgroundColor: '#f4f'
                                                                                }}
                                                                            />
                                                                        : undefined
                                                                    }
                                                                </View>
                                                            : undefined
                                                        }
                                                        
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    </View>
                                : undefined
                            }
                        </View>
                    </View>
                </View>
            </View>
        } else if(this.props.expandHandCard){
            // HAND CARD
            return <View pointerEvents='box-none' style={{width: '100%', height: '100%', position: 'absolute'}}>
                <View style={{backgroundColor: '#000', position:'absolute', width: cardWidth, height: cardHeight, left: ((screenWidth/2) - (cardWidth/2)), top: 25}}>
                    {this.props.expandedHandCard}
                    <TouchableOpacity 
                        style={{
                            position: 'absolute', 
                            height: '50%', 
                            width: '100%', 
                            top: 0
                        }}
                        onPress={this.props.unExpandHandCard} 
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute', 
                            height: '50%', 
                            width: '50%', 
                            bottom: 0, 
                            left: 0, 
                            backgroundColor: 'rgba(150, 50, 0, 0.7)' 
                        }}
                        onPress={() => {this.props.chooseOption(1, this.props.expandedHandCard)}}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute', 
                            height: '50%', 
                            width: '50%', 
                            bottom: 0, 
                            right: 0, 
                            backgroundColor: 'rgba(150, 50, 0, 0.7)' 
                        }}
                        onPress={() => {this.props.chooseOption(2, this.props.expandedHandCard)}}
                    />
                </View>
                    
                    {
                        (
                            (
                                this.props.expandedHandCard.props.props.type === 'worker' 
                                && 
                                this.props.player.capital.workers.length < this.props.player.natural_wonders.length + 1
                            )
                        || 
                            (
                                this.props.expandedHandCard.props.props.type === 'army' 
                                && 
                                this.props.player.capital.armies.length < this.props.player.natural_wonders.length + 1
                            ) 
                        )
                        ? 
                            <View style={{
                                position: 'absolute', 
                                right: -150,
                                left: ((screenWidth/2) - (cardWidth/2) + cardWidth),
                                top: 30,
                                justifyContent: 'flex-start',
                                height: '100%',
                                // backgroundColor: '#0f3'
                            }}>
                                <TouchableOpacity 
                                    style={{
                                        // width: 150,
                                        // height: 30,
                                        alignSelf: 'flex-start',
                                        backgroundColor: '#f0f',
                                        borderRadius: 50,
                                        padding: 20,
                                    }}
                                    onPress={() => {this.props.putOnCapital(this.props.expandedHandCard)}}
                                >
                                    <Text>Put on Capital</Text>
                                </TouchableOpacity>
                            </View>
                        : undefined
                    }
            </View>
        } else{
            // NO CARD
            return <View></View>;
        }
	}
}

const styles = StyleSheet.create({
    sideBubbles: {
		width: 50, 
		height: 50, 
		borderRadius: 25, 
		backgroundColor: '#555', 
		padding: 8,
		alignSelf: 'flex-start'
	},
	sideBubblesCon: {
		// width: 150,
		marginBottom: 10
    },
    flagGroupContainer: {
        height: '100%',
        flexDirection: 'row',
        // backgroundColor: "rgba(123,59,23,0.5)"
    }, 
    flagContainer: {
        height: '100%', 
        width: 75, 
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // margin: 5,
    },
    progressBarCon: { 
        flexDirection: 'column-reverse', 
        width: 25, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        justifyContent: 'space-between', 
        marginTop: 50
    }
});
  
export default ExpandedCards = connect(mapStateToProps)(ExpandedCards1);