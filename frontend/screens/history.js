import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

class ExampleOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Head', 'Head2', 'Head3', 'Head4','Head5'],
      tableData: [
        ['1', '2', '3', '4',''],
        ['a', 'b', 'c', 'd',''],
        ['1', '2', '3', '4',''],
        ['a', 'b', 'c', 'd',''],
         ['1', '2', '3', '4',''],
                ['a', 'b', 'c', 'd',''],
                ['1', '2', '3', '4',''],
                 ['1', '2', '3', '4',''],
                        ['a', 'b', 'c', 'd',''],
                        ['1', '2', '3', '4',''],
                         ['1', '2', '3', '4',''],
                                ['a', 'b', 'c', 'd',''],
                                ['1', '2', '3', '4','']
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
          <Text style={styles.btnText}>button</Text>
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
                    <Cell key={cellIndex} data={cellIndex === 4 ? element(cellData, index) : cellData} textStyle={styles.text}/>
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
  container: { width : '100%', padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40, backgroundColor: '#808B97' },
  text: { margin: 6 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' }
});

export default ExampleOne;