import { StyleSheet } from 'react-native'

const sharedStyles = StyleSheet.create({
  containerPadding: { paddingHorizontal: 40, paddingVertical: 40 },
  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCenteredVertical: {
    flex: 1,
    justifyContent: 'center',
  },
  notFoundText: {
    fontSize: 18,
  },
  textInput: { height: 40 },
})

export default sharedStyles
