import React from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';

const NewDeckScreen = () => {
  return (
    <>
      <CustomStatusBar />
      <SafeAreaView>
        <Text>Create New Deck</Text>
        <TouchableOpacity>
          <Text>Create Deck</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default NewDeckScreen;
