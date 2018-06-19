import React, { Component } from 'react'
import { 
	View, 
	TouchableOpacity, 
	Text, 
	StyleSheet,
	TextInput,
	Button,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'
import { connect } from 'react-redux'
import { insertDeck } from '../actions'

//Componente criado para inserção de um deck na lista de decks.
class AddDeck extends Component {
	state = {
		title: '',
	}

	insertDeck (title) {
		if (title)
			this.props.addDeck(title)
				//Após adicionar o novo deck, volta-se para a página anterior.
				.then(() => this.props.navigation.goBack())
	}

	render () {
		const { title } = this.state

		return (
			<View style={{flex: 1, padding: 10}}>
				<View>
					<TextInput
						style={{padding: 10}}
						placeholder="Deck Title"
						onChangeText={title => this.setState({title})}
						value={title} />
				</View>
				<TextButton 
					style={{marginTop: 10}}
					onPress={() => this.insertDeck(title)}>
						ADD DECK
				</TextButton>
			</View>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	addDeck: title => dispatch(insertDeck(title))
})

export default connect(null, mapDispatchToProps)(AddDeck)