export default {
  games: {
    title: 'Games',
    gamecard: {
      id: 'ID: %{id}',
      code: 'Code: %{code}',
      owner: 'Created by %{owner}',
      numPlayers: {
        one: 'One participant',
        other: '%{numPlayers} participants',
        zero: 'No participants'
      }
    },
    empty: 'You do not take part in any games yet. Use the button below to add or join one.'
  },
  addGame: {
    title: 'Create game',
    submit: 'Create game',
    gameTitle: 'Title'
  },
  gamePreferences: {
    dailyReassignment: 'Reassign victims daily',
    allowAttestors: 'Allow attestors'
  },
  joinGame: {
    title: 'Join game',
    submit: 'Join game',
    gameCode: {
      label: 'Game code',
      hint: 'If you do not have a game code, ask the person who created the game or create a new one yourself.'
    },
    name: {
      label: 'Name',
      placeholder: 'Schelli Schellhorn',
      hint: 'You can choose a random name, but the other players should be able to identify you by that name.'
    },
    nameConflict: 'A player with the same name has already joined. Choose another one.'
  },
  errors: {
    ok: 'OK'
  },
  about: {
    title: 'App info',
    unknown: 'unknown',
    version: 'Version: ',
    nativeVersion: 'Native app version: ',
    appOwnership: 'App type: ',
    releaseChannel: 'Release channel: ',
    installationId: 'Installation ID: ',
    deviceName: 'Device name: ',
    deviceYearClass: 'Device year class: ',
    attributions: 'Attributions: ',
    iconAttribution: 'Icon made by mavadee from www.flaticon.com'
  }
}
