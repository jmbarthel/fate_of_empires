import React from 'react';
import { Image, View, Text } from "react-native";

export default DwightDEisenhower = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'DwightDEisenhower', 
        display_name: 'Eisenhower', 
        region: 'blue',
        cost: {
            gold: 10,
            influence: 0, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: {
                produceResource: {
                    gold: 3, 
                    science: 3, 
                    influence: 0, 
                    any: 0,
                }
            },
            2: {
                produceResource: {
                    toward: {
                        city: {
                            gold: 0, 
                            science: 0, 
                            influence: 5,
                            any: 0
                        }
                    }
                }
            }
        }
    }
    
    if(props.expanded){
        return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/DwightDEisenhower.jpg')} />
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
                    source={require('../../../../assets/people/pics/DwightDEisenhower.jpg')} 
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
                    source={require('../../../../assets/symbols/regions/Blue2.png')} 
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
                            fontSize: 10,
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
                
                <Image 
                    source={require('../../../../assets/symbols/goldResourceBack.png')}
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
                        right: 8,
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
        );
    }
}