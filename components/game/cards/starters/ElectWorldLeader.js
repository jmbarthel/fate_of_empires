import React from 'react';
import { Image } from "react-native";

export default ElectWorldLeader = (props) => {
    const type = 'event';
    const name = 'ElectWorldLeader';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/ElectWorldLeader.jpg')} />
}