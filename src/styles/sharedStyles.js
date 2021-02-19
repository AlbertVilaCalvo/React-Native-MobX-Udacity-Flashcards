import { StyleSheet } from 'react-native'

const sharedStyles = StyleSheet.create({
  containerCentered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCenteredPaddingHorizontal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  containerCenterVerticalPaddingHorizontal: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  textInput: { height: 40, fontSize: 18 },
})

export default sharedStyles
