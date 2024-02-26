import React, { 
    createContext, useState, useEffect
} from 'react';

import AlertModal from '../views/utils/AlertModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [navigation, setNavigation] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        'guid':'none',
        'name':'none',
        'last':'none',
        'user':'none',
        'pass':'none',
        'type':'none',
        'mail':'none', 
        'docu':'none',
        'celu':'none',
        'logo':'none', 
    });

    const delUser = async () => {
        try {
            await AsyncStorage.removeItem('userAgentateApp');
        } catch (error) {
            console.error('Error al intentar borrar usuario del Storage:', error);
        }
    }

    const setUser = async (user) => {
        try {
            // console.log('user: ', user);
            await AsyncStorage.setItem('userAgentateApp', JSON.stringify(user));
            setCurrentUser(user);
            return true;
        } catch (error) {
            console.error('Error al intentar obtener usuario del Storage:', error);
            return false;
        }
    }

    const getUser = async () => {
        try {
            var userStorage = await AsyncStorage.getItem('userAgentateApp');
            // console.log('userStorage: ', userStorage);
            var userJSON = JSON.parse(userStorage);
            if (userStorage !== null) {
                setCurrentUser(userJSON);
            } else {
                setCurrentUser(current_User);
            }
        } catch (error) {
            console.error('Error al intentar obtener usuario del Storage:', error);
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            // Cierra la sesión después de cierto tiempo de inactividad
            setUser({
                'guid':'none',
                'name':'none',
                'last':'none',
                'user':'none',
                'pass':'none',
                'type':'none',
                'mail':'none', 
                'docu':'none',
                'celu':'none',
                'logo':'none', 
            });
            if (isLogin) {
                setIsLogin(false);
                AlertModal.showAlert('Sesión Caducada',  'Vuelva a iniciar sesión.');
                navigation.navigate('Inicio');
            }
        }, 600000); // milisegundos
        // Limpia el temporizador cuando el componente se desmonta o cuando se cambia el usuario
        return () => clearTimeout(timer);
    }, [currentUser]); // Se vuelve a iniciar el temporizador cada vez que currentUser cambia
    
    return (
        <AuthContext.Provider
            value={{
                isLogin,
                setIsLogin,
                currentUser,
                setCurrentUser,
                getUser,
                setUser,
                navigation, 
                setNavigation
            }}>
            {children}
        </AuthContext.Provider>
    );
};