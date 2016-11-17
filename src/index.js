import express from 'express'
import fs from 'fs'
import dotenv from 'dotenv'
import requestHeaderParser from './request-header-parser'

try {
  fs.accessSync('.env', fs.F_OK)
  dotenv.load({ path: '.env' })
} catch (err) {
}

const app = express()

app.set('port', process.env.PORT || 3000)

app.get('*', requestHeaderParser)

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`)
})

export default app
