import React, { Component } from 'react'
import * as moment from 'moment'
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { removeCard } from '../actions'
import * as Colors from '../util/colors'

/*
	Componente que representa cada item da lista de resultados na aba Score Board.
	Foi utilizado o 'moment' para converter a propriedade 'dateTime' para uma 
	string de data formatada.
*/
function ResultItem ({result}) {
	const { playerName, score, dateTime, deckTitle } = result
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>{playerName}</Text>
				<Text style={styles.headerText}>Score: {score}</Text>
			</View>
			<View style={styles.footer}>
				<Text style={styles.footerText}>{deckTitle}</Text>
				<Text style={styles.footerText}>{moment.utc(dateTime).format("DD/MM/YYYY HH:mm:ss")}</Text>
			</View>			
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		padding: 10,
		marginTop: 10,
		backgroundColor: Colors.listItemBackground,
		borderWidth: 1,
		borderColor: Colors.secondaryFont,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	headerText: {
		color: Colors.mainFont,
		fontSize: 18,
	},
	footer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	},
	footerText: {
		color: Colors.secondaryFont,
		fontSize: 14,
	},
})

export default ResultItem