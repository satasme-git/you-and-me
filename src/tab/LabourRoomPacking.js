import React, { Component, useState } from 'react';
import { Modal, StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity, ScrollView, FlatList, Switch,StatusBar } from 'react-native';
import { CustomHeader } from '../index';
import { Icon } from 'react-native-elements';
import { List, ListItem, Left, Body, Right } from 'native-base';
import { IMAGE } from '../constants/image';
import *as Animatable from 'react-native-animatable';
import Database from '../Database';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18n-js';
import {
    BarIndicator,
} from 'react-native-indicators';
const db = new Database();

var ddd;
export class LabourRoomPacking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true,
            _mother_bag: [],
            notFound: 'mother bag not found.\nPlease click (+) button to add it.',
            switchValue: '',
            date: '',
            dbs: '',
            lan: '',

        }
        db.initDB().then((result) => {
            this.loadDbVarable(result);
        })

        this.loadDbVarable = this.loadDbVarable.bind(this);
        this.getData = this.getData.bind(this);

    }
    componentDidMount() {
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        that.setState({
            date:
                year + '-' + month + '-' + date,
        });

    }
    async loadDbVarable(result) {
        this.setState({
            dbs: result,
            lan: await AsyncStorage.getItem('lang'),
        });
        this.viewListData();
    }

    getData = (value, value2) => {

        let data = {
            lStatus: value2,
            lId: value,
            date: this.state.date,
        }

        this.setState({ switchValue: value });
        let result;
        if (value != null) {
            db.updateStatusLabourRoom(this.state.dbs, data,this.state.lan).then((result) => {
                console.log(result);
                this.setState({
                    isLoading: false,
                });

            }).catch((err) => {
                console.log(err);
                this.setState({
                    isLoading: false,
                });
            })
        }
        db.listBagLabour(this.state.dbs,this.state.lan).then((data) => {
            result = data;
            if (result == 0) {
                db.addItemOfMother_bag(this.state.dbs).then((result) => {
                    console.log(result);

                }).catch((err) => {
                    console.log(err);
                })
            } else {
                this.viewListData();
            }
        }).catch((err) => {
            console.log(err);
        })
    }
    viewListData() {


        let mother_bag = [];
        db.listLabourRoomBagItems(this.state.dbs,this.state.lan).then((data) => {


            if (data != null) {
                mother_bag = data;

                this.setState({
                    _mother_bag: mother_bag,
                    isLoading: false,
                });

            }


        }).catch((err) => {
            console.log(err);
            this.setState = {
                isLoading: false
            }
        })

    }
    keyExtractor = (item, index) => index.toString()
    render() {
        let { isLoading } = this.state

        if (isLoading) {
            return (
                <BarIndicator color='#fbb146' />
            );
        } else {
            let value = 0;


            return (

                <SafeAreaView style={{ flex: 1, }}>
                      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#F2F2F2" />
                    <CustomHeader bgcolor='#F2F2F2' title={i18n.t('bag.Preparelabourbaghead')}  bcbuttoncolor='#fff' navigation={this.props.navigation} bdcolor='#F2F2F2' />

                    <View style={styles.header}>
                        <Image style={{ width: 400, height: 290, marginLeft: 0, }}
                            source={IMAGE.ICON_LABOURROOMBAG}
                            resizeMode="contain"
                        />
  
                    </View>
                    <Animatable.View style={styles.footer} animation="fadeInUpBig">
                    <View style={styles.brestposition5}></View>
                    <View style={styles.brestposition6}></View>
                    <View style={styles.brestposition3}></View>
                    <View style={styles.brestposition4}></View>
                        <Text style={{ marginHorizontal: 20, fontSize: 18, fontWeight: "bold", marginTop: 15 }}>{i18n.t('bag.Preparelabourbag')}</Text>
                        <FlatList


                            keyExtractor={this.keyExtractor}
                            data={this.state._mother_bag}
                            // renderItem={this.renderItem}

                            renderItem={({ item }) => <ListItem
                                style={{  paddingTop: 8,paddingBottom:8 }}
                                onPress={() => {
                                    this.getData(item.lId, item.lStatus);

                                }}
                            >
                                {
                                    item.lStatus == "true" ?
                                        <Left >
                                            <Icon
                                                name='check-circle'
                                                type='font-awesome'
                                                color='#009688'
                                                iconStyle={{ fontSize: 25, paddingTop:5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, backgroundColor: '#b2dfdb', borderRadius: 8, }}
                                                onPress={() => console.log('hello')} />
                                        </Left> : <Left>
                                            <Icon
                                                name='check-circle'
                                                type='font-awesome'
                                                color='#fff'
                                                iconStyle={{ fontSize: 25, paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, backgroundColor: '#eceff1', borderRadius: 8, }}
                                                onPress={() => console.log('hello')} />
                                        </Left>
                                }
                                <Body style={{ marginLeft: -180 }}>

                                    <Text>{item.lName}</Text>
                                    <Text style={styles.dateText}>{
                                        item.lStatus == "true" ?
                                            item.lDate : ''
                                    }</Text>
                                </Body>
                                <Right style={{paddingHorizontal:5}}>

                                    <Switch
                                        disabled={true}
                                        trackColor={{ true: '#f78a2ced', false: 'grey' }}
                                        thumbColor={'white'}
                                        value={item.lStatus == "true" ? true : false}
                                    // style={[item.lStatus ? styles.switchEnableBorder : styles.switchDisableBorder]}
                                    />

                                </Right>
                            </ListItem>
                            } />


                    </Animatable.View>
                </SafeAreaView>
            );
        }
      
    }
}
const styles = StyleSheet.create({

    button: {
        backgroundColor: "#6a1b9a",
        padding: 10,
        borderRadius: 25,
        // width:'200',
        width: 150,

        marginTop: 15,
        marginLeft: 18,
        marginVertical: 5
    },
    buttonText: {
        fontSize: 15,
        color: '#fff',
    }, dateText: {
        fontSize: 11,
        color: 'grey',
    }, insText: {
        color: "grey",
        fontSize: 12,
        marginLeft: 19,

    }, footer: {
        flex: 2,
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }, header: {
        flex: 1,
    }, switchEnableBorder: {
        borderColor: 'blue',
        borderWidth: 1
    },

    switchDisableBorder: {
        borderColor: 'red',
        borderWidth: 1,
    },  brestposition5: {
        width: 260,
        height: 260,
        marginLeft: 280,
        marginTop: 390,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(255, 224, 175, 0.3)',
        borderRadius: 130,
        zIndex: -2,
        position: 'absolute'
    }, brestposition6: {
        width: 140,
        height: 140,
        marginTop: 450,
        marginLeft: 338,
        backgroundColor: 'rgba(242, 242,242, 1)',
        borderRadius: 110,
        zIndex: -1,

        position: 'absolute'
    }
   , brestposition3: {
        width: 260,
        height: 260,
        marginLeft: -120,
        marginTop: 10,
        flexDirection: 'row-reverse',
        backgroundColor: 'rgba(255, 224, 178, 0.2)',
        borderRadius: 130,
        zIndex: -2,
        position: 'absolute'
    }, brestposition4: {
        width: 170,
        height: 170,
        marginTop: 52,
        marginLeft: -82,
        backgroundColor: 'rgba(255, 255,255, 1)',
        borderRadius: 110,
        zIndex: -1,

        position: 'absolute'
    }
});