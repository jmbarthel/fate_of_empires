import React from 'react';
import { Image } from "react-native";
import { gainResources, gainResourcesPer } from '../cardEffectFuncs/utilities.js';

export default Athens = (props) => {
    props = {
        ...props, 
        type: 'city', 
        name: 'Athens', 
        cost: {
            gold: 0,
            influence: 10, 
            science: 0,
        },
        choiceCount: 2, 
        choices: {
            1: [gainResources.bind(this, {influence: 4})],
            2: [gainResourcesPer.bind(this, 1, 'any', 'eachWorkerOnCapital')],
        }
    }

    return <Image style={{width: '100%', height: '100%'}} props={props} source={require('../../../../assets/cities/Athens.jpg')} />
}