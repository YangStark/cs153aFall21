import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const mph2fps = (mph) => mph*5280/3600

const MathQuiz = (props) => {
  const [n, setN] = useState(20);
  const [correctCount,setCorrectCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  const [hasAnswered,setHasAnswered] = useState(false)
  const [answerNum,setAnswerNum] = useState(-1);
  const [percent, setPercent] = useState(0.0);
  const [debugMode,setDebugMode] = useState(false);
  const [resState,setResState] = useState("waiting")
  const [ansEval,setAnsEval] = useState("none")
  const num1Dum = Math.floor(Math.random() * (n + 1));
  const num2Dum = Math.floor(Math.random() * (n + 1));
  const [num1New, setNum1New] = useState(num1Dum);
  const [num2New, setNum2New] = useState(num2Dum);

  let resultInputRef = React.createRef();

  let debugView = "";

  if (debugMode) {
    debugView = (
      <View>
        <Text> x: {num1New} </Text>
        <Text> y: {num2New} </Text>
        {answerNum != -1 ? (
          <Text> answer: {answerNum}</Text>
        ) : (
          <Text> answer: </Text>
        )}
        <Text> correct: {correctCount} </Text>
        <Text> answered: {answerCount} </Text>
        <Text> result: {resState} </Text>
      </View>
    )
  }

  const getData = async () => {
    try {
      // the '@profile_info' can be any string
      const jsonValue = await AsyncStorage.getItem("@pomodoros");
      let cacheInfo = null;
      if (jsonValue != null) {
        cacheInfo = JSON.parse(jsonValue);
        setCorrectCount(cacheInfo.correctNum);
        setAnswerCount(cacheInfo.answerNum);
        console.log("just set Info, Name and Email");
      } else {
        console.log("just read a null value from Storage");
        // this happens the first time the app is loaded
        // as there is nothing in storage...
      }
    } catch (e) {
      console.log("error in getData ");
      // this shouldn't happen, but its good practice
      // to check for errors!
      console.dir(e);
      // error reading value
    }
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@pomodoros", jsonValue);
      console.log("just stored " + jsonValue);
    } catch (e) {
      console.log("error in storeData ");
      console.dir(e);
      // saving error
    }
  };

  const clearAll = async () => {
    try {
      console.log("in clearData");
      await AsyncStorage.clear();
    } catch (e) {
      console.log("error in clearData ");
      console.dir(e);
      // clear error
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
  <View style={styles.container}>
    <Text style = {styles.header}>Math Quiz for numbers between 0 and {n}</Text>

    <Text style = {styles.smaller_header}>
    Calculate the product of the following two numbers:
    </Text>

    <Text style = {styles.smaller_header}>
    {num1New} * {num2New} =
    <TextInput
      style = {styles.textinput}
      ref = {resultInputRef}
      placeholder = "???"
      onChangeText={(numInput) => {
        if (numInput.length != 0) {
          setAnswerNum(parseInt(numInput));
        } else {
          setAnswerNum(-1);
        }
      }}/>
    </Text>
    <View style={styles.rowSpaceBetween}>
      {!hasAnswered && (
        <Button
        color = "red"
        title = "CHECK ANSWER"
        onPress = {()=>{
          let ansCount = answerCount + 1
          let corCount = correctCount;
          setAnswerCount(ansCount);
          setHasAnswered(true);
          if(answerNum === num1New * num2New) {
            corCount += 1;
            setCorrectCount(corCount);
            setResState("correct");
            setAnsEval("true")
          }else{
            setResState("incorrect");
            setAnsEval("false")
          }
          let cacheInfo = { correctNum: corCount , answerNum:ansCount};
          storeData(cacheInfo);
          let currentPercent = corCount / ansCount;
          setPercent(currentPercent);
        }}
        />
        )}
    </View>
    {hasAnswered && ansEval === "true"  && (
        <View
          style={{
            width: "50%",
            flexDirection: "column",
          }}
        >
          <View>
            <Text style={styles.notificationFont}> Correct!!!</Text>
          </View>
          <View style={styles.rowSpaceBetween}>
            <Button
              color="green"
              title="Next Question"
              onPress={() => {
                setHasAnswered(false);
                setNum1New(Math.floor(Math.random() * (n + 1)));
                setNum2New(Math.floor(Math.random() * (n + 1)));
                resultInputRef.current.clear();
              }}
            />
          </View>
        </View>
      )}
    {hasAnswered && ansEval === "false" && (
        <View
          style={{
            width: "50%",
            flexDirection: "column",
          }}
        >
          <View>
            <Text style={styles.notificationFont}>
              Sorry, answer was {parseInt(num1New) * parseInt(num2New)}, try again!
            </Text>
          </View>
          <View style={{alignSelf:"center"}}>
            <Button
              color="green"
              title="Next Question"
              onPress={() => {
                setHasAnswered(false);
                setNum1New(Math.floor(Math.random() * (n + 1)));
                setNum2New(Math.floor(Math.random() * (n + 1)));
                resultInputRef.current.clear();
              }}
            />
          </View>
        </View>
      )}

      <Text> Correct: {correctCount} </Text>
      <Text> Answered: {answerCount} </Text>
      <Text>{" "}Percent Correct:{" "}
        {((parseInt(correctCount) / (parseInt(answerCount)+0.000000001)) * 100).toFixed(2)}{" "}
      </Text>

      <View style={styles.rowSpaceBetween}>
        <Button
          title={(debugMode?"hide":"show") + " debug info"}
          color="green"
          onPress={() => setDebugMode(!debugMode)}
        />
      </View>

      {debugView}

  </View>)
};
const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "left",
    margin: "25px",
    padding: "25px",
  },
  textinput: {
    margin: 20,
    fontSize: 30,
  },
  notificationFont: {
    fontSize: 25,
    color: "red",
  },
  header: {
    fontSize: 40,
    color: "blue",
  },
  smaller_header: {
    fontSize: 30,
    color: "black",
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  });

export default MathQuiz;
