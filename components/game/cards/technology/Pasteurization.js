import React from 'react';
import { Image, View, Text } from "react-native";
import { drawCard, gainResourcesPer } from '../cardEffectFuncs/utilities';

export default Pasteurization = (props) => {
    props = {
        ...props, 
        type: 'technology', 
        name: 'Pasteurization', 
        display_name: 'Pasteurization', 
        region: 'green',
        cost: {
            gold: 0,
            influence: 0, 
            science: 12,
        },
        choiceCount: 1, 
        choices: {
            1: [drawCard, gainResourcesPer.bind(this, 1, 'any', 'eachWorkerOnCapital')]
            // 1: {
            //     draw: 1,
            //     produceResource: {
            //         eachWorkerOnCapital: {
            //             any: 1
            //         } 
            //     }
            // }
        },
        returnCard: (props) => {
            return Pasteurization(props)
        }
    }
    
    if(props.expanded){
        return <Image 
            style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Pasteurization.jpg')} />
    } else{
        return (
            <View 
                props={props} 
                style={{
                    width: '100%', 
                    height: '100%',
                    borderRadius: 10,
                }}
            >
                <Image 
                    style={{
                        width: '100%', 
                        height: '100%',
                        borderRadius: 10,
                    }} 
                    props={props} 
                    source={require('../../../../assets/technology/pics/Pasteurization.jpg')} 
                />

                <Image 
                    style={{
                        position: 'absolute',
                        top: -2,
                        right: 0,
                        width: '100%', 
                        height: '20%',
                    }}
                    resizeMode='contain'
                    source={require('../../../../assets/symbols/regions/Green2.png')} 
                />


                <View 
                    style={{
                        // backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        width: '100%', 
                        height: '25%',
                        position: 'absolute'
                    }}
                >
                    <Text 
                        style={{
                            top: 0, 
                            color: '#FFF',
                            fontWeight: 'bold',
                            textShadowColor:'#000',
                            textShadowOffset:{
                                width: 1,
                                height: 1
                            },
                            textAlign: 'center',
                            textShadowRadius: 1,
                            fontSize: 9,
                        }}
                    >
                        {props.display_name}
                    </Text>
                </View>
                
                <Image 
                    source={require('../../../../assets/symbols/cardtypes/Technology.png')}
                    style={{
                        width: '30%', 
                        position: 'absolute',
                        height: '25%', 
                        left: 0, 
                        bottom: 0
                    }} 
                />
                
                {props.hand ? null 
                
                : 
                <View style={{width: '100%', height: '100%', position: 'absolute'}}>
                    <Image 
                        source={require('../../../../assets/symbols/scienceResourceBack.png')}
                        style={{
                            width: '75%', 
                            position: 'absolute',
                            height: '25%', 
                            right: -6, 
                            bottom: 0
                        }} 
                    />

                    <View 
                        style={{
                            width: '70%',
                            height: '25%',
                            position: 'absolute',
                            right: -15,
                            bottom: 0,
                            flexDirection: 'row',
                            fontWeight: 'bold', 
                            // backgroundColor: "rgba(176, 66, 244, 0.6)", 
                            // borderRadius: 25,
                        }}
                    >
                        <Text style={{
                            color: '#FFF',
                            marginLeft: 4,
                            fontWeight: 'bold',
                            textShadowColor:'#003',
                            textShadowOffset:{
                                width: 0.2,
                                height: 0.2
                            },
                            textShadowRadius: 2,
                            // right: 3,
                            right: 8,
                        }}>
                            {props.cost.science}
                        </Text>

                        <Image 
                            source={require('../../../../assets/symbols/actions/Science.png')}
                            style={{
                                width: '40%', 
                                height: '100%', 
                                // right: 0,
                                right: 8,
                            }} 
                        />
                    </View>
                </View>
                }
            </View>
        );
    }
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Pasteurization.jpg')} />
}