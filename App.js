import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { Constants } from 'expo'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { 
  createStackNavigator, 
  createBottomTabNavigator, 
  createMaterialTopTabNavigator 
} from 'react-navigation'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import thunk from 'redux-thunk'
import reducer from './reducers'
import * as Colors from './util/colors'
import { setLocalNotification } from './util/helpers'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckDetails from './components/DeckDetails'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import ScoreBoard from './components/ScoreBoard'

//Barra de status personalizada para lidar com diferentes tamanhos de tela e diferentes SOs.
function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent style={{color: Colors.mainFont}} backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

/*
  Criando o stack navigator, que lidará com as routes da parte principal do app.
  Aqui ficam todas as views da aba Deck List.
*/
const Main = createStackNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      title: 'Know-It-All!',
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: 'Add Deck',
    },
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      title: 'Deck Details',
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
    },
  },
  Quiz: {
    screen: Quiz,
      navigationOptions: {
        title: 'Quiz',
      },
    },
})

/*
  Criando as abas 'Deck List' e 'Score Board'.
  > Deck List 
    - Funcionalidade principal do aplicativo;
    - Criação de decks, cards e jogar o Quiz;
    - É possível excluir decks e cards.
  > Score Board
    - Exibição do histórico de resultados das partidas;
    - É possível limpar o histórico;
    - Cada item dessa lista é inserido quando um jogador conclui uma partida do Quiz.
*/
const tabItems = {
  DeckList: {
    screen: Main,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons 
                                      name='cards-playing-outline' 
                                      size={30} 
                                      color={tintColor} />
    },
  },
  ScoreBoard: {
    screen: ScoreBoard,
    navigationOptions: {
      tabBarLabel: 'Score Board',
      tabBarIcon: ({ tintColor }) => <FontAwesome 
                                      name='list' 
                                      size={30} 
                                      color={tintColor} />
    },
  },
}

//Definindo configurações do Tab Navigator.
const tabsConfig = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Colors.mainFont,
    style: {
      height: 56,
      backgroundColor: Colors.secondaryFont,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}

//Criando um tipo de Tab Navigator diferente para cada SO.
const Tabs = Platform.OS === 'ios'? 
  createBottomTabNavigator(tabItems, tabsConfig) :
  createMaterialTopTabNavigator(tabItems, tabsConfig)

export default class App extends React.Component {
  componentDidMount () {
    //Criando a notificação no dispositivo do usuário.
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, compose(applyMiddleware(thunk)))}>
        <View style={{flex: 1}}>
          <CustomStatusBar />
          <Tabs />
        </View>
      </Provider>
    )
  }
}