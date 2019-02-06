import React from 'react';
import { Image } from "react-native";

export default QueenVictoria = (props) => {
    const type = 'person';
    const name = 'QueenVictoria';
    props = {...props, type, name}
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/QueenVictoria.jpg')} />
}