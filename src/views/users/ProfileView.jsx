import React, { useState, useEffect } from 'react';
import { 
    Text, 
    StyleSheet, 
    View,
    ScrollView,
    TextInput } 
from 'react-native';

import * as ImagePicker from "expo-image-picker";

import UsersController from '../../controllers/UsersController';

const ProfileView = (userLogin) => {

    const [user, setUser] = useState(userLogin);

	const [isValidEmail, setIsValidEmail] = useState(true);
	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleEmailChange = (text) => {
		setEmail(text);
		setIsValidEmail(validateEmail(text));
	};

	// images
	const [selectedPicture, setSelectedPicture] = useState(null);
	const [selectedLogo, setSelectedLogo] = useState(null);


    // return (
    //     <View style={styles.container}>
    //         <View style={styles.header}>

    //             <View style={styles.inputContainer}>
    //                 <TextInput
    //                     style={styles.input}
    //                     value={username}
    //                     // onChangeText={setUsername}
    //                 />
    //             </View>

    //             <View style={styles.inputContainer}>
    //                 <TextInput
    //                     style={styles.input}
    //                     secureTextEntry
    //                     value={password}
    //                     // onChangeText={setPassword}
    //                 />
    //             </View>
    //         </View>

    //         <ScrollView style={styles.body}>

    //             <View style={styles.inputContainer}>
    //                 <TextInput
    //                     style={styles.input}
    //                     value={nombre}
    //                     // onChangeText={setNombre}
    //                 />
    //             </View>

    //             <View style={styles.inputContainer}>
    //                 <TextInput
    //                     style={styles.input}
    //                     value={apellido}
    //                     // onChangeText={setApellido}
    //                 />
    //             </View>

    //             <View style={[styles.inputContainer,
    //                 !isValidEmail && styles.invalidInput]}
    //             >
    //                 <TextInput
    //                     keyboardType="email-address"
    //                     style={styles.input}
    //                     value={email}
    //                     // onChangeText={setEmail}
    //                     autoCapitalize="none"
    //                 />
    //                 {
    //                     !isValidEmail &&
    //                     <Text style={styles.errorText}>
    //                         Correo electrónico inválido
    //                     </Text>
    //                 }
    //             </View>
    //         </ScrollView>
    //     </View>
    // );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    inputContainer: {
		flexDirection: 'row',
		backgroundColor: 'transparent',
        width:'90%',
		// borderColor: 'lightgreen',
		borderWidth: 1,
		borderRadius: 5,
		marginHorizontal:15,
		marginBottom: 5,
		paddingHorizontal: 15,
		paddingVertical: 3,
	},
    input: {
		color: 'black',
		fontWeight: 'bold',
	},
})

export default ProfileView;