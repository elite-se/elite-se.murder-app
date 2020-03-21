// @flow

export type SetPublicHelloWorldAction = {
  type: 'SET_PUBLIC_HELLO_WORLD',
  helloWorld: string
}

export type SetPrivateHelloWorldAction = {
  type: 'SET_PRIVATE_HELLO_WORLD',
  helloWorld: string
}

export type Action = SetPublicHelloWorldAction | SetPrivateHelloWorldAction

export function setPublicHelloWorld (helloWorld: string): SetPublicHelloWorldAction {
  return { type: 'SET_PUBLIC_HELLO_WORLD', helloWorld }
}

export function setPrivateHelloWorld (helloWorld: string): SetPrivateHelloWorldAction {
  return { type: 'SET_PRIVATE_HELLO_WORLD', helloWorld }
}
