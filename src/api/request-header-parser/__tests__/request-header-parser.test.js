/* eslint-env mocha */

import { expect } from 'chai'
import request from 'supertest'
import Chance from 'chance'
import app from '../../..'

describe('request header parser', () => {
  it(`should return the request header's ip address, language, and operating system when requesting any URI`, () => {
    const testCases = [
      {
        windows: {
          language: 'pt-br',
          expectedLanguage: 'pt-br',
          userAgent: 'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1090.0 Safari/536.6',
          expectedSoftware: 'Windows 8'
        }
      },
      {
        osx: {
          language: 'en-US,en;q=0.5',
          expectedLanguage: 'en-US',
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11',
          expectedSoftware: 'Mac OS 10.7.3'
        }
      },
      {
        linux: {
          language: 'fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5',
          expectedLanguage: 'fr-CH',
          userAgent: 'Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/534.16 (KHTML, like Gecko) Chrome/10.0.648.127 Safari/534.16',
          expectedSoftware: 'Linux i686'
        }
      },
      {
        ios: {
          language: 'pt, pt-br;q=0.3',
          expectedLanguage: 'pt',
          userAgent: 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3',
          expectedSoftware: 'iOS 5.1.1'
        }
      },
      {
        android: {
          language: 'de',
          expectedLanguage: 'de',
          userAgent: 'Mozilla/5.0 (Linux; U; Android-4.0.3; en-us; Galaxy Nexus Build/IML74K) AppleWebKit/535.7 (KHTML, like Gecko) CrMo/16.0.912.75 Mobile Safari/535.7',
          expectedSoftware: 'Android 4.0.3'
        }
      },
      {
        chromiumOS: {
          language: 'es',
          expectedLanguage: 'es',
          userAgent: 'Mozilla/5.0 (X11; U; CrOS i686 9.10.0; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.0.253.0 Safari/532.5',
          expectedSoftware: 'Chromium OS 9.10.0'
        }
      }
    ]

    testCases.forEach((testCase) => {
      const caseName = Object.keys(testCase)[0]
      const ipaddress = '::ffff:127.0.0.1'
      const language = testCase[caseName].language
      const expectedLanguage = testCase[caseName].expectedLanguage
      const userAgent = testCase[caseName].userAgent
      const software = testCase[caseName].expectedSoftware

      const expectedResponse = {
        ipaddress,
        language: expectedLanguage,
        software
      }

      const validURICharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~:/?#[]@!$&'()*+,;=`."
      const randomURI = `/${new Chance().string({
        pool: validURICharacters
      })}`

      request(app)
      .get(randomURI)
      .set('Accept-Language', language)
      .set('User-Agent', userAgent)
      .expect(200)
      .expect((res) => {
        expect(res.body).to.deep.equal(expectedResponse)
      })
      .end((err, res) => {
        if (err) {
          console.log(err)
          return done(err) // eslint-disable-line no-undef
        } else {
          done() // eslint-disable-line no-undef
        }
      })
    })
  })
})
