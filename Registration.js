import React, { useState } from 'react';
import { StatusBar, View, Text, SafeAreaView, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function RegistrationUi({ navigation }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [userType, setUserType] = useState('');

  const ui = (

    <SafeAreaView style={styles.container}>
    <StatusBar hidden={true}/>
     <View>
     <Text style={styles.text1}>Create Your Account</Text>
     <Text>First Name:</Text>
      <TextInput style={{
        height:30,
        borderWidth:1,
        width:200,
        marginBottom:20,
        padding:5,
      }} value={firstName} onChangeText={text=>setFirstName(text)}/>
      <Text>Last Name:</Text>
      <TextInput style={{
        height:30,
        borderWidth:1,
        width:200,
        marginBottom:20,
        padding:5,
      }} value={lastName} onChangeText={text=>setLastName(text)}/> 
      <Text>Password:</Text>
      <TextInput style={{
        height:30,
        borderWidth:1,
        width:200,
        marginBottom:20,
        padding:5,
      }} value={password} secureTextEntry={true} onChangeText={text=>setPassword(text)}/> 
      <Text>Mobile Number:</Text>
      <TextInput style={{
        height:30,
        borderWidth:1,
        width:200,
        marginBottom:20,
        padding:5,
      }} value={mobileNumber} onChangeText={text=>setMobileNumber(text)}/>
      <Text>User Type:</Text>
      <TextInput style={{
        height:30,
        borderWidth:1,
        width:200,
        marginBottom:20,
        padding:5,
      }} value={userType} onChangeText={text=>setUserType(text)}/>

      <Button title="Register" onPress={goToLogin} />
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>or</Text>
      </View>
      <Button title="Go To Login" onPress={goLogin} />

     </View>
    </SafeAreaView>
  );

  return ui;

  function goLogin(){
    navigation.navigate("Login");
  }

  function goToLogin(){
    
    var requestObject = {
        mobileNumber,
        firstName,
        lastName,
        userType,
        password,
      };
    
        var requestText =JSON.stringify(requestObject);

        var formData = new FormData();
        formData.append('requestText',requestText);

        var request= new XMLHttpRequest();
        request.onreadystatechange= function(){
            if(request.readyState == 4 && request.status == 200){

                if(request.responseText== "Success"){
                 
                    navigation.navigate("Login");

                    Alert.alert("Message","Success");
                    saveData();

                }else{
                    Alert.alert("Message","Invalid Details");
                }

            }
        }

        request.open('POST','http://192.168.8.192/MyNotes/register.php',true);
        request.send(formData);

  }

  async function saveData(){
    await AsyncStorage.setItem("mobile",mobileNumber);
    await AsyncStorage.setItem("password",password);

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
