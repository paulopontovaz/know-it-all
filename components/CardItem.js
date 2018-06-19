import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { removeCard } from '../actions'
import * as Colors from '../util/colors'

/*
	Componente criado para representar um item da lista de cards.
*/
function CardItem ({card, deckTitle, showAnswer, deleteCard}) {
	return (
		<View style={styles.allContainer}>
			<View style={styles.container}>
				<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
					<EvilIcons style={{alignSelf: 'center'}} name="question" size={30} color={Colors.mainFont}/>
					<View style={styles.questionContent}>
						<Text style={styles.question}>{card.question}</Text>
					</View>				
				</TouchableOpacity>
				<TouchableOpacity 
					style={styles.actions} 
					onPress={() => confirmDelete(card, deckTitle, deleteCard)}>
					<MaterialCommunityIcons name="delete" size={25} color={Colors.mainFont} />
				</TouchableOpacity>
			</View>			
			{showAnswer && <Text style={styles.answer}>{'Answer: ' + card.answer}</Text>}					
		</View>
	)
}

//Exibe uma dialog de confirmação para a exclusão do card, usando o 'Alert'.
function confirmDelete (card, deckTitle, deleteFunction) {
	Alert.alert(
		'Confirm Delete',
		'Are you sure you want to delete this card?',
		[
			{text: 'Cancel'},
			{text: 'Yes', onPress: () => deleteFunction(card, deckTitle)}
		],
		{cancelable: false}
	)
}

const styles = StyleSheet.create({
	allContainer: {
		flex: 1,
		flexDirection: 'column',
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 0,
		margin: 10,
		backgroundColor: Colors.listItemBackground,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 6,
		shadowOpacity: 1,
	},
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	questionContent: {
		marginLeft: 10,
		alignSelf: 'flex-start',
	},
	question: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.mainFont,
	},
	answer: {
		marginLeft: 10,
		marginTop: 10,
		fontSize: 15,
		color: Colors.secondaryFont,
	},
})

function mapDispatchToProps (dispatch)  {
	return {
		deleteCard: (card, deckTitle) => dispatch(removeCard(card, deckTitle))
	}
}

export default connect(null, mapDispatchToProps)(CardItem)