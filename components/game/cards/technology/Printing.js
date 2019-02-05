import React from 'react';
import { Image } from "react-native";

export default Printing = (props) => {
    const type = 'technology';
    const name = 'Printing';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/technology/Printing.jpg')} />
}