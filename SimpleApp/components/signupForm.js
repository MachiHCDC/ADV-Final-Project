import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 
import { app } from '../Firebase/firebase';


const SignUp = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [respose,setResponse] =useState('');

    useEffect(() => {
        if (user.length > 0) {
            if (!user.endsWith('@gmail.com')) {
                setEmailError('Invalid email format');
            } else {
                setEmailError('');
                // Clear the password error when the email is valid
                setPasswordError('');
            }
        }

        if (password.length > 0) {
            if (password.length < 8 || password.length > 20) {
                setPasswordError('Password must be between 8 to 20 characters');
            } else if (password !== confirmPassword) {
                setPasswordMessage('Password doesn\'t match');
            } else {
                setPasswordError('');
                setPasswordMessage('Password match');
            }
        }
    }, [user, password, confirmPassword]);

    const auth = getAuth (app);
    const onPressSignUp = async () => {
        if (user !== '' && password !== '') { 
            try {
                createUserWithEmailAndPassword(auth, user, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log(userCredential);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        setResponse(error.message);
                    });
            } catch (err) {
                console.log(err);
            }
            router.replace('/sucSignUp');
        } else {
            alert('Incorrect email or password');
        }
        console.log(user);
        console.log(password);
    };
    
    const onPressLogin = () => {
        router.replace('/');
    };

    return (
        <ImageBackground
            source={{
                uri: 'https://t4.ftcdn.net/jpg/03/57/34/39/360_F_357343965_u58BFcRrziBVMqgt6liwPHJKcIjHsPnc.jpg',
            }}
            style={styles.bG}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Sign Up</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Enter Email"
                            placeholderTextColor="white"
                            onChangeText={(text) => setUser(text)}
                        />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry={!showPassword}
                            placeholder="Enter Password"
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
                    {passwordError ? (
                        <Text style={styles.errorText}>{passwordError}</Text>
                    ) : null}

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry={!showPassword}
                            placeholder="Confirm Password"
                            placeholderTextColor="white"
                            onChangeText={(text) => setConfirmPassword(text)}
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
                    {passwordMessage ? (
                        <Text style={passwordMessage === 'Password match' ? styles.successText : styles.errorText}>
                            {passwordMessage}
                        </Text>
                    ) : null}

                    <TouchableOpacity onPress={onPressSignUp} style={styles.loginBtn}>
                        <Text style={styles.loginText}>SIGN UP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onPressLogin} style={styles.signUpBtn}>
                        <Text style={styles.signupText}>LOGIN EXISTING ACCOUNT</Text>
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
        borderWidth: 3,
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
        marginBottom:10,
        justifyContent:"center",
        padding:20
    },

    inputText: {
        height:50,
        color:"black"
    },

    loginBtn: {
        width: '100%',
        backgroundColor:"#2a3d66",
        borderRadius:25,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 10,
    },

   signUpBtn: {
        width: '100%',
        backgroundColor:"#2a3d66",
        borderRadius:25,
        height:40,
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

    successText: {
        color: 'green',
        fontSize: 12,
    },

});

export default SignUp;