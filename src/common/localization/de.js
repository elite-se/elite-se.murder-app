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
    }
  },
  credits: {
    title: 'Danksagung',
    content: 'Icon erstellt von mavadee von www.flaticon.com'
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
    furtherRules: 'Weitere Regeln (optional)'
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
    participants: {
      title: 'Teilnehmer'
    },
    preferences: {
      title: 'Regeln'
    }
  }
}
