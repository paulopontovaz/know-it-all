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

function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent style={{color: Colors.mainFont}} backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

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

const Tabs = Platform.OS === 'ios'? 
  createBottomTabNavigator(tabItems, tabsConfig) :
  createMaterialTopTabNavigator(tabItems, tabsConfig)

export default class App extends React.Component {
  componentDidMount () {
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