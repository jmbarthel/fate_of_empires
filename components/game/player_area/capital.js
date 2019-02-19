import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import { connect } from 'react-redux';
import CapitalCard from './capital_card.js';


const mapStateToProps = state => {
    return { ...state };
};

class Capital1 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={[this.props.style, styles.container, {flexDirection: 'row'}]}>
					{
						this.props.capital.workers.length > 0
						?
						<View style={[{width: '48%'}, {bottom: 50 - (50*this.props.capital.workers.length)}]}>
							{this.props.capital.workers.map((card, i) => {
								return <CapitalCard key={i} num={i} card={card} hand={true}/>
							})}
						</View>
						: undefined
					}
					{
						this.props.capital.armies.length > 0
						? 
						<View style={[{width: '48%'}, {bottom: 50 - (50*this.props.capital.armies.length)}]}>
							{this.props.capital.armies.map((card, i) => {
								return <CapitalCard key={i} num={i} card={card} hand={true}/>
							})}
						</View>
						: undefined
					}
				{this.props.capital.workers.length === 0 && this.props.capital.armies.length === 0
					? <Text style={{color: '#fff'}}>Capital</Text>
					: undefined
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%'
    },
});
  
export default Capital = connect(mapStateToProps)(Capital1);