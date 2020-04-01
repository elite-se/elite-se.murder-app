// @flow

import Base64 from 'base-64'

type HeaderType = {|
  typ: string,
  alg: string
|}

type PayloadType = {|
  sub: string,
  exp: number
|}

type ParsedType = {|
  header: HeaderType,
  payload: PayloadType,
  signature: string
|}

export default class ApiToken {
  rawToken: string
  parsed: ?ParsedType

  constructor (rawToken: string) {
    this.rawToken = rawToken
  }

  /**
   * Use this to remove the "Bearer " part from rawToken
   * @returns {string} the part of rawToken after the first space character
   */
  rawWithoutAuthType = () => this.rawToken.split(' ', 2)[1]

  parseJwt = () => {
    const [header, payload, signature] = this.rawWithoutAuthType().split('.', 3)
    return {
      header: JSON.parse(Base64.decode(header)),
      payload: JSON.parse(Base64.decode(payload)),
      signature: signature
    }
  }

  getParsed = () => {
    if (!this.parsed) { this.parsed = this.parseJwt() }
    return this.parsed
  }

  getExpiry = () => new Date(this.getParsed().payload.exp * 1000)
  getSubject = () => this.getParsed().payload.sub
}
