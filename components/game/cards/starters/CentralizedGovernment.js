import React from 'react';
import { Image } from "react-native";

export default CentralizedGovernment = (props) => {
    const cost = 5; const type='government';
    const name = 'CentralizedGovernment';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/starters/CentralizedGovernment.jpg')} />
}