import React from 'react';
import { Image } from "react-native";

export default MurasakiShikibu = (props) => {
    const type = 'person';
    const name = 'MurasakiShikibu';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/MurasakiShikibu.jpg')} />
}