import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

class ExampleOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['今天记录',''],
      tableData: [
        ['一天不看浑身难受系列1',''],
         ['一天不看浑身难受系列2',''],
          ['一天不看浑身难受系列3',''],
           ['一天不看浑身难受系列4',''],
            ['一天不看浑身难受系列5',''],
            ['一天不看浑身难受系列6',''],
            ['一天不看浑身难受系列7',''],
            ['一天不看浑身难受系列8',''],
            ['一天不看浑身难受系列9',''],
            ['一天不看浑身难受系列10',''],
            ['一天不看浑身难受系列11',''],
            ['一天不看浑身难受系列12',''],

      ]
    }
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>继续观看</Text>
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
                    <Cell key={cellIndex} data={cellIndex === 1 ? element(cellData, index) : cellData} textStyle={styles.text}/>
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
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { paddingLeft : '25%', flexDirection: 'row', backgroundColor: 'white' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

export {ExampleOne};