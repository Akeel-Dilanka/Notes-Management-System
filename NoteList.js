import React, { useState, useEffect } from 'react';
import { Button, StatusBar, View, Text, SafeAreaView, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function NoteListUi({ navigation }) {

  const [notes, setNotes] = useState([]);

  viewNoteList();

  const ui = (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View>
        <View style={{
          marginBottom: 50,
          padding: 10,
        }}>
          <Button title="Create New Note" onPress={goToNoteList} />
        </View>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <View
            style={{
              marginBottom: 10,
              padding: 10,
              borderWidth:1,
              borderColor: "black",
              borderRadius:5,
            }}>

              <Text>Date & Time: 2023.09.14 01:00</Text>
              <Text>Title: {item.title}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Title: {item.note}</Text>

            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );

  return ui;

  async function viewNoteList() {
    const mobile = await AsyncStorage.getItem('mobile');
    const formData = new FormData();

    formData.append('mobile', mobile);

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState == 4 && request.status == 200) {
        setNotes(JSON.parse(request.responseText));
      }
    }

    request.open('POST', 'http://192.168.8.192/MyNotes/notelist.php', true);
    request.send(formData);
  }

  function goToNoteList() {
    navigation.navigate("NewNote");
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

