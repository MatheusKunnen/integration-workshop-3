import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as Colors from '../utils/colors.js';
import CustomHeader from '../components/CustomHeader.jsx';
import CustomButton from '../components/CustomButton.jsx';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from '../AuthContext';
import CustomTextInput from '../components/CustomTextInput.jsx';
import PasswordGroupService from '../services/PasswordGroupService.jsx';
import RegisterChildService from '../services/RegisterChildService.jsx';

function RegisterChild({navigation}) {
  const {token} = useAuth();
  const [childName, setChildName] = useState('');
  const [tagNumber, setTagNumber] = useState('');
  const [passwordImageId, setPasswordImageId] = useState(null);
  const [imageSetId, setImageSetId] = useState(null);
  const [imageSet, setImageSet] = useState([]);

  const registerChild = async () => {
    if (childName === '') {
      alert('Please enter a name for your child');
      return;
    }

    if (tagNumber === '') {
      alert('Please enter a tag number for your child');
      return;
    }

    if (passwordImageId === null) {
      alert('Please select a password image for your child');
      return;
    }

    if (imageSetId === null) {
      alert('Failed to register child');
      return;
    }

    const child = {
      passwordImageId: passwordImageId,
      passwordGroupId: imageSetId,
      name: childName,
      tagNumber: tagNumber,
      budget: 1000,
      allowedSnacks: [],
    };

    RegisterChildService.registerChild(child, token)
      .then(response => {
        if (response && typeof response === 'object') {
          // alert('Child registered successfully');
          navigation.navigate('BudgetAndSnacks', { child: response });
        } else {
          console.error('Response is not in the expected format:', response);
          alert('Failed to register child');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Failed to register child');
      });
  };

  const getImageSet = async () => {
    PasswordGroupService.getRandomPasswordGroup()
      .then(response => {
        if (response && typeof response === 'object') {
          const {id, ...images} = response;

          if (id && typeof id === 'number') {
            setImageSetId(id);
          } else {
            console.error(
              'Response is missing or has an invalid id:',
              response,
            );
            alert('Failed to load image set');
          }

          const imageArray = Object.values(images);

          if (Array.isArray(imageArray)) {
            setImageSet(imageArray);
          } else {
            console.error('Response has invalid image properties:', response);
            alert('Failed to load image set');
          }
        } else {
          console.error('Response is not in the expected format:', response);
          alert('Failed to load image set');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Failed to load image set');
      });
  };

  const selectImage = id => {
    setPasswordImageId(id);
  };

  useFocusEffect(
    React.useCallback(() => {
      getImageSet();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader
        title={`Register Child`}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View style={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.topSection}>
          <Text style={styles.text}>Name</Text>

          <CustomTextInput
            placeholder={'Insert here'}
            onChangeText={setChildName}
            value={childName}
          />

          <Text style={styles.text}>NFC Tag</Text>

          <CustomTextInput
            placeholder={'Insert here'}
            onChangeText={setTagNumber}
            value={tagNumber}
          />

          <Text style={styles.text}>Password Image</Text>

          <View style={styles.gridContainer}>
            {imageSet.map(image => (
              <TouchableOpacity
                key={image.id}
                onPress={() => selectImage(image.id)}
                style={[
                  styles.imageContainer,
                  passwordImageId === image.id && styles.selectedImageContainer,
                ]}>
                <Image source={{uri: image.url}} style={styles.image} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottom}>
          <CustomButton
            title={'Save'}
            colorScheme={'dark'}
            onPress={registerChild}
          />
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
    color: Colors.darkGray,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 100,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 10,
    margin: 5,
  },
  selectedImageContainer: {
    borderColor: Colors.purple,
    borderRadius: 10,
    borderWidth: 4,
    margin: 5,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 10,
  },
  bottom: {
    marginHorizontal: 40,
    marginBottom: 40,
  },
});

export default RegisterChild;
