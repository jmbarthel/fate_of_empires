import React from 'react';
import { Image } from "react-native";

export default Boudica = (props) => {
    const type = 'person';
    const name = 'Boudica';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/Boudica.jpg')} />
}