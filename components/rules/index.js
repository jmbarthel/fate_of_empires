import React from 'react';
import { StyleSheet, Text, ScrollView, Image } from "react-native";
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return { ...state };
};

class Rules1 extends React.Component {
	constructor() {
		super();
		this.state = {};
	}

  render() {
		return (
			<ScrollView>
				<Text style={{fontSize:96}}>Scroll me plz</Text>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Text style={{fontSize:96}}>If you like</Text>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Text style={{fontSize:96}}>Scrolling down</Text>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Text style={{fontSize:96}}>What's the best</Text>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Text style={{fontSize:96}}>Framework around?</Text>
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
				<Text style={{fontSize:80}}>React Native</Text>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
  
export default Rules = connect(mapStateToProps)(Rules1);