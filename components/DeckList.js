import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

class DeckList extends Component {

	render () {
		return (
			<View>
				<Text>{"DeckList"}</Text>
			</View>
		)
	}
}

// const styles = StyleSheet.create({
// })

export default DeckList
// export default connect()(DeckList)