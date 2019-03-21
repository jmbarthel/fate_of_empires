import React from 'react';
import { View, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

const mapStateToProps = state => {
    return { ...state };
};

class ExpandedCards1 extends React.Component {
	constructor(props) {
        super(props);
        
        let screenHeight = this.props.screenHeight,
		    cardHeight = this.props.cardHeight,
		    screenWidth = this.props.screenWidth,
            cardWidth = this.props.cardWidth;

        this.state = {
            screenHeight, 
            cardHeight, 
            screenWidth, 
            cardWidth,
        };

        this.goldProgressAnimation = false;
        this.scienceProgressAnimation = false;
        this.influenceProgressAnimation = false;

        this.goldSpacing = null;
        this.scienceSpacing = null;
        this.influenceSpacing = null;
        
        this.tempscience = 0;
        this.tempgold = 0;
        this.tempinfluence = 0;
    }
    
    getImage(flag){
        // This kind of sucks because you cannot dynamically require img files, the 
        // location needs to be a literal string, no variable evaluation.
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

    componentWillUpdate(nextProps){
        console.log('willupdate', (nextProps && nextProps.expandedWonderCard && (!this.props.expandedWonderCard || nextProps.expandedWonderCard.props.props.name != this.props.expandedWonderCard.props.props.name)));

        if(nextProps.expandedWonderCard && (!this.props.expandedWonderCard || nextProps.expandedWonderCard.props.props.name != this.props.expandedWonderCard.props.props.name) && nextProps.expandedWonderCard.props.props.claimedBy[this.props.player.flag]){
            let card = nextProps.expandedWonderCard.props.props,
                flag = this.props.player.flag,
                cardHeight = this.state.cardHeight - 50;

            console.log('updating');

            if(card.cost.gold >= 0 && card.progress[flag].gold >= 0){

                this.goldSpacing = ((cardHeight) / (card.cost.gold));

                let y = ((card.progress[flag].gold === 1)
                    ? (cardHeight) 
                    : ((cardHeight) - (card.progress[flag].gold * this.goldSpacing)))  

                this.goldProgressAnimation = new Animated.ValueXY({ x: 0, y: y });

                console.log('gold');
            }
            if(card.cost.science >= 0 && card.progress[flag].science >= 0){

                this.scienceSpacing = ((cardHeight) / (card.cost.science));

                let y = (card.progress[flag].science === 1 
                    ? cardHeight 
                    : (cardHeight) - (card.progress[flag].science * this.scienceSpacing))

                this.scienceProgressAnimation = new Animated.ValueXY({ x: 0, y: y });
                console.log('sci');
            }
            if(card.cost.influence >= 0 && card.progress[flag].influence >= 0){

                this.influenceSpacing = ((cardHeight) / (card.cost.influence));

                let y = (card.progress[flag].influence === 1 
                    ? cardHeight 
                    : (cardHeight) - (card.progress[flag].influence * this.influenceSpacing))
                
                this.influenceProgressAnimation = new Animated.ValueXY({ x: 0, y: y });
                console.log('inf');
            }

            return true;
        } else if(nextProps && (nextProps.expandHandCard || nextProps.expandSupplyCard || !nextProps.expandWonderCard)){

            console.log('setting false');

            this.goldProgressAnimation = false;
            this.scienceProgressAnimation = false;
            this.influenceProgressAnimation = false;
            this.goldSpacing = null;
            this.scienceSpacing = null;
            this.influenceSpacing = null;
            this.tempgold = 0;
            this.tempscience = 0;
            this.tempinfluence = 0;
            return true;

        } else{

            return true;
        }
    }

    addResourceToWonder(resource){
        
        if(this.props.player.resources[resource] - this['temp'+resource] - 1 < 0){
            return false;
        }

        let _this = this,
            card = this.props.expandedWonderCard.props.props,
            spacing = this[resource+'Spacing'], 
            tempResource = 'temp'+resource,
            flag = this.props.player.flag,
            cardHeight = this.state.cardHeight - 50;

        _this[tempResource]++;

        this.setState(prevState => {
            return prevState;
        }, () => {

            let amountOfResource = card.progress[flag][resource] + _this[tempResource];

            let y = ((amountOfResource === 1 )
                ? (cardHeight - 20) 
                : ((cardHeight) - (amountOfResource * (spacing))));

            Animated.spring(_this[resource+'ProgressAnimation'], {
                toValue: { x: 0, y: y },
                friction: 6,
            }).start();

        });
    }

    // confirmResourceAdd(){
    //     console.log('Confirming');
    // }

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
                            onPress={() => {this.props.buySupplyCard(this.props.expandedSupplyCard, this.props.playerNumber)}}
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
            return <View pointerEvents='box-none' style={[styles.containerCon, {width: cardWidth, height: cardHeight}]}>
                {this.props.expandedWonderCard}
                <TouchableOpacity 
                    onPress={this.props.unExpandWonderCard}
                    style={{position: 'absolute', height: '70%', width: '100%', top: 0}}
                ></TouchableOpacity>
                <TouchableOpacity
                    style={{position: 'absolute', height: '30%', width: '50%', bottom: 0, left: 0 }}
                ></TouchableOpacity>
                <TouchableOpacity
                    style={{position: 'absolute', height: '30%', width: '50%', bottom: 0, right: 0 }}
                ></TouchableOpacity>

                {
                    this.tempgold > 0 || this.tempscience > 0 || this.tempinfluence > 0
                    ? 
                        <TouchableOpacity
                            style={{position: 'absolute', width: '50%', backgroundColor: '#f04', borderRadius: 15}}
                        >
                            <Text style={{textAlign: 'center'}}>Confirm Resources</Text>
                        </TouchableOpacity>
                    : undefined
                }

                <View style={[{left: (cardWidth)}, styles.sideCon]}>
                    <View style={{flexDirection: 'row'}}>
                        <View>

                            {
                                (
                                    !this.props.player.claimedWonder
                                    && this.props.player.claimedWonder !== this.props.expandedWonderCard.props.props.name
                                    && !this.props.expandedWonderCard.props.props.claimedBy[this.props.player.flag]
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
                                                
                                        <Image 
                                            source={require('../../assets/symbols/goldResourceBack.png')}
                                            style={{
                                                position: 'absolute',
                                                width: 50, 
                                                height: 50
                                            }}
                                        />

                                        <View style={styles.sideBubbles}>
                                            <Image 
                                                source={require('../../assets/symbols/actions/Gold.png')}
                                                style={{
                                                    width: '100%', 
                                                    height: '100%', 
                                                    position: 'absolute',
                                                }} 
                                            />
                                            <Text style={styles.sideBubblesLabel}>{this.props.player.resources.gold - this.tempgold}</Text>
                                        </View>
                                        
                                        {
                                            this.props.expandedWonderCard.props.props.claimedBy[this.props.player.flag]

                                            ? 
                                                <TouchableOpacity style={styles.sideBubbles} onPress={this.addResourceToWonder.bind(this, 'gold')}>
                                                    <Ionicons 
                                                        style={{
                                                            width: '100%', 
                                                            height: '100%', 
                                                            position: 'absolute',
                                                        }} 
                                                        name="ios-add-circle" 
                                                        size={32} 
                                                        color="white" 
                                                    />
                                                </TouchableOpacity>

                                            : undefined
                                        }

                                    </View>

                                : undefined
                            }
                            {
                                this.props.expandedWonderCard.props.props.cost.science > 0 
                                ? 
                                    <View style={styles.sideBubblesCon}>
                                        
                                        <Image 
                                            source={require('../../assets/symbols/scienceResourceBack.png')}
                                            style={{
                                                position: 'absolute',
                                                width: 50, 
                                                height: 50
                                            }}
                                        />

                                        <View style={styles.sideBubbles}>
                                            <Image 
                                                source={require('../../assets/symbols/actions/Science.png')}
                                                style={{
                                                    width: '100%', 
                                                    height: '100%', 
                                                    position: 'absolute',
                                                }} 
                                            />
                                            <Text style={styles.sideBubblesLabel}>{this.props.player.resources.science - this.tempscience}</Text>
                                        </View>
                                        
                                        {
                                            this.props.expandedWonderCard.props.props.claimedBy[this.props.player.flag]

                                            ? 
                                                <TouchableOpacity style={styles.sideBubbles} onPress={this.addResourceToWonder.bind(this, 'science')}>
                                                    <Ionicons 
                                                        style={{
                                                            width: '100%', 
                                                            height: '100%', 
                                                            position: 'absolute',
                                                        }} 
                                                        name="ios-add-circle" 
                                                        size={32} 
                                                        color="white" 
                                                    />
                                                </TouchableOpacity>
                                            : undefined
                                        }

                                    </View>
                                    
                                : undefined
                            }
                            {
                                this.props.expandedWonderCard.props.props.cost.influence > 0 
                                ? 
                                <View style={styles.sideBubblesCon}>
                                        
                                <Image 
                                    source={require('../../assets/symbols/influenceResourceBack.png')}
                                    style={{
                                        position: 'absolute',
                                        width: 50, 
                                        height: 50
                                    }}
                                />

                                <View style={styles.sideBubbles}>
                                    <Image 
                                        source={require('../../assets/symbols/actions/Influence.png')}
                                        style={{
                                            width: '100%', 
                                            height: '100%', 
                                            position: 'absolute',
                                        }} 
                                    />
                                    <Text style={styles.sideBubblesLabel}>{this.props.player.resources.influence - this.tempinfluence}</Text>
                                </View>

                                {
                                    this.props.expandedWonderCard.props.props.claimedBy[this.props.player.flag]

                                    ? 
                                    <TouchableOpacity style={styles.sideBubbles} onPress={this.addResourceToWonder.bind(this, 'influence')}>
                                        <Ionicons 
                                            style={{
                                                width: '100%', 
                                                height: '100%', 
                                                position: 'absolute',
                                            }} 
                                            name="ios-add-circle" 
                                            size={32} 
                                            color="white" 
                                        />
                                    </TouchableOpacity>

                                    : undefined
                                }

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

                                                let resources = this.props.expandedWonderCard.props.props.claimedBy[flag],
                                                    progress = this.props.expandedWonderCard.props.props.progress,
                                                    cost = this.props.expandedWonderCard.props.props.cost,
                                                    player = this.props.player,
                                                    flagImage = this.getImage(flag),
                                                    goldTicks = [], 
                                                    scienceTicks = [], 
                                                    influenceTicks = [],
                                                    scienceSpacing = this.scienceSpacing, 
                                                    influenceSpacing = this.influenceSpacing, 
                                                    goldSpacing = this.goldSpacing;

                                                if(cost.gold > 0){
                                                    for(let i = 0; i < cost.gold; i++){
                                                        goldTicks.push(
                                                            <View key={i}
                                                                style={{
                                                                    width: '100%',
                                                                    borderRadius: 15,
                                                                    backgroundColor: 'rgb(150, 150, 150)',
                                                                }}
                                                            ><Text style={{fontSize: 10, textAlign: 'center'}}>{i+1}</Text></View>
                                                        );
                                                    }
                                                }
                                                
                                                if(cost.science > 0){
                                                    for(let i = 0; i < cost.science; i++){
                                                        scienceTicks.push(
                                                            <View key={i}
                                                                style={{
                                                                    width: '100%',
                                                                    borderRadius: 15, 
                                                                    backgroundColor: 'rgb(150, 150, 150)',
                                                                }}
                                                            ><Text style={{fontSize: 10, textAlign: 'center'}}>{i+1}</Text></View>
                                                        );
                                                    }
                                                }

                                                if(cost.influence > 0){
                                                    for(let i = 0; i < cost.influence; i++){
                                                        influenceTicks.push(
                                                            <View key={i}
                                                                style={{
                                                                    width: '100%',
                                                                    borderRadius: 15, 
                                                                    backgroundColor: 'rgb(150, 150, 150)',
                                                                }}
                                                            ><Text style={{fontSize: 10, textAlign: 'center'}}>{i+1}</Text></View>
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
                                                                                    backgroundColor: '#f4f'
                                                                                }, player.flag === flag && this.goldProgressAnimation 
                                                                                    ? this.goldProgressAnimation.getLayout() 
                                                                                    : {bottom: (progress[flag].gold === 1 ? 0 : progress[flag].gold * goldSpacing-30)}]}
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
                                                                                    backgroundColor: '#f4f'
                                                                                }, player.flag === flag && this.scienceProgressAnimation
                                                                                    ? this.scienceProgressAnimation.getLayout() 
                                                                                    : {bottom: progress[flag].science === 1 ? 0 : progress[flag].science*scienceSpacing-30}]}
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
                                                                            <Animated.Image 
                                                                                source={require('../../assets/symbols/actions/Influence.png')}
                                                                                resizeMode='contain'
                                                                                style={[{
                                                                                    position: 'absolute', 
                                                                                    width: 25,
                                                                                    height: 25,
                                                                                    borderRadius: 10,
                                                                                    backgroundColor: '#f4f'
                                                                                }, player.flag === flag && this.influenceProgressAnimation 
                                                                                    ? this.influenceProgressAnimation.getLayout() 
                                                                                    : {bottom: (progress[flag].influence === 1 ? 0 : progress[flag].influence*influenceSpacing-30)} ]}
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
                        onPress={() => {this.props.chooseOption(1, this.props.expandedHandCard, this.props.playerNumber)}}
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
                        onPress={() => {this.props.chooseOption(2, this.props.expandedHandCard, this.props.playerNumber)}}
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
                                    onPress={() => {this.props.putOnCapital(this.props.expandedHandCard, this.props.playerNumber)}}
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
    containerCon: {
        backgroundColor: '#000', 
        position:'absolute', 
        left: 15,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    sideCon: {
        position: 'absolute', 
        right: -150,
        justifyContent: 'flex-start',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    sideBubbles: {
		width: 50, 
		height: 50, 
        borderRadius: 25, 
        justifyContent: 'center', 
        alignItems: 'center',
		padding: 8,
		alignSelf: 'flex-start'
	},
	sideBubblesCon: {
        marginBottom: 10,
        marginLeft: 5,
        flexDirection: 'row',
    },
    sideBubblesLabel: {
        color: '#f06', 
        fontWeight: 'bold', 
        fontSize: 30, 
        textShadowColor:'#000',
        textShadowOffset:{
            width: 1,
            height: 1
        },
        textShadowRadius: 1,
    },
    flagGroupContainer: {
        height: '100%',
        flexDirection: 'row',
        backgroundColor: "rgba(0,0,0,0.5)"
    }, 
    flagContainer: {
        height: '100%', 
        width: 75, 
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'rgba(150, 0, 0, 0.5)',
        marginRight: 10,
        marginLeft: 5,
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