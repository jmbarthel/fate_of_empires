import React from 'react';
import { Image } from "react-native";

export default Hatshepsut = (props) => {
    const type = 'person';
    const name = 'Hatshepsut';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/Hatshepsut.jpg')} />
}