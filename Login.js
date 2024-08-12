import React, { useState } from 'react';
import { Image, StatusBar, View, Text, SafeAreaView, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LoginUi({ navigation }) {

  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const ui = (

    <SafeAreaView style={styles.container}>
    <StatusBar hidden={true}/>
     <View>
     <Image source={require("./Icon.jpg")} style={{width:300,height:100,bottom:100}}/>
     <Text style={styles.text1}>Login Your Account</Text>
      <Text>Mobile Number:</Text>
      <TextInput style={{
        height:30,
        borderWidth:1,
        width:200,
        marginBottom:20,
        padding:5,
      }} value={mobileNumber} onChangeText={text=>setMobileNumber(text)}/>
      <Text>Password:</Text>
      <TextInput style={{
        height:30,
        borderWidth:1,
        width:200,
        marginBottom:20,
        padding:5,
      }} value={password} secureTextEntry={true} onChangeText={text=>setPassword(text)}/> 
      
      <Button title="Login" onPress={goToNoteList} />
     </View>
    </SafeAreaView>
  );

  return ui;

  async function goToNoteList(){
  const getmobile = await AsyncStorage.getItem("mobile");
  const getpassword = await AsyncStorage.getItem("password");


  var requestObject = {

    mobileNumber,
    password,
    getmobile,
    getpassword,

    };

    var requestText =JSON.stringify(requestObject);

    var formData = new FormData();
    formData.append('requestText',requestText);

    var request= new XMLHttpRequest();
    request.onreadystatechange= function(){
        if(request.readyState == 4 && request.status == 200){

            if(request.responseText== "success"){
             
                navigation.navigate("NoteList");

                Alert.alert("Message","Success");
             

            }else{
                Alert.alert("Message","Invalid Details");
            }

        }
    }

    request.open('POST','http://192.168.8.192/MyNotes/login.php',true);
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
