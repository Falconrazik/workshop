import {NavigationContainer} from '@react-navigation/native';
import AppStackNavigator from './navigation/appStackNavigator';

export default function App() {
    return (
        <NavigationContainer>
            <AppStackNavigator/>
        </NavigationContainer>
    );
}
