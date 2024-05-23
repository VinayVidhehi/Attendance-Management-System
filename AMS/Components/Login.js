import {View, Text, StyleSheet, Image, Pressable, ScrollView, Dimensions, Alert } from 'react-native'

const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        axios.post('http://dummy-backend.com/login', { email, password })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    } 

    return (
        <View style={styles.container}>
            <Text>Email:</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
            />
            <Text>Password:</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry={true}
            />
        <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '80%'
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }
});

export default Login;
