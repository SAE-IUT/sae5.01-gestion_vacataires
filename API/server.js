const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.status(404).send("ERROR")
})

app.get('/vacataires', (req, res) => {
    res.status(200).json({
      vacataires: [
        {
          "id": 1,
          "name": "Louis",
          "lastName": "Chanouha",
          "abbreviation" : "LC",
          "department": [
            "info",
            "cs"
          ],
          "email" : "louis.chanouha@gmail.com",
          "skills" : [
            "Développement",
            "Base de données",
            "Réseaux"
          ],
          "socials" : [
            "",
            "",
            ""
          ],
          "status": "en attente"
        },
        {
          "id": 2,
          "name": "Jean-Michel",
          "lastName": "Bruel",
          "abbreviation" : "JMB",
          "department": [
            "info",
            "cs"
          ],
          "email" : "jean-michel.bruel@gmail.com",
          "skills" : [
            "Développement",
            "Base de données",
            "Réseaux"
          ],
          "socials" : [
            "",
            "",
            ""
          ],
          "status": "libre"
        },
        {
          "id": 3,
          "name": "Esther",
          "lastName": "Pendaries",
          "abbreviation" : "EP",
          "department": [
            "info",
            "cs"
          ],
          "email" : "esther.pendaries@gmail.com",
          "skills" : [
            "Développement",
            "Base de données",
            "Réseaux"
          ],
          "status": "admis"
        }
      ]
    }
    )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
