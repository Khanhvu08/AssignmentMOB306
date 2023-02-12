import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import TabsNavigation from './navigation/TabsNavigation';


export default function App() {
  return (
    <NavigationContainer>
      <TabsNavigation  />
    </NavigationContainer>
  )
}