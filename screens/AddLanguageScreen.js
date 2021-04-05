import React, {useState, useRef} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import Icon from 'react-native-vector-icons/Ionicons';

const items = [{
  id: '1',
  name: 'עברית'
}, {
  id: '2',
  name: 'ערבית'
}, {
  id: '3',
  name: 'אנגלית'
}, {
  id: '4',
  name: 'רוסית'
}, {
  id: '5',
  name: 'צרפתית'
}, {
  id: '6',
  name: 'ספרדית'
}, {
  id: '7',
  name: 'טורקית'
}
];

const styles = StyleSheet.create({
  buttonCircle: {
    width: 60,
    height: 60,
    backgroundColor: '#28527A',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20
  }
});

export default function AddLanguageScreen({ navigation }) {
const [selectedItems, setSelectedItems] = useState([]);
const multiSelectRef = useRef();

onSelectedItemsChange = selectedItems => {
  setSelectedItems(selectedItems)
};

return (
  <View style={{ flex: 1 , marginTop: 20}}>
    <Text style={{fontSize: 20}}>הוסף שפה</Text>
    <MultiSelect
      items={items}
      uniqueKey="id"
      ref={(component) => { multiSelectRef.current = component }}
      onSelectedItemsChange={onSelectedItemsChange}
      selectedItems={selectedItems}
      selectText="הקלד שפה"
      searchInputPlaceholderText="הקלד שפה"
      onChangeInput={ (text)=> console.log(text)}
      altFontFamily="ProximaNova-Light"
      tagRemoveIconColor="#28527A"
      tagBorderColor="#FFF"
      tagTextColor="#2E2E2E"
      selectedItemTextColor="#2E2E2E"
      selectedItemIconColor="#2E2E2E"
      styleItemsContainer={{fontSize: 25}}
      itemTextColor="#2E2E2E"
      displayKey="name"
      searchInputStyle={{ color: '#2E2E2E', fontSize: 25}}
      submitButtonColor="#28527A"
      submitButtonText="הוסף"
    />

    <View style={styles.buttonCircle}>
        <Icon
          name='arrow-back-outline'
          type='ionicon'
          color='white'
          size={28}
          onPress={() => {}}
        />
    </View>
  </View>
  )
}
