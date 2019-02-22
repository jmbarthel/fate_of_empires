import React from 'react';
import { Image, View, Text } from "react-native";

export default Peasant = (props) => {
    props = {
        ...props, 
        type: 'worker', 
        name: 'Peasant', 
        display_name: 'Peasant', 
        region: null,
        cost: {
            gold: 0,
            influence: 0, 
            science: 0,
            any: 5,
        },
        choiceCount: 1, 
        choices: {
            1: {
                produceResource: {
                    gold: 0,
                    science: 0, 
                    influence: 0,
                    any: 1,
                }
            }
        }
    }
    
    if(props.expanded){
        return <Image 
            style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/Peasant.jpg')} />
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
                    source={require('../../../../assets/starters/pics/Peasant.png')} 
                />

                <View 
                    style={{
                        position: 'absolute',
                        width: '100%', 
                        height: '25%',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)'
                    }}
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
                            fontSize: 12,
                        }}
                    >
                        {props.display_name}
                    </Text>
                </View>
                
                <Image 
                    source={require('../../../../assets/symbols/cardtypes/Worker.png')}
                    style={{
                        width: '30%', 
                        position: 'absolute',
                        height: '25%', 
                        left: 0, 
                        bottom: 0
                    }} 
                />
            </View>
        );
    }
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/Peasant.jpg')} />
}