import React from 'react';
import { Image } from "react-native";

export default GreatLibraryAlexandria = (props) => {
    const cost = 5; const type='ancient_wonder';
    const name = 'GreatLibraryAlexandria';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../../assets/wonders/ancients/GreatLibraryAlexandria.jpg')} />
}