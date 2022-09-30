export default {
  games: {
    title: 'Spiele',
    gamecard: {
      id: 'ID: %{id}',
      code: 'Code: %{code}',
      owner: 'Erstellt von %{owner}',
      numPlayers: {
        one: 'Ein Teilnehmer',
        other: '%{numPlayers} Teilnehmer',
        zero: 'Kein Teilnehmer'
      }
    },
    empty: 'Du bist noch kein Teilnehmer eines Spiels. Nutze den Knopf unten rechts, um eines zu erstellen oder einem beizutreten.'
  },
  addGame: {
    title: 'Spiel erstellen',
    submit: 'Spiel erstellen',
    gameTitle: 'Titel'
  },
  gamePreferences: {
    dailyReassignment: 'Opfer täglich neu zuteilen',
    allowAttestors: 'Augenzeugen erlauben',
    header: 'Regeln',
    onlySpecificWeapons: 'Nur bestimmte Waffen',
    furtherRules: 'Weitere Regeln (optional)',
    weapons: 'Waffen',
    weaponsList: {
      addPlaceholder: 'Tippen, um Waffe hinzuzufügen'
    }
  },
  joinGame: {
    title: 'Spiel beitreten',
    submit: 'Spiel beitreten',
    gameCode: {
      label: 'Spiel-Code',
      hint: 'Wenn du keinen Spiel-Code hast, frage die Person, die das Spiel erstellt hat, oder erstelle selbst ein neues.'
    },
    name: {
      label: 'Name',
      placeholder: 'Schelli Schellhorn',
      hint: 'Du kannst dir einen beliebigen Namen aussuchen, aber die anderen Spieler sollten dich anhand von ihm identifizieren können.'
    },
    nameConflict: 'Es ist bereits ein Spieler mit diesem Namen beigetreten. Wähle einen anderen.'
  },
  errors: {
    ok: 'OK'
  },
  game: {
    assignments: {
      title: 'Mordauftrag',
      empty: 'Das Spiel hat noch begonnen',
      current: {
        claim: 'Dein aktueller Mordauftrag gilt %{target}'
      },
      former: {
        claim: 'Du hast %{target} erfolgreich ermordet'
      },
      failed: {
        claim: 'Du hast das vor %{target} das zeitliche gesegnet'
      },
      leaved: {
        claim: 'Du hast dich Feige aus dem Staub gemacht'
      }
    },
    participants: {
      title: 'Teilnehmer'
    },
    preferences: {
      title: 'Regeln'
    }
  },
  about: {
    title: 'App-Info',
    unknown: 'unbekannt',
    version: 'Version: ',
    nativeVersion: 'Native App-Version: ',
    appOwnership: 'App-Typ: ',
    releaseChannel: 'Release-Kanal: ',
    installationId: 'Installations-ID: ',
    deviceName: 'Gerätename: ',
    deviceYearClass: 'Gerät-Jahresklasse: ',
    iconAttribution: 'Icon erstellt von mavadee von www.flaticon.com',
    pushToken: 'Push-Token: '
  },
  notificationChannels: {
    gameEnd: {
      name: 'Spiel zu Ende',
      description: 'Erscheint einmal beim Spielende'
    },
    assignment: {
      name: 'Mord-Zuteilung',
      description: 'Erscheint, wenn dir ein Opfer zugewiesen wird'
    }
  }
}
