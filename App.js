import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import InAppBilling from 'react-native-billing';


const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
    componentDidMount() {

        this.checkSubscription().then(e => {
            alert("YYEESS!!"+e)
        }).catch(e => {
            alert("NNOO!!!!"+ e);
        })
    }

    async checkSubscription() {
        try {
            await InAppBilling.open();
            // If subscriptions/products are updated server-side you
            // will have to update cache with loadOwnedPurchasesFromGoogle()
            await InAppBilling.loadOwnedPurchasesFromGoogle();
            const isSubscribed = await InAppBilling.isSubscribed("myapp.productId")
            console.log("Customer subscribed: ", isSubscribed);
        } catch (err) {
            console.log("ERROROROOROR::: ",err);
            alert("FUCK!!"+err)
        } finally {
            await InAppBilling.close();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to React Native!</Text>
                <Text style={styles.instructions}>To get started, edit App.js</Text>
                <Text style={styles.instructions}>{instructions}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
