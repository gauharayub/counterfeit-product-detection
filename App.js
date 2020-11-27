import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'} initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="ViewProducts" component={ViewProducts} />
        <Stack.Screen name="VerifyProduct" component={VerifyProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>FAKE PRODUCT DETECTION</Text>
      {/* <StatusBar style="auto" /> */}
      <View style={styles.menuText}>
        <Button
          title="Add Product"
          onPress={() => navigation.navigate('AddProduct')}
          color="#385773"
        />
      </View>
      <View style={styles.menuText}>
        <Button
          title="View Products"
          onPress={() => navigation.navigate('ViewProducts')}
          color="#385773"
        />
      </View>
      <View style={styles.menuText}>
        <Button
          title="Verify Product"
          onPress={() => navigation.navigate('VerifyProduct')}
          color="#385773"
        />
      </View>
    </View>
  );
};

const AddProduct = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.heading, styles.formScreenHeading]}>
        ADD PRODUCT
      </Text>
      <View style={styles.form}>
        <TextInput style={styles.inputStyle} placeholder="Name Of Product" />
        <TextInput style={styles.inputStyle} placeholder="Product ID" />
        <TextInput style={styles.inputStyle} placeholder="Manufacturer" />
        <TextInput style={styles.inputStyle} placeholder="Product Category" />
        <View style={[styles.menuText, styles.submitButton]}>
          <Button title="ADD" color="#385773" />
        </View>
      </View>
    </View>
  );
};

const ViewProducts = ({ navigation, route }) => {
  return <View style={styles.container} />;
};

const VerifyProduct = ({ navigation, route }) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B0D9C6',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  formScreenHeading: {
    marginBottom: 60,
    fontSize: 40,
  },
  heading: {
    marginTop: 80,
    marginBottom: 100,
    fontSize: 40,
    lineHeight: 60,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  menuText: {
    fontSize: 20,
    marginBottom: 60,
    width: '50%',
    height: 30,
    backgroundColor: '#385773',
  },
  inputStyle: {
    backgroundColor: 'white',
    width: 300,
    fontSize: 18,
    height: 45,
    padding: 10,
    marginBottom: 30,
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  submitButton: {
    marginTop: 35,
  },
});
