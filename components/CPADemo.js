import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

import FlexDemo1Screen from './FlexDemo1'



const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Check-in App for Developing Habits"
          component={HomeScreen}
          //options={{ title: 'Welcome' }}
        />

        <Stack.Screen name="Setting" component={SettingScreen} />

        <Stack.Screen name="History" component={HistoryScreen} />

        <Stack.Screen name="FlexDemo1" component={FlexDemo1Screen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{flex:1, flexDirection: 'row',
                     margin:"25px",
                     border:"thick solid black",
                     padding:'10px',
                     justifyContent: 'space-around', }}>

        <Button
          title="Check-in History"
          onPress={() =>
            navigation.navigate('History', { name: 'User', numberOfDay:'139' })
               // we're passing a parameter name:'Jane' to the Profile component!
          }
        />

        <Button
          title="Settings"
          onPress={() =>
            navigation.navigate('Setting', { name: 'User', greeting:'' })
               // we're passing a parameter name:'Jane' to the Profile component!
          }
        />

        <Button
          title="About this App"
          onPress={() =>
            navigation.navigate('FlexDemo1')
          }
        />
      </View>
      <View style={{flex:8, flexDirection: 'row',
                     margin:"25px",
                     border:"thick solid black",
                     padding:'10px',
                     justifyContent: 'space-around', }}>
        <View style={styles.formBox}>
          <Text style={{fontSize:32}}> Check-in User Name </Text>
          <TextInput style={styles.input} placeholder="Full Name"/>
          <TextInput style={styles.input} placeholder="Habit want to develop"/>
          <Button title="Submit" color="red"/>
        </View>
      </View>
    </View>
  );
};

// ProfileScreen function is called with a JSON object
//  {navigation:..., route:...,  otherstuff}
const HistoryScreen = ({ navigation, route }) => {
  return <Text>{route.params.name}, this is {route.params.numberOfDay}'s day of checking in.</Text>;
       // we're using the parameter name passed in from the HomeScreen
};

const SettingScreen = ({ navigation, route }) => {
  return <Text>This is the page for setting.</Text>;
       // we're using the parameter name passed in from the HomeScreen
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  },
  header: {
    flex:1,
    alignItems:'center',
    fontSize:64,
    padding:25,
    color:"red",
  },
  vertical: {
    flex:1,
    flexDirection:'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    backgroundColor:'green',
  },
  horizontal: {
    flex:1,
    flexDirection:'row',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    backgroundColor:'pink',
  },
  upperLeft:{
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderWidth: '5pt',
    flexDirection:'row',
  },
  centered:{
    flex:1,
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    borderWidth: '5pt',
    borderColor: 'red',
    padding:'10px',
    margin:'20px',
  },
  lowerRight:{
    flex:1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderWidth: '5pt',
    flexDirection:'row',
  },
  input:{
    color: 'black',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  formBox:{
    flex:1,
    flexDirection:'column',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    backgroundColor:'#fffff5',
  },
});

export default MyStack;
