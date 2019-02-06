import React from 'react';
import { Image } from "react-native";

export default HuaMulan = (props) => {
    const type = 'person';
    const name = 'HuaMulan';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/HuaMulan.jpg')} />
}