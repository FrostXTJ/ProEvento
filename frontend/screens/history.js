import React, { Component } from 'react';
import { Divider } from "react-native-elements";
import {  ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import axios from 'axios';
import { useState, useEffect } from 'react';

class ExampleOne extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tableHead: ['Today\'s Viewd',''],
      tableData: [
      ],
    }
  }

  _alertIndex(url) {
    Alert.alert('The twilioRoomUrl is ' + url);
  }

 componentDidMount() {
    axios.get('http://3.133.124.52:8080/api/event/user_registered_events?userId=2')
    .then (function (response) {
        var events = response['data'];
        var i;
        var nameList  = []
        for ( i = 0; i < events.length; i++){
            var temp = [];
            temp.push(events[i]['description'].toString());
            temp.push(events[i]['twilioRoomUrl'].toString());
            nameList.push(temp);
        }
        //Dummy Data for Testing
        nameList.push(['一天不看后悔系列1','www.baidu.com']);
        nameList.push(['一天不看后悔系列2','www.google.com']);
        nameList.push(['一天不看后悔系列3','www.kk.com']);
        nameList.push(['一天不看后悔系列4','www.fk.com']);
        nameList.push(['一天不看后悔系列5','www.hello.com']);
        nameList.push(['一天不看后悔系列6','www.csci310.com']);
        nameList.push(['一天不看后悔系列7','www.csci350.com']);
        nameList.push(['一天不看后悔系列8','www.csci360.com']);
        nameList.push(['一天不看后悔系列9','www.csci361.com']);
        nameList.push(['一天不看后悔系列10','www.csci362.com']);
        nameList.push(['一天不看后悔系列11','www.csci363.com']);
        nameList.push(['一天不看后悔系列12','www.csci364.com']);
        nameList.push(['一天不看后悔系列13','www.csci365.com']);
        nameList.push(['一天不看后悔系列14','www.csci366.com']);
        nameList.push(['一天不看后悔系列15','www.csci367.com']);
        nameList.push(['一天不看后悔系列16','www.csci368.com']);
        nameList.push(['一天不看后悔系列17','www.csci369.com']);
        nameList.push(['一天不看后悔系列18','www.csci370.com']);
        nameList.push(['一天不看后悔系列19','www.csci371.com']);


        this.setState({tableData: nameList});

    }.bind(this))
    .catch ( function (error) {
        console.log(error);
    });

  }



 // axios.get('http://3.133.124.52:8080/api/event/user_registered_events?userId=2');
  render() {
    const state = this.state;

    const element = (url, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(url)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Watch Again</Text>
        </View>
      </TouchableOpacity>

    );



    return (
      <View style={styles.container}>
        <ScrollView>
        <Table borderStyle={{borderColor: 'transparent'}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          {

            state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {

                  rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 1 ? element(cellData, index) : cellData} textStyle={styles.text1}/>
                  ))
                }

              </TableWrapper>

            ))
          }

        </Table>
        </ScrollView>
      </View>
    )
  }


}

const styles = StyleSheet.create({
  container: { width : '100%', backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: 'orange'},
  text: { margin: 6, fontWeight: 'bold',color : 'white'},
  text1: {margin: 6, fontWeight: 'bold',color : 'orange'},
  row: { paddingLeft : '20%' , flexDirection: 'row', backgroundColor: 'white' },
  btn: { width: 80, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

export {ExampleOne};