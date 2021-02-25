import { Action } from 'redux'

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

export interface Message {
  id: number
  text: string
  date: Date
}

export interface ChatState {
  messages: Message[]
}

export interface SendMessageAction extends Action {
  type: typeof SEND_MESSAGE
  payload: Pick<Message, 'text'>
}

export interface DeleteMessageAction extends Action {
  type: typeof DELETE_MESSAGE
  payload: Pick<Message, 'id'>
}

export type ChatActions = SendMessageAction | DeleteMessageAction
