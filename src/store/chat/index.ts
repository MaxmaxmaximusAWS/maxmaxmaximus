import { Reducer } from 'redux'
import { ChatActions, ChatState, DELETE_MESSAGE, SEND_MESSAGE } from './types'

export const initialState: ChatState = {
  messages: [],
}

export const chat: Reducer<ChatState, ChatActions> = (
  state: ChatState = initialState,
  action: ChatActions
) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: Math.random(),
            text: action.payload.text,
            date: new Date(),
          },
        ],
      }

    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message.id !== action.payload.id
        ),
      }
  }
  return state
}
