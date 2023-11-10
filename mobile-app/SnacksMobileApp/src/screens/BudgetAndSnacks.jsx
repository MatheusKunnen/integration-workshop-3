import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, StyleSheet, Dimensions, Image, FlatList, Modal, TouchableHighlight, ScrollView, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import * as Colors from "../utils/colors.js";
import CustomHeader from "../components/CustomHeader.jsx";
import CustomButton from "../components/CustomButton.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../AuthContext";
import GetSnacks from "../services/GetSnacks.jsx";
import BudgetControl from "../components/BudgetControl.jsx";
import UpdateBudgetService from "../services/UpdateBudgetService.jsx";
import UpdateSnacksService from "../services/UpdateSnacksService.jsx";

function BudgetAndSnacks({ route,navigation}) {
    const { token } = useAuth();
    const { child } = route.params;
    const [snacks, setSnacks] = useState([]);
    const [selectedSnacks, setSelectedSnacks] = useState(child.allowedSnacks);
    const [budget, setBudget] = useState(child.budget);

    const handleSave = async () => {
        await UpdateBudgetService.execute(token, child.id, {
            budget: budget,
        }).then((response) => {
                if (response === null) {
                alert('Failed to update budget');
            } else {
                UpdateSnacksService.execute(token, child.id, {
                    allowedSnacks: selectedSnacks,
                }).then((response) => {
                    if (response === null) {
                        alert('Failed to update snacks');
                    } else {
                        // alert('Budget and snacks updated successfully');
                        navigation.navigate('Home');
                    }
                }).catch((error) => {
                    console.log(error);
                    alert('Failed to update snacks');
                });
            }
        }).catch((error) => {
            console.log(error);
            alert('Failed to update budget');
        });
    };

    const handleBudgetChange = (newBudget) => {
        setBudget(newBudget); // Update the budget in the parent component's state
    };

    const getSnacksImageSet = async () => {
        await GetSnacks.execute().then((response) => {
            setSnacks(response);
        }).catch((error) => {
            console.log(error);
            alert('Failed to load snacks');
        });
    };

    const toggleImageSelection = (id) => {
        // Check if the image ID is already in the selectedImageIds array
        const isSelected = selectedSnacks.includes(id);
    
        if (isSelected) {
          // Deselect the image (remove its ID from the array)
            setSelectedSnacks((prevSelectedSnacksIds) =>
                prevSelectedSnacksIds.filter((snackId) => snackId !== id)
          );
        } else {
            // Select the image (add its ID to the array)
            setSelectedSnacks((prevSelectedSnacksIds) => [...prevSelectedSnacksIds, id]);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            console.log(child);
            getSnacksImageSet();
        }, [])
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomHeader
                title={`Budget & Snacks`}
                onPress={() => {
                    navigation.navigate('Home');
                }}
            />
            
            <View style ={styles.container}>
                <View style={styles.topSection} >
                    <Text style={styles.text}>
                        Allowed Budget
                    </Text>

                    <BudgetControl
                        allowedBudget={budget}
                        onBudgetChange={handleBudgetChange}
                    />

                    <Text style={styles.text}>
                        Allowed Snacks
                    </Text>

                    <Text style={styles.subtext}>
                        Select one or more
                    </Text>

                    <View style={styles.gridContainer}>
                        <FlatList
                            data={snacks}
                            numColumns={2}
                            renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                styles.imageContainer,
                                selectedSnacks.includes(item.id) && styles.selectedGridItem,
                                ]}
                                onPress={() => toggleImageSelection(item.id)}
                            >
                                <Image source={{ uri: item.image.url }} style={styles.image} />
                            </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                </View>

                <View style={styles.bottom}>

                    <CustomButton
                        title={"Save"}
                        colorScheme={"dark"}
                        onPress={handleSave}   
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
        justifyContent: 'center',
    },
    topSection: {
        flex: 1,
        paddingHorizontal: 40,
        paddingBottom: 40,
        alignItems: 'center',
    },
    control: {
        marginHorizontal: 40,
        marginBottom: 40,
    },
    text: {
        fontSize: 24,
        color: Colors.darkGray,
        fontWeight: '500',
        marginBottom: 4,
        marginTop: 20,
        alignSelf: 'flex-start',
    },
    subtext: {
        fontSize: 18,
        color: Colors.darkGray,
        fontWeight: '500',
        marginBottom: 4,
        alignSelf: 'flex-start',
    },
    gridContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    imageContainer: {
        width: 120,
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: 'transparent',
        margin: 10,
    },
    selectedGridItem: {
        borderColor: Colors.purple,
        borderWidth: 4,
        margin: 10,
    },
    image: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    bottom: {
        marginHorizontal: 40,
        marginBottom: 40,
    },
});

export default BudgetAndSnacks;