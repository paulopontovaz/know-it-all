import { camelCase } from 'change-case'
import { NOTIFICATION_KEY } from './constants'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

function createNotification () {
	return {
		title: 'Study!',
		body: "Don't forget to study today!",
		ios: {
			sound: true,
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true,
		},
	}
}

export function setLocalNotification () {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then(data => {
			if (!data) {
				Permissions.askAsync(Permissions.NOTIFICATIONS)
				.then(({status}) => {
					if (status === "granted") {
						Notifications.cancelAllScheduledNotificationsAsync()

						let tomorrow = new Date()
						tomorrow.setDate(tomorrow.getDate() + 1)
						tomorrow.setHours(7)
						tomorrow.setMinutes(0)

						Notifications.scheduleLocalNotificationAsync(
						createNotification(),
							{
								time: tomorrow,
								repeat: 'day'
							},
						)

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
					}
				})
			}
		})
}