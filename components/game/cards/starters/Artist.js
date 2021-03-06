import React from 'react';
import { Image, View, Text } from "react-native";
import { gainResources } from '../cardEffectFuncs/utilities.js';

export default Artist = (props) => {
    props = {
        ...props, 
        type: 'worker', 
        name: 'Artist', 
        display_name: 'Artist', 
        cost: {
            gold: 0,
            influence: 0, 
            science: 0,
            any: 5,
        },
        choiceCount: 1, 
        choices: {
            1: [gainResources.bind(this, {influence: 3})],
            // 1: {
            //     produceResource: {
            //         gold: 0,
            //         science: 0, 
            //         influence: 3,
            //         any: 0,
            //     }
            // }
        }
    }
    
    if(props.expanded){
        return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/Artist.jpg')} />
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
                    source={require('../../../../assets/starters/pics/Artist.jpg')} 
                />

                <View 
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        width: '100%', 
                        height: '25%',
                        position: 'absolute'
                    }}
                >
                    <Text 
                        style={{
                            top: 0, 
                            color: '#FFF',
                            textShadowColor:'#003',
                            textShadowOffset:{
                                width: 0.2,
                                height: 0.2
                            },
                            textAlign: 'center',
                            textShadowRadius: 2,
                            fontSize: 12
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

{props.hand ? null 
                
    : 
        <View style={{width: '100%', height: '100%', position: 'absolute'}}>
                <Image 
                    source={require('../../../../assets/symbols/wildResourceBack.png')}
                    style={{
                        width: '75%', 
                        position: 'absolute',
                        height: '25%', 
                        right: -5, 
                        bottom: 0
                    }} 
                />

                <View 
                    style={{
                        width: '70%',
                        height: '25%',
                        position: 'absolute',
                        right: -9,
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
                        textShadowColor:'#003',
                        textShadowOffset:{
                            width: 0.2,
                            height: 0.2
                        },
                        textShadowRadius: 2,
                        marginRight: 4
                    }}>
                        {props.cost.any}
                    </Text>

                    <Image 
                        source={require('../../../../assets/symbols/actions/AnyMix.png')}
                        style={{
                            width: '40%', 
                            height: '100%', 
                            // right: 5
                            // bottom: 0.5
                        }} 
                    />
                </View>
            </View>
}
</View>

        );
    }
}