import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import { List, ListItem, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/Fontisto';
import { CustomHeader } from '../index';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-community/async-storage';

export class Investigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { "Begin": i18n.t('investigation.invhead'), End: i18n.t('investigation.inv1') },
                { "Begin": i18n.t('investigation.inv2head'), End: i18n.t('investigation.inv2') },
                { "Begin": i18n.t('investigation.inv3head'), End: i18n.t('investigation.inv3') },
                { "Begin": i18n.t('investigation.inv4head'), End: i18n.t('investigation.inv4') },
                { "Begin": i18n.t('investigation.inv5head'), End: i18n.t('investigation.inv5') },
                { "Begin": i18n.t('investigation.inv6head'), End: i18n.t('investigation.inv6') },
                { "Begin": i18n.t('investigation.inv7head'), End: i18n.t('investigation.inv7') },
            ]
        }
    }

    componentDidMount() {

        console.log("aSSASDASD:" + this.state._list_Data);
    }
    _keyExtractor = (item, index) => item.Begin.toString();
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fbb146" />
                <CustomHeader bgcolor='#fbb146' title={i18n.t('investigation.invheadding')} bcbuttoncolor='#ffc470' navigation={this.props.navigation} bdcolor='#fbb146' />
                <View style={{ backgroundColor: '#fbb146', height: 100, zIndex: -1, }}>

                </View>
                <View style={styles.footer}>
                    {/* <Text>Setting!</Text> */}
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <FlatList
                            style={{ backgroundColor: 'white' }}
                            data={this.state.data}
                            keyExtractor={this._keyExtractor}
                            renderItem={({ item }) =>
                                // <Text></Text>
                                <ListItem
                                    style={{ paddingTop: 5 }}

                                >

                                    <Body >
                                        <Text style={{ fontWeight: 'bold' }}>{item.Begin}</Text>
                                        <Text style={{ marginLeft: 10 }}>{item.End}</Text>
                                    </Body>
                                    <Right style={{ width: 5 }}>
                                        <View style={styles.iconMore}>
                                            <Icon name="angle-right" color="gray" />
                                        </View>
                                    </Right>
                                </ListItem>
                            }
                        />
                    </View>

                </View>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({

    footer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        bottom: 80,
        paddingVertical: 20,

        //  paddingHorizontal: 20
    }
});