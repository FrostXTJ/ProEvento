import React, {useState} from "react";
import { StyleSheet, View, Button,Text,TouchableOpacity} from "react-native";
import { Input, Icon } from "react-native-elements";
import {changePassword} from "../api/ProEventoAPI";

const ChangePasswordScreen = ({navigation, route}) => {
    const {myAccount, profileUser} = route.params;
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onChange = credential => {
        changePassword(
            credential,
            account => {
                myAccount(account);
                setSuccess("You've successfully changed your password.");
                setError(null);
            },
            error => {
                console.log("The password change fails");
                setError("The Old Password is Wrong");

            }
        );
    };

    const display = () => {
        if (newPassword != confirmPassword) {
            setError("The passworld you enter does not match");
        }else{
            onChange({accountId : myAccount.id,
                currentPassword : oldPassword,
                newPassword : newPassword}
            );

        }
    }

    const message = error ? error: null;
    const message1 = success ? success: null;

    return (
        <View style={styles.container}>
            <Input
                placeholder="Old Password"
                secureTextEntry={false}
                onChangeText={input => {
                    setOldPassword(input);
                }}
                leftIcon={<Icon name="lock" size={24} color="black" />}
            />
            <Input
                placeholder="New Password"
                secureTextEntry={true}
                onChangeText={input => {
                    setNewPassword(input);
                }}
                leftIcon={<Icon name="lock" size={24} color="black" />}
            />

            <Input
                placeholder="Confirm Password"
                secureTextEntry={true}
                onChangeText={input => {
                    setConfirmPassword(input);
                }}
                leftIcon={<Icon name="lock" size={24} color="black" />}
            />
            <View>
                <Text style = {styles.text1}>
                    {message}
                    {message1}
                </Text>
            </View>

            <TouchableOpacity
                    style = {styles.button}
                    onPress={() => {
                        display();
                    }
                    } //newly added
            >
                <Text style = {styles.text}>Change Your Password</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    button :{
        backgroundColor: "orange",
        alignItems: "center",
        padding: 10,

    },
    text : {
        color : 'white',
        fontWeight : 'bold',
    },
    text1 : {
        color : 'red',
        alignItems: "center",
        padding: 20,
    }
});

export default ChangePasswordScreen;
