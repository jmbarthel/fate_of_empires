import React from 'react';
import { Image, View, Text } from "react-native";

export default AlbertEinstein = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'AlbertEinstein', 
        display_name: 'Albert Einstein',
        region: 'green',
        cost: {
            gold: 12,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    science: 6, 
                }
            },
            2: {
                produceResource: {
                    toward: {
						A_M_wonders: {
							science: 9, 
						}, 
					}
                },
            }
        }
    }
    
    if(props.expanded){
        return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/AlbertEinstein.jpg')} />
    } else{
        return (
            <View 
                props={props} 
                style={{
                    width: '100%', 
                    height: '100%'
                }}
            >
                <Image 
                    style={{
                        width: '100%', 
                        height: '100%'
                    }} 
                    props={props} 
                    source={require('../../../../assets/people/pics/AlbertEinstein.jpg')} 
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
                            textShadowColor:'#000',
                            textShadowOffset:{
                                width: 0.5,
                                height: 0.5
                            },
                            textAlign: 'center',
                            textShadowRadius: 1,
                            fontSize: 8.5
                        }}
                    >
                        {props.display_name}
                    </Text>
                </View>
                
                <View 
                    style={{
                        width: '60%',
                        height: '25%',
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        flexDirection: 'row',
                        fontWeight: 'bold', 
                        backgroundColor: "rgba(244, 233, 66, 0.6)", 
                        borderRadius: 25,
                    }}
                >
                    <Text style={{
                        color: '#FFF',
                        margin: 1,
                        textShadowColor:'#000',
                        textShadowOffset:{
                            width: 0.2,
                            height: 0.2
                        },
                        textShadowRadius: 2
                    }}>
                        {props.cost.gold}
                    </Text>
                    <Image 
                        source={require('../../../../assets/symbols/actions/Gold.png')}
                        style={{
                            width: '50%', 
                            height: '100%', 
                            right: 0, 
                            bottom: 0
                        }} 
                    />
                </View>
            </View>
        );
    }
}