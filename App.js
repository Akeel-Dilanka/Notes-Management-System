import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeUi} from './Home';
import {NoteListUi} from './NoteList';
import {NewNoteUi} from './NewNote';
import {LoginUi} from './Login';
import {RegistrationUi} from './Registration';

const Stack = createNativeStackNavigator();

function app(){

  async function checkUser() {
    const mobile = await AsyncStorage.getItem('mobile');   
    return mobile;
  }

  const ui = (

    <NavigationContainer>
      <Stack.Navigator initialRouteName={checkUser == null?"NoteList":"Home"}>
        <Stack.Screen name="Home" component={HomeUi} />
        <Stack.Screen name="Registration" component={RegistrationUi} />
        <Stack.Screen name="Login" component={LoginUi} />
        <Stack.Screen name="NoteList" component={NoteListUi} /> 
        <Stack.Screen name="NewNote" component={NewNoteUi} /> 
      </Stack.Navigator>
    </NavigationContainer>

  );
  return ui;
}

export default app;
