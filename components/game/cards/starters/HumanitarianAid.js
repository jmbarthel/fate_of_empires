import React from 'react';
import { Image, Text, View } from "react-native";

export default HumanitarianAid = (props) => {
    props = {
        ...props, 
        type: 'army', 
        name: 'HumanitarianAid', 
        display_name: 'Human Aid', 
        region: null,
        cost: {
            gold: 0,
            influence: 0, 
            science: 0,
            any: 0,
        },
        choiceCount: 1, 
        choices: {
            1: {
                advanceTime: 1
            }
        }
    }

    if(props.expanded){
        return <Image 
            style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/HumanitarianAid.jpg')} />
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
                    source={require('../../../../assets/starters/pics/HumanitarianAid.jpg')} 
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
                    source={require('../../../../assets/symbols/cardtypes/Army.png')}
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
}