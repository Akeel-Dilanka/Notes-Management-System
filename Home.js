import { StatusBar, View, Text, SafeAreaView, Button, StyleSheet, Image, } from 'react-native';

export function HomeUi({ navigation }) {

  const ui = (

    <SafeAreaView style={styles.container}>
    <StatusBar hidden={true}/>
     <View>
     <Image source={require("./Icon.jpg")} style={{width:250,height:100,}}/>
      <Text style={styles.text1}>My Note</Text>
      
      <Button title="Go to Note" onPress={goToRegister} />
     </View>
    </SafeAreaView>
  );

  return ui;

  function goToRegister(){
    navigation.navigate("Registration");
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
        fontSize:60,
        fontWeight:"bold",
      },
    
  });
