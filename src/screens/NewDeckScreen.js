import React from 'react';
import {SafeAreaView, StatusBar, Text, TouchableOpacity} from 'react-native';

const NewDeckScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
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
