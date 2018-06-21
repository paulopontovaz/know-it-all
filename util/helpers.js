/*
	Helper usado para criar a notificação no dispositivo do usuário.
*/

import { NOTIFICATION_KEY } from './constants'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

//Notificação criada seguindo o padrão das aulas, retornando um objeto de configuração.
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

//Função que cria a notificação.
export function setLocalNotification () {	
	AsyncStorage.getItem(NOTIFICATION_KEY)//Busca-se a notificação criada.
		.then(JSON.parse)
		.then(data => {
			if (!data) 				
				return scheduleNotification()
		})
}

export function scheduleNotification () {
	//Pedindo permissão ao usuário para enviar notificações.
	return Permissions.askAsync(Permissions.NOTIFICATIONS)
		.then(({status}) => {
			if (status === "granted") {
				//Cancela todas as notificações criadas, se houver.
				Notifications.cancelAllScheduledNotificationsAsync()

				//Define o momento em que a notificação será disparada.
				//Neste caso, às 07h00min
				let tomorrow = new Date()
				tomorrow.setDate(tomorrow.getDate() + 1)
				tomorrow.setHours(7)
				tomorrow.setMinutes(0)

				//Agenda a notificação para ser disparada no dispositivo.
				Notifications.scheduleLocalNotificationAsync(
					//Objeto com os dados da notificação
					createNotification(),
					//Objeto com o momento em que a notificação deve ser disparada.
					{ time: tomorrow, repeat: 'day' },
				)

				//Salva no AsyncStorage um boolean para dizer se há ou não notificação agendada.
				AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
			}
		})
}