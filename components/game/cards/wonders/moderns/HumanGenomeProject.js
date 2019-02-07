import React from 'react';
import { Image } from "react-native";

export default HumanGenomeProject = (props) => {
    const cost = 5; const type='modern_wonder';
    const name = 'HumanGenomeProject';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/moderns/HumanGenomeProject.jpg')} />
}