import React, { Component } from 'react'
import { 
	View, 
	TouchableOpacity, 
	Text, 
	// Platform, 
	// StyleSheet,
	TextInput
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { insertDeck } from '../actions'

class AddDeck extends Component {
	state = {
		title: '',
	}

	insertDeck (title) {
		if (title)
			this.props.addDeck(title)
				.then(() => this.props.navigation.goBack())
	}

	render () {
		const { title } = this.state

		return (
			<View>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					placeholder="Deck Title"
					onChangeText={title => this.setState({title})}
					value={title}
				/>
				<TouchableOpacity onPress={() => this.insertDeck(title)}>
					<Text>Add Deck</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

// const styles = StyleSheet.create({
// })

const mapDispatchToProps = dispatch => ({
	addDeck: title => dispatch(insertDeck(title))
})

export default connect(null, mapDispatchToProps)(AddDeck)