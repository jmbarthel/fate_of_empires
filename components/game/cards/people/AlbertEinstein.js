import React from 'react';
import { Image } from "react-native";

export default AlbertEinstein = (props) => {
    props = {
        ...props, 
        type: 'person', 
        name: 'AlbertEinstein', 
        cost: {
            gold: 0,
            influence: 3, 
            science: 0,
        },
    }
    
    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/people/AlbertEinstein.jpg')} />
}