import { router } from 'expo-router';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

const HomePage = () => {

    const onPressaccInfo = () => {
        router.replace('/accInfo');
    };

    const onPressCustom = () => {
        router.replace('/ContactList');
    };

    return (
        <ImageBackground source={{ uri: 'https://t4.ftcdn.net/jpg/03/57/34/39/360_F_357343965_u58BFcRrziBVMqgt6liwPHJKcIjHsPnc.jpg' }}
        style={styles.bG}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>CONTACT LIST</Text>
                    <TouchableOpacity onPress={onPressCustom} style={styles.todoBtn}>
                        <Text style={styles.customText}>EDIT CONTACTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressaccInfo} style={styles.accBtn}>
                        <Text style={styles.recipeText}>ACCOUNT INFORMATION</Text>
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
        borderWidth: 1,
        borderColor: 'white',
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
        marginBottom: 20
    },

    todoBtn: {
        width: '100%',
        backgroundColor:"#2a3d66",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 10,
    },

    accBtn: {
        width: '100%',
        backgroundColor:"#2a3d66",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 10,
    },

    logoutBtn: {
        width: '100%',
        backgroundColor:"black",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop: 10,
    },

    customText: {
        color: 'white'
    },

    recipeText: {
        color: 'white'
    },

});

export default HomePage;