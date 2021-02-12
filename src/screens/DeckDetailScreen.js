import React, {useEffect} from 'react';
import {SafeAreaView, Text, TouchableOpacity} from 'react-native';
import CustomStatusBar from '../components/CustomStatusBar';

const DeckDetailScreen = ({route, navigation}) => {
  const deleteDeck = () => {
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({title: 'TODO'});
  }, [navigation]);

  return (
    <>
      <CustomStatusBar />
      <SafeAreaView>
        <Text>Deck</Text>
        <Text>ID: {route.params.deckId}</Text>
        <TouchableOpacity onPress={deleteDeck}>
          <Text>Delete Deck</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default DeckDetailScreen;
