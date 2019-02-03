import React from 'react';
import { Image } from "react-native";

export default class Banker extends React.Component {
    constructor(){
        super();
        this.real = true;
        this.name = 'Banker';
    }

    render(){ 
        return (
            <Image style={{width: '100%', height: '100%'}} source={require('../../../assets/starters/Banker.jpg')} />
        )
    }
}