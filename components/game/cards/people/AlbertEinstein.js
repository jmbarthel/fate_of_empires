import React from 'react';
import { Image, View, Text } from "react-native";
import { gainResources } from '../cardEffectFuncs/utilities';

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
            1: [gainResources.bind(this, {science: 6})],
            2: [gainResources.bind(this, {toward: {A_M_wonders: {science: 9}}})]
            // 1: {
            //     produceResource: {
            //         science: 6, 
            //     }
            // },
            // 2: {
            //     produceResource: {
            //         toward: {
			// 			A_M_wonders: {
			// 				science: 9, 
			// 			}, 
			// 		}
            //     },
            // }
        },
        returnCard: (props) => {
            return AlbertEinstein(props)
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
                            fontWeight: 'bold', 
                            textShadowColor:'#000',
                            textShadowOffset:{
                                width: 1,
                                height: 1
                            },
                            textAlign: 'center',
                            textShadowRadius: 1,
                            fontSize: 8.5,
                        }}
                    >
                        {props.display_name}
                    </Text>
                </View>
                
                <Image 
                    source={require('../../../../assets/symbols/cardtypes/Person.png')}
                    style={{
                        width: '30%', 
                        position: 'absolute',
                        height: '25%', 
                        left: 0, 
                        bottom: 0
                    }} 
                />
                
                { props.hand 
                
                ? null 
                
                : 
                    <View style={{width: '100%', height: '100%', position: 'absolute'}}>

                        <Image 
                            source={require('../../../../assets/symbols/goldResourceBack.png')}
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
                                fontWeight: 'bold', 
                                textShadowColor:'#003',
                                textShadowOffset:{
                                    width: 0.2,
                                    height: 0.2
                                },
                                textShadowRadius: 2,
                                marginRight: 8
                            }}>
                                {props.cost.gold}
                            </Text>

                            <Image 
                                source={require('../../../../assets/symbols/actions/Gold.png')}
                                style={{
                                    width: '40%', 
                                    height: '100%', 
                                    right: 8,
                                    // marginLeft: 5,
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