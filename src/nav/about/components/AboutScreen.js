// @flow

import React from 'react'
import { Content, Grid, Row, Text } from 'native-base'
import AboutRow from '../../addgame/components/AboutRow'
import Constants from 'expo-constants'
import i18n from 'i18n-js'
import type { NavigationScreenProp, NavigationState } from 'react-navigation'

type PropsType = {|
  navigation: NavigationScreenProp<NavigationState>
|}

export default class AboutScreen extends React.Component<PropsType> {
  static valueOrUnknown (value?: string) { return value || i18n.t('about.unknown') }

  render () {
    return <Content style={{ padding: 10 }}>
      <Grid>
        <Row>
          <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 25, marginBottom: 8, marginLeft: 'auto', marginRight: 'auto' }}>
            {Constants.manifest.name}
          </Text>
        </Row>
        <AboutRow nameKey='about.version' value={AboutScreen.valueOrUnknown(Constants.manifest.version)}/>
        <AboutRow nameKey='about.releaseChannel' value={AboutScreen.valueOrUnknown(Constants.manifest.releaseChannel)}/>
        <AboutRow nameKey='about.nativeVersion' value={AboutScreen.valueOrUnknown(Constants.nativeAppVersion)}/>
        <AboutRow nameKey='about.appOwnership' value={AboutScreen.valueOrUnknown(Constants.appOwnership)}/>
        <AboutRow nameKey='about.installationId' value={AboutScreen.valueOrUnknown(Constants.installationId)}/>
        <AboutRow nameKey='about.deviceName' value={AboutScreen.valueOrUnknown(Constants.deviceName)}/>
        <AboutRow nameKey='about.deviceYearClass' value={AboutScreen.valueOrUnknown(Constants.deviceYearClass)}/>
        <AboutRow nameKey='about.attributions' value={i18n.t('about.iconAttribution')}/>
      </Grid>
    </Content>
  }
}
