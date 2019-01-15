import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { connect } from 'react-redux';
import SharedArea from '../game/shared_area/index.js';
import PlayerArea from '../game/player_area/index.js';
import Opponent from '../game/opponent/index.js';
import { Ionicons } from '@expo/vector-icons';

const mapStateToProps = state => {
    return { ...state };
};

class NewGame1 extends React.Component {
	constructor(props) {
		super(props);

		let enemyArr = {};

		for(let i = 1; i <= props.num_of_enemies; i++){
			enemyArr[i] = {
				id: i, 
				expanded: false,
				name: 'enemy '+i
			}
		}

		this.state = {
			enemies: enemyArr, 
			dim: false,
		};
	}

	closeAllEnemies(){
		this.setState(prevState => {
			let enemies = prevState.enemies;
			return {
				...prevState, 
				enemies: Object.keys(enemies).reduce((a, i)=>{
					let enemy = enemies[i];
					enemy.expanded = false;
					enemy.animateEntry = false;
					a[i] = enemy;
					return a;
				},{}), 
				dim: false
			}
		});
	}

	expandEnemy(enemyId, event){
		if(event){
			event.preventDefault();
		}

		if(!this.state.enemies[enemyId].expanded){
			this.setState(prevState => {
				let enemies = prevState.enemies, 
					expanded = prevState.enemies[enemyId].expanded;
	
				Object.keys(enemies).map(id=>{ enemies[id].expanded = false; })
	
				enemies[enemyId].expanded = !expanded;
	
				let dim = Object.keys(enemies).reduce((a, i)=>{
					i = enemies[i];
					return a || i.expanded;
				}, false);
	
				return {...prevState, enemies, dim}
			});
		}
	}

	goToNextEnemy(direction, id){
		if(direction === -1){
			// swipe left - go right in the list
			if(id === this.props.num_of_enemies){
				// if we are already at the last - go to the first
				this.setState((prevState) => {
					let enemies = prevState.enemies;
					enemies[id].expanded = false;
					enemies[1].expanded = true;
					enemies[1].animateEntry = 1;

					return {
						...prevState, 
						enemies
					}
				});
			} else{
				this.setState((prevState) => {
					let enemies = prevState.enemies;
					enemies[id].expanded = false;
					enemies[id + 1].expanded = true;
					enemies[id + 1].animateEntry = 1;

					return {
						...prevState, 
						enemies
					}
				});
			}
		} else if(direction === 1){
			// swipe right - go left in the list
			if(id === 1){
				// if we are already at the first - go to the last
				this.setState((prevState) => {
					let enemies = prevState.enemies;
					enemies[id].expanded = false;
					enemies[this.props.num_of_enemies].expanded = true;
					enemies[this.props.num_of_enemies].animateEntry = -1;

					return {
						...prevState, 
						enemies
					}
				});
			} else{
				this.setState((prevState) => {
					let enemies = prevState.enemies;
					enemies[id].expanded = false;
					enemies[id - 1].expanded = true;
					enemies[id - 1].animateEntry = -1;

					return {
						...prevState, 
						enemies
					}
				});
			}
		}
	}

	render() {
		return (
			<View style={styles.container}>
				
				<View style={[styles.areasContainer, {height: '75%'}]}>
					<SharedArea/>
					<PlayerArea/>
				</View>

				<View style={[styles.areasContainer, {height: '25%', alignItems: 'center'}]}>
					<Text>Hand area: </Text>
					<Text>This is where your hand is displayed, as well as your discard pile and deck.</Text>
				</View>

				<Ionicons style={styles.goBack} name="md-arrow-back" size={32} color="black" onPress={this.props.goBack}/>

				{this.state.dim ? <TouchableWithoutFeedback onPress={this.closeAllEnemies.bind(this)}><View style={styles.overlay}/></TouchableWithoutFeedback> : null}

				<View style={[styles.opponentContainer]}>
					{Object.keys(this.state.enemies).map(enemyId => {
						let enemy = this.state.enemies[enemyId],
							func = !enemy.expanded ? this.expandEnemy.bind(this, enemy.id) : ()=>null,
							style = enemy.expanded ? {width: '100%'} : {}

						if(enemy.expanded){
							return (
								<View style={style} key={enemy.id}>
									<Opponent 
										expanded={enemy.expanded} 
										num_of_enemies={this.props.num_of_enemies}
										dim={this.state.dim}
										enemy={enemy}
										goToNextEnemy={this.goToNextEnemy.bind(this)}
									/>
								</View>);
						} else{
							return (
								<View style={style} key={enemy.id}>
									<TouchableOpacity onPress={func}>
										<Opponent 
											expanded={enemy.expanded} 
											num_of_enemies={this.props.num_of_enemies}
											dim={this.state.dim}
											enemy={enemy}
											goToNextEnemy={this.goToNextEnemy.bind(this)}
										/>
									</TouchableOpacity>
								</View>);
						}
						
					})}
				</View>
			
			</View>
		);
	}
}

const styles = StyleSheet.create({
    container: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
	},
	areasContainer:{
		flexDirection: 'row',
	},
	opponentContainer:{
		position: 'absolute',
		flexDirection: 'row',
		height: '85%',
		width: '80%',
		top: 0,
		justifyContent: 'center'
	},
	goBack: {
		position: 'absolute', 
		top: 5, 
		left: 15,
	},
	overlay: {
		position: 'absolute',
		backgroundColor: '#000',
		width: '100%', 
		height: '100%',
		opacity: 0.7
	}
});
  
export default NewGame = connect(mapStateToProps)(NewGame1);