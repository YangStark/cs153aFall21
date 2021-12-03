import React, { useState ,useEffect}  from 'react';
import { StyleSheet, Text, View, Image,
  TextInput, Button,FlatList,SafeAreaView,StatusBar,
  TouchableOpacity,ScrollView,} from 'react-native';
import Axios from "axios";

// const App = () => {...}




export default function App() {
  const [serverURL,setURL] = useState("https://glacial-hamlet-05511.herokuapp.com");
  const [selectedBboard,setSelectedBboard] = useState("");
  const [bboard,setBboard] = useState("");
  const [posts,setPosts] = useState([]);
  const [numNewPosts,setNumNewPosts] = useState(0);
  const [bbNames,setBbNames] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(()=>{
    const getBbNames = async() =>{
      let name = [];
      name = await Axios.get(serverURL + "/bboardNames");
      console.log(name.data);
      setBbNames(name.data);
    };
    const ps = getBbNames();
  },[bboard,numNewPosts]);

  const getPosts = async (itemName) => {
    setSelectedBboard(itemName);
    let posts = await Axios.post(serverURL + "/posts",{
      bboard:itemName
    });
    console.log(posts.data)
    setPosts(posts.data);
  };
  const clearSelection = () => {
    setSelectedBboard("");
    setPosts([]);
  };


  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={() => getPosts(item)} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item}</Text>
    </TouchableOpacity>
  );
  const PostItem = ({ item, onPress, backgroundColor, textColor }) => {
    return (
      <View style={{ padding: 10, margin: 10, backgroundColor: "#ddd" }}>
        <Text style={{ fontSize: 24 }}>{item.title}</Text><Text>{item.text}</Text>
      </View>
    );
  };


  const renderItem = ({ item }) => {
    const backgroundColor = "black";
    const color = 'red';
    return (
      <Item
        item={item}
        onPress={() => getPosts(item)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };




  return (
    <View style={styles.container}>

        <View style={styles.headerView}>
              <Text style={styles.header}>
                  BBViewer
              </Text>
        </View>



        <View style ={styles.bbButtonsRow}>
          <View>
            <Button
            color="blue"
            title="RESEARCH BBORADS"
            onPress={()=>clearSelection()}
            />

          </View>
          <SafeAreaView style = {styles.horizontalScroll}>
            <ScrollView>
              <FlatList
                horizontal = {true}
                data={bbNames}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
            />
            </ScrollView>
          </SafeAreaView>
        </View>

        <View style={{flex:1,flexDirection:'row',
                      alignItems:'left',}}>
          <Text style={styles.contentHeader}>
            Selected bboard:
            <Text style = {styles.selectedButton}>
              {selectedBboard}
            </Text>
          </Text>




        </View>
        <View style={{ flex: 10 }}>
          {" "}
          {selectedBboard != "" && (
            <View style={{ width: "66%" }}>
              <FlatList
                data={posts}
                renderItem={({ item }) => <PostItem item={item} />}
                keyExtractor={(item) => item._id}
              />
            </View>
          )}
        </View>



        <View>
          <Text>DEBUGGING</Text>
          <Text>bb:{selectedBboard}</Text>
          <Text>
            show:{selectedBboard == "" && "false"}
            {selectedBboard != "" && "true"}
          </Text>
          <Text>bbs.length:{bbNames.length}</Text>
          <Text>posts:{JSON.stringify(posts)}</Text>
        </View>



    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection:'column',
  },
  headerView: {

    textAlign: 'center', // <-- the magic
    backgroundColor: 'black',
  },
  header:{
    fontSize: 30,
    color: 'red',
    margin: 20,
  },
  bbButtonsRow:{
    flex:1,
    flexDirection: 'row',
    alignItems: 'left',

  },
  item:{
    padding: 5,
    marginVertical: 3,
    marginHorizontal: 3,
  },
  horizontalScroll: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  contentHeader:{
    fontSize:30,
    color:'black',
  },
  selectedButton:{
    backgroundColor:'black',
    color:'red',
  },
  rowSpaceBetween:{
    justifyContent:'space-between'
  }

});
