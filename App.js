

import React from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const App = () => {
  const [date, setDate] = React.useState({
    startDate: null,
    endDate: null,
    midDate: null,
  });

  const [visible, setVisible] = React.useState(null);

  const onSubmit = () => {
    const {startDate, endDate, midDate} = date;
    if (startDate && endDate && midDate) {
      if (startDate > endDate) {
        Alert.alert('', 'Start Date shoul be less then End Date');
      } else if (midDate > startDate && midDate < endDate) {
        Alert.alert('Done!');
      } else
        Alert.alert(
          '',
          'Mid Date should be between in Start Date and End Date',
        );
    } else {
      Alert.alert('', 'Fill all dates');
    }
  };

  const {startDate, endDate, midDate} = date

  return (
    <SafeAreaView style={styles.container} >
      <View style={{flex: 1}} >
      <Text style={styles.heading} >Please Fill all details to submit</Text>
      <TouchableOpacity style={styles.input} onPress={() => setVisible('start')}>
        <Text style={styles.label} > Start Date: {startDate ? moment(startDate).format('D MMM YYYY') : 'Select Date'}</Text>
      </TouchableOpacity>
      { visible === 'start' && <RNDateTimePicker
        mode="date"
        value={date?.startDate || new Date()}
        onChange={(e, startDate) => {
          setDate({...date, startDate: new Date(startDate)});
          setVisible(null);
        }}
        onCancel={() => setVisible(null)}
      />}

      <TouchableOpacity style={styles.input} onPress={() => setVisible('end')}>
        <Text style={styles.label}> End Date: {endDate ? moment(endDate).format('D MMM YYYY') : 'Select Date'}</Text>
      </TouchableOpacity>
      {visible === 'end' && <RNDateTimePicker
        mode="date"
        value={date?.endDate || new Date()}
        onChange={(e, endDate) => {
          setDate({...date, endDate: new Date(endDate)});
          setVisible(null);
        }}
        onCancel={() => setVisible(null)}
      />}

      <TouchableOpacity style={styles.input} onPress={() => setVisible('mid')}>
        <Text style={styles.label}> Mid Date: {midDate ? moment(midDate).format('D MMM YYYY') : 'Select Date'}</Text>
      </TouchableOpacity>
      { visible === 'mid' && <RNDateTimePicker
        mode='date'
        value={date?.midDate || new Date()}
        onChange={(e, midDate) => {
          setDate({...date, midDate: new Date(midDate)});
          setVisible(null);
        }}
        onCancel={() => setVisible(null)}
      />}
      </View>

      <Button title="Submit" onPress={onSubmit} disabled={!(startDate && endDate && midDate)} />
    </SafeAreaView>
  );
};

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10
  },
  heading: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10
  },
  label: {
    fontSize: 16
  }
})