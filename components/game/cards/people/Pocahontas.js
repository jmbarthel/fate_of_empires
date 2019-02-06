import React from 'react';
import { Image } from "react-native";

export default Pocahontas = (props) => {
    const type = 'person';
    const name = 'Pocahontas';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/Pocahontas.jpg')} />
}