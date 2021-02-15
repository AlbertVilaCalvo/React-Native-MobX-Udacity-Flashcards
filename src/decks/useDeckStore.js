import { useContext } from 'react'
import DeckStoreContext from './DeckStoreContext'

export default function useDeckStore() {
  return useContext(DeckStoreContext)
}
