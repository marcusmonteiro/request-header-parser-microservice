import express from 'express'
import requestHeaderParser from './request-header-parser'

const app = express()

app.set('port', process.env.PORT || 3000)

app.get('*', requestHeaderParser)

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`)
})

export default app
