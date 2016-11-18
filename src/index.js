import express from 'express'
import cors from 'cors'
import path from 'path'
import { requestHeaderParser } from './api'

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public')})
})

app.get('*', requestHeaderParser)

app.set('port', process.env.PORT || 3000)
app.listen(app.get('port'), () => {
  console.log(__dirname)
  console.log(`Server listening on port ${app.get('port')}`)
})

export default app
