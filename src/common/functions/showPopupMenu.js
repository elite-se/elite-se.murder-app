// @flow

import React from 'react'
import { findNodeHandle, UIManager } from 'react-native'

type Ref<T> = {| current: null | T |}

export type MenuEntry = {|
  title: string,
  handler: () => any
|}

const showPopupMenu = (menuEntries: MenuEntry[], ref: Ref<React.Component<any, any>>) => {
  UIManager.showPopupMenu(
    findNodeHandle(ref.current),
    menuEntries.map(e => e.title),
    (error) => console.warn(error),
    (title, index) => {
      menuEntries[index || 0].handler()
    }
  )
}

export default showPopupMenu
