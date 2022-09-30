// @flow

export type MurderAssignmentState = 'PENDING' | 'FULFILLED' | 'FAILED' | 'PLAYER_LEAVED';

export type MurderAssignment = {|
    id: number,
    killer: Player,
    target: Player,
    state: MurderAssignmentState,
    murder: Murder
|}
