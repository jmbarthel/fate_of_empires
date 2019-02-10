import React from 'react';
import { Image } from "react-native";

export default ChichenItza = (props) => {
    const cost = 5; 
    const type='ancient_wonder';
    const name = 'ChichenItza';
    props = {...props, type, name}
    
    if(props.expanded){
        return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients/ChichenItza.jpg')} />
    } else{
        return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients_sprites/ChichenItza.png')} />
    }
}