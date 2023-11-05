import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import * as Colors from '../utils/colors.js';
import CustomButton from '../components/CustomButton.jsx';
import CustomTextInput from '../components/CustomTextInput.jsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader.jsx';
import RegisterParentService from '../services/RegisterParentService.jsx';
import LoginService from '../services/LoginService.jsx';
import {useAuth} from '../AuthContext';
import TermsAndConditions from './TermsAndConditions.jsx';

function ParentRegister({navigation}) {
  const {login} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = React.useState(false);
  const screenHeight = Dimensions.get('window').height;

  const handlePress = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    } else if (username === '' || password === '' || confirmPassword === '') {
      alert('Please fill all the fields');
      return;
    } else if (!isChecked) {
      alert('Please agree to the terms and conditions');
      return;
    } else {
      await RegisterParentService.registerParent({
        email: username,
        password: password,
      })
        .then(response => {
          console.log(response);
          if (response === null) {
            alert('Parent already regitered');
            navigation.navigate('Login');
            return;
          } else {
            handleLogin();
          }
        })
        .catch(error => {
          console.log(error);
          alert('Failed to register parent');
        });
    }
  };

  const handleLogin = async () => {
    await LoginService.login({
      email: username,
      password: password,
    })
      .then(response => {
        console.log(response);
        if (response === null) {
          alert('Invalid e-mail or password');
          return;
        } else {
          login({type: 'login', payload: response.token});
          navigation.navigate('Home');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Failed to login');
      });
  };

  const updateChecked = () => {
    setChecked(!isChecked);
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title="Create Account"
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.text}>E-mail</Text>
          <CustomTextInput
            placeholder="Insert Here"
            onChangeText={setUsername}
            value={username}
          />

          <Text style={styles.text}>Password</Text>
          <CustomTextInput
            placeholder="Insert Here"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />

          <Text style={styles.text}>Confirm Password</Text>
          <CustomTextInput
            placeholder="Insert Here"
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />

          <View style={[styles.termsContainer, {minHeight: screenHeight / 3}]}>
            <ScrollView>
              <TermsAndConditions style={styles.termsText}/>
            </ScrollView>

            <TouchableOpacity
              onPress={updateChecked}
              style={styles.checkboxContainer}>
              {isChecked ? (
                <Image source={require('../assets/tick-square.png')} />
              ) : (
                <Image source={require('../assets/tick-square-empty.png')} />
              )}

              <Text style={styles.checkboxLabel}>
                I agree to the terms and conditions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{margin: screenHeight/24}} />

          <View style={styles.bottom}>
            <CustomButton
              title="Create"
              colorScheme="dark"
              onPress={handlePress}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.beige,
  },
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'space-between',
  },
  topSection: {
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 24,
    fontWeight: '500',
    color: Colors.darkGray,
    marginBottom: 4,
  },
  termsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  termsText: {
    flexWrap: 'wrap',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
  },
  checkboxLabel: {
    fontSize: 16,
    marginLeft: 10,
    flexWrap: 'wrap'
  },
  bottom: {
    justifyContent: 'flex-end',
    marginBottom: 40,
  },
});

export default ParentRegister;
