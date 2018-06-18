import React, { Component } from 'react'
import * as moment from 'moment'
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { removeCard } from '../actions'
import * as Colors from '../util/colors'

function ResultItem ({result}) {
	const { playerName, score, dateTime } = result
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>{playerName}</Text>
				<Text style={styles.headerText}>Score: {score}</Text>
			</View>
			<Text style={styles.date}>{moment.utc(dateTime).format("DD/MM/YYYY HH:mm:ss")}</Text>			
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		padding: 10,
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
	date: {
		color: Colors.secondaryFont,
		fontSize: 14,
	},
})

export default ResultItem