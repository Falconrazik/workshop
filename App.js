import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppStackNavigator from './navigation/appStackNavigator';


// Stack Navigator
// - landing page
// - "Create your account"
// - set avatar
// - pick categories
// - App tab navigator (tabs at the bottom)
//    - home (tab navigator)
//       - creators
//       - shorts
//    - dashboard (another stack navigator)
//    - account page

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AppStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
