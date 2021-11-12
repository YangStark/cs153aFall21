import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet,
  Image, Text,
  View, Button,
  TextInput, SafeAreaView,SectionList} from 'react-native';

import FlexDemo1Screen from './FlexDemo1'
import MathQuizOriginal from './MathQuizOriginal'
import StartScreen from './StartScreen'



const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Start" component= {StartScreen}/>


        <Stack.Screen
          name="Expense Tracker No.19281233413"
          component={HomeScreen}
          //options={{ title: 'Welcome' }}
        />



        <Stack.Screen name="Setting" component={SettingScreen} />

        <Stack.Screen name="History" component={HistoryScreen} />

        <Stack.Screen name="FlexDemo1" component={MathQuizOriginal} />

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
          title="Spending History"
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

        <Image
           style={styles.image}
           source={{uri:'https://images.complex.com/complex/images/c_fill,dpr_auto,f_auto,q_auto,w_1400/fl_lossy,pg_1/dcmiamfl4u0spnfcjywu/money?fimg-ssr-default'}}/>

      </View>
    </View>
  );
};

// ProfileScreen function is called with a JSON object
//  {navigation:..., route:...,  otherstuff}
const HistoryScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.smallheader}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
       // we're using the parameter name passed in from the HomeScreen
};

const DATA = [
  {
    title: "November Spending History",
    data: ["Daily Spending: $670",
    "Shopping: $325.7",
    "Dining: $209.9"]
  },
  {
    title: "October Spending History",
    data: ["Dining: $1073.49",
    "Shopping: $534.36",
    "Medical: $245",
    "Daily: $204.99",
    "Entertainment: $33",]
  },
  {
    title: "September Spending History",
    data: ["Shopping: $795.21",
    "Dining: $638.42",]
  },
  {
    title: "August Spending History",
    data: ["Shopping: $125.61",
    "Dining: $471.25"]
  }
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);


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
  smallheader: {
    flex:1,
    alignItems:'center',
    fontSize:30,
    padding:25,
    color:"blue",
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
  image: {
    width:"50%",
    transform: [{ rotate: '0deg' }]
  },
  item: {
    backgroundColor: "lightblue",
    padding: 20,
    marginVertical: 8
  },
});

export default MyStack;
