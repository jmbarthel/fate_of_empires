import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, Animated } from "react-native";

class ExpandedWonderProgressBar extends React.Component {
	constructor(props) {
        super(props);
        
        let screenHeight = this.props.screenHeight,
		    cardHeight = this.props.cardHeight,
		    screenWidth = this.props.screenWidth,
            cardWidth = this.props.cardWidth,
            scienceSpacing = this.props.expandedWonderCard ? ((cardHeight - 50) / (this.props.expandedWonderCard.props.props.cost.science || 1)) : 0,
            influenceSpacing = this.props.expandedWonderCard ? ((cardHeight - 50) / (this.props.expandedWonderCard.props.props.cost.influence || 1)) : 0,
            goldSpacing = this.props.expandedWonderCard ? ((cardHeight - 50) / (this.props.expandedWonderCard.props.props.cost.gold || 1)) : 0;

        this.state = {screenHeight, cardHeight, screenWidth, cardWidth, scienceSpacing, influenceSpacing, goldSpacing};
        
        this.goldProgressAnimation = null;
        this.scienceProgressAnimation = null;
        this.influenceProgressAnimation = null;
    }

    render(){
        return(


            <View>
                {
                    Object.keys(this.props.expandedWonderCard.props.props.claimedBy).length > 0
                    ? 
                        <View>
                            <View style={styles.flagGroupContainer}>
                                {Object.keys(this.props.expandedWonderCard.props.props.claimedBy).map((flag, i) => {

                                    let resources = this.props.expandedWonderCard.props.props.claimedBy[flag],
                                        progress = this.props.expandedWonderCard.props.props.progress,
                                        cost = this.props.expandedWonderCard.props.props.cost,
                                        player = this.props.player,
                                        flagImage = this.getImage(flag),
                                        goldTicks = [], 
                                        scienceTicks = [], 
                                        influenceTicks = [],
                                        scienceSpacing = this.state.scienceSpacing, 
                                        influenceSpacing = this.state.influenceSpacing, 
                                        goldSpacing = this.state.goldSpacing;

                                    if(cost.gold > 0){
                                        for(let i = 0; i < cost.gold; i++){
                                            goldTicks.push(
                                                <View key={i}
                                                    style={{
                                                        backgroundColor: 'rgb(255, 255, 255)',
                                                    }}
                                                ><Text style={{fontSize: 10}}>{i+1}</Text></View>
                                            );
                                        }
                                    }
                                    
                                    if(cost.science > 0){
                                        for(let i = 0; i < cost.science; i++){
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

                                    if(cost.influence > 0){
                                        for(let i = 0; i < cost.influence; i++){
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
                                                cost.gold > 0
                                                ? 
                                                    <View style={[{height: cardHeight-50}, styles.progressBarCon]}>
                                                        {goldTicks}
                                                        {
                                                            progress[flag]
                                                            ? 
                                                                <Animated.Image 
                                                                    source={require('../../assets/symbols/actions/Gold.png')}
                                                                    resizeMode='contain'
                                                                    style={[{
                                                                        position: 'absolute', 
                                                                        width: 25,
                                                                        height: 25,
                                                                        borderRadius: 10,
                                                                        bottom: (progress[flag].gold === 1 ? 0 : progress[flag].gold*goldSpacing-30), 
                                                                        backgroundColor: '#f4f'
                                                                    }, this.goldProgressAnimation.getLayout()]}
                                                                />
                                                            : undefined
                                                        }
                                                    </View>
                                                : undefined
                                            }

                                            {
                                                cost.science > 0
                                                ?   
                                                    <View style={[{height: cardHeight-50}, styles.progressBarCon]}>
                                                        {scienceTicks}
                                                        {
                                                            progress[flag]
                                                            ? 
                                                                <Animated.Image 
                                                                    source={require('../../assets/symbols/actions/Science.png')}
                                                                    resizeMode='contain'
                                                                    style={[{
                                                                        position: 'absolute', 
                                                                        width: 25,
                                                                        height: 25,
                                                                        borderRadius: 10,
                                                                        bottom: (progress[flag].science === 1 ? 0 : progress[flag].science*scienceSpacing-30), 
                                                                        backgroundColor: '#f4f'
                                                                    }, this.scienceProgressAnimation.getLayout()]}
                                                                />
                                                            : undefined
                                                        }
                                                    </View>
                                                : undefined
                                            }

                                            {
                                                cost.influence > 0
                                                ? 
                                                    <View style={[{height: cardHeight-50}, styles.progressBarCon]}>
                                                        {influenceTicks}
                                                        {
                                                            progress[flag]
                                                            ? 
                                                                <Image 
                                                                    source={require('../../assets/symbols/actions/Influence.png')}
                                                                    resizeMode='contain'
                                                                    style={[{
                                                                        position: 'absolute', 
                                                                        width: 25,
                                                                        height: 25,
                                                                        borderRadius: 10,
                                                                        bottom: (progress[flag].influence === 1 ? 0 : progress[flag].influence*influenceSpacing-30), 
                                                                        backgroundColor: '#f4f'
                                                                    }, this.influenceProgressAnimation.getLayout()]}
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
        )
    }
