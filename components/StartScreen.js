import { StyleSheet, TextInput, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const StartScreen=({navigation})=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
      getData();
    }, []);

    const getData = () => {
      try {
          AsyncStorage.getItem('UserData')
              .then(value => {
                  if (value != null) {
                      navigation.navigate('Home');
                  }
              })
      } catch (error) {
          console.log(error);
      }
  }


    const setData = async () => {
        if (email.length == 0 || password.length == 0) {
          console.log("here")
            Alert.alert('Warning!', 'Please write your data.')
        } else {
            try {
                let user = {
                    Email: email,
                    Password: password
                }
                await AsyncStorage.setItem('UserData', JSON.stringify(user));
                navigation.navigate('Expense Tracker No.19281233413');
            } catch (error) {
                console.log(error);
            }
        }
    }
    return (

        <View style={styles.container}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Email."
                onChangeText={(email) => setEmail(email)}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputText}
                placeholder="Password."
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>

            <TouchableOpacity>
              <Text style={styles.forgetText}>Forgot Password?</Text>
            </TouchableOpacity>

            <Button style={styles.loginBtn}
              title="Login"
              onPress={() =>{
                setData()

                }
              }
            />
        </View>
    )

    ;
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputContainer:{
      alignItems:'center',
      height: 60,
      backgroundColor: "moccasin",
      marginBottom: 40,
      width: "50%",
      borderRadius: 30,
    },
    inputText:{
      height: 60,
      fontSize: 20,
    },
    forgetText:{
      height: 30,
      marginBottom: 30,
      marginTop: 20,

    },
    loginBtn:{
      width: "100%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "plum",

    },
    loginText:{
      fontWeight: 'bold',


    }

  });

export default StartScreen
