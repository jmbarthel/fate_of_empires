import React from 'react';
import { Image } from "react-native";

export default NapoleonBonaparte = (props) => {
    const type = 'person';
    const name = 'NapoleonBonaparte';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/NapoleonBonaparte.jpg')} />
}