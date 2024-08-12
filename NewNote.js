import React, { useState } from 'react';
import { StatusBar, View, Text, SafeAreaView, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function NewNoteUi({ navigation }) {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const ui = (

    <SafeAreaView style={styles.container}>
    <StatusBar hidden={true}/>
     <View>
     <Text style={styles.text1}>Create Your Note</Text>
     <Text>Title:</Text>
      <TextInput style={{
        height:30,
        borderWidth:1,
        width:200,
        marginBottom:20,
        padding:5,
      }} value={title} onChangeText={text=>setTitle(text)}/>
      <Text>Description:</Text>
      <TextInput style={{
        height:30,
        borderWidth:1,
        width:200,
        marginBottom:20,
        padding:5,
      }} value={description} onChangeText={text=>setDescription(text)}/> 
      <Text>Category:</Text>
      <TextInput style={{
        height:30,
        borderWidth:1,
        width:200,
        marginBottom:20,
        padding:5,
      }} value={category} onChangeText={text=>setCategory(text)}/> 
      <Text>Type your Note:</Text>
      <TextInput style={{
        height:200,
        borderWidth:1,
        width:200,
        marginBottom:20,
        padding:5,
      }} value={note} multiline={true} numberOfLines={4} placeholder="Enter your message here" onChangeText={text=>setNote(text)}/>

      <Button title="Save Note" onPress={goToNoteList} />

     </View>
    </SafeAreaView>
  );

  return ui;

  async function goToNoteList(){

    const mobile = await AsyncStorage.getItem('mobile'); 

    var requestObject = {
      title,
      description,
      category,
      note,
      mobile,
    };
  
      var requestText =JSON.stringify(requestObject);

      var formData = new FormData();
      formData.append('requestText',requestText);

      var request= new XMLHttpRequest();
      request.onreadystatechange= function(){
          if(request.readyState == 4 && request.status == 200){

              if(request.responseText== "Success"){
               
                  navigation.navigate("NoteList");

                  Alert.alert("Message","Success");

              }else{
                  Alert.alert("Message","Failed");
              }

          }
      }

      request.open('POST','http://192.168.8.192/MyNotes/savenote.php',true);
      request.send(formData);
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text1:{
      fontSize:30,
      fontWeight:"bold",
      bottom:50,
    },
    
  });
