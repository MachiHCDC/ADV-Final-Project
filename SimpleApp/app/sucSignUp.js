import { router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';


const App = () => {

    const onPressSignUp = () => {
        router.replace('/');
    };

    return (
        <ImageBackground source={{ uri: 'https://t4.ftcdn.net/jpg/03/57/34/39/360_F_357343965_u58BFcRrziBVMqgt6liwPHJKcIjHsPnc.jpg' }}
        style={styles.bG}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Successfully Registered...</Text>

                    <TouchableOpacity onPress={onPressSignUp} style={styles.signUpBtn}>
                        <Text style={styles.signupText}>LOGIN</Text>
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
        borderRadius:25,
        padding: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    title: {
        fontWeight: "bold",
        fontSize:30,
        color:"black",
        marginBottom: 20,
    },

    signUpBtn: {
        width: '100%',
        backgroundColor:"#2a3d66",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:10,
    },

    signupText: {
        color: 'white'
    },

});

export default App;