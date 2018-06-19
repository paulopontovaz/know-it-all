import React from 'react'
import { Text, TouchableOpacity, Button, StyleSheet } from 'react-native'
import * as Colors from '../util/colors'

//Wrapper criado para uso de buttons, para ter o efeito de TouchableOpacity.
export default function TextButton ({ 
	children, 
	onPress, 
	style = {}, 
	disabled, 
	accessibilityLabel, 
	color,
}) {
	return (
		<TouchableOpacity style={[styles.reset, style]}>
			<Button
				onPress={onPress} 
				color={color}
				title={children}
				disabled={disabled}
				accessibilityLabel={accessibilityLabel}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	reset: {
		padding: 5,
		borderRadius: 3,
		borderWidth: 1,
		borderColor: Colors.secondaryFont
	},
})