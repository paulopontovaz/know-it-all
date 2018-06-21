import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _ } from 'lodash'
import sortBy from 'sort-by'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { AppLoading } from 'expo'
import { fetchResults, removeAllResults } from '../actions/scoreBoard'
import * as Colors from '../util/colors'
import TextButton from './TextButton'
import ResultItem from './ResultItem'

/*
	Componente criado para exibir o histórico de resultados das partidas jogadas.
*/
class ScoreBoard extends Component {
	state = {
		ready: false, //Indica quando os itens já foram carregados pela API.
	}

	componentDidMount () {
		this.props.getResults()
			.then(() => this.setState({ready: true}))
	}

	confirmClear () {
		//Se a lista não estiver vazia, acionar a confirmação de exclusão de todos os itens
		if (!_.isEmpty(this.props.scoreBoard))
			Alert.alert(
				'Confirm Clear Entries',
				'Are you sure you want to clear all the score results?',
				[
					{text: 'Cancel'},
					{text: 'Yes', onPress: () => this.props.clearResults()}
				],
				{cancelable: false}
			)
	}

	render () {
		const { ready } = this.state
		const { scoreBoard } = this.props

		if(!ready)
			return <AppLoading />

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={{fontSize: 30, fontWeight: 'bold'}}>Score Board</Text>
					<TouchableOpacity onPress={() => this.confirmClear()}>
						<MaterialIcons name="delete-sweep" size={30} color={Colors.mainFont} />
					</TouchableOpacity>					
				</View>

				{!_.isEmpty(scoreBoard) &&
					<ScrollView styles={styles.listContainer}>
						{scoreBoard && scoreBoard.map(result => (
							<ResultItem key={result.dateTime} result={result} />
						))}
					</ScrollView>}

				{_.isEmpty(scoreBoard) && 
					<View style={styles.messageContainer}>
						<Text style={styles.messageText}>There are no scores saved</Text>						
					</View>}
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		padding: 10,
		backgroundColor: Colors.mainBackground,
	},
	header: {
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		alignItems: 'center',
		marginBottom: 20,
	},
	listContainer: {
		flex: 1,
		marginTop: 20,
		paddingTop: 20,
	},
	messageContainer: {
		flex: 1,
		alignItems: 'center',
	},
	messageText: {
		flex: 1,
		marginTop: 20,
		fontSize: 24,
	},
})

/*
	Passa da store para as props do componente a lista de resultados.
	Foi usado o 'sortBy' para que a lista fosse ordenada do item mais
	recente para o menos recente.
*/
const mapStateToProps = ({scoreBoard}) => ({scoreBoard: scoreBoard.sort(sortBy('-dateTime'))})

const mapDispatchToProps = dispatch => ({
	getResults: () => dispatch(fetchResults()), // Retorna a lista de resultados
	clearResults: () => dispatch(removeAllResults()), //Limpa todos os itens da lista de resultados
})

export default connect(mapStateToProps, mapDispatchToProps)(ScoreBoard)