import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../Firebase/firebase';


const App = () => {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {

        if (user.length > 0) {
            if (!user.endsWith('@gmail.com')) {
                setEmailError('Invalid email format');
            } 

            else {
                setEmailError('');
            }
        }

        if (password.length > 0) {
            if (password.length < 8 || password.length > 20) {
                setPasswordError('Password must be between 8 to 20 characters');
            } 

            else {
                setPasswordError('');
            }
        }
    }, [user, password]);

    const auth = getAuth (app);
    const onPressLogin = () => {
        signInWithEmailAndPassword(auth, user, password)
        .then((userCredential) => {
            const user = userCredential.user;
            router.replace('/ContactList')
        })
        .catch((error) => {
            const errorCode = error.code;
            alert(error.message);
        });

        if (emailError || passwordError) {
            return;
        }

        console.log(user);
        console.log(password);

    };

    const onPressSignUp = () => {
        router.replace('/signUp');
    };

    return (
        <ImageBackground source={{ uri: 'https://t4.ftcdn.net/jpg/03/57/34/39/360_F_357343965_u58BFcRrziBVMqgt6liwPHJKcIjHsPnc.jpg' }}
        style={styles.bG}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Login</Text>
                        <View style={styles.inputView}>
                            <TextInput
                            style={styles.inputText}
                            placeholder="Email"
                            placeholderTextColor="white"
                            onChangeText={(text) => setUser(text)} />
                        </View>
                        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                        <View style={styles.inputView2}>
                            <TextInput
                                style={styles.inputText}
                                secureTextEntry={!showPassword} 
                                placeholder="Password"
                                placeholderTextColor="white"
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity
                                style={styles.toggleButton}
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Text style={styles.toggleButtonText}>
                                    {showPassword ? 'Hide' : 'Show'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {passwordError ? ( <Text style={styles.errorText}>{passwordError}</Text> ) : null}

                    <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
                        <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onPressSignUp} style={styles.signUpBtn}>
                        <Text style={styles.signupText}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    
    bG: {
        flex: 1,
        resizeMode: 'cover'
    },

    toggleButton: {
        position: 'absolute',
        top: 18,
        right: 20,
        zIndex: 1,
    },
    toggleButtonText: {
        color: 'white',
        fontSize: 10,
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    container: {
        width: '80%',
        borderWidth: 5,
        borderColor: 'black',
        borderRadius:20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    title: {
        fontWeight: "bold",
        fontSize: 30,
        color:"black",
        marginBottom: 20,
        textTransform:'uppercase'
    },

    inputView: {
        width: '100%',
        backgroundColor:"grey",
        borderRadius:25,
        height:30,
        marginTop:10,
        marginBottom: 10,
        justifyContent:"center",
        padding: 20
    },

    inputView2: {
    width: '100%',
    backgroundColor: 'grey',
    borderRadius: 25,
    height: 30,
    marginBottom: 10,
    justifyContent: 'center',
    padding: 20,
  },
    inputText: {
        height:50,
        color:"black"
    },

    loginBtn: {
        width: '100%',
        backgroundColor:"#2a3d66",
        borderRadius:25,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 10,
    },

    signUpBtn: {
        width: '100%',
        backgroundColor:"#2a3d66",
        borderRadius:25,
        height:30,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 10,
    },


    signupText: {
        color: 'white'
    },

    loginText: {
        color: 'white'
    },

    errorText: {
        color: 'red',
        fontSize: 12,
    },

});

export default App;