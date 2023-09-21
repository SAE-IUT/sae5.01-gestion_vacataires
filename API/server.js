const express = require('express')
const cors = require('cors');

const app = express()
const port = 3000

app.use(cors());

app.get('/', (req, res) => {
  res.status(404).send("ERROR")
})

// GET the tutors data
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
      ],

    }
    )
})

// GET the tutors data
app.get('/cours', (req, res) => {
  res.status(200).json({
    cours: [
      {
        "id": 1,
        "name": "Développement Avancée",
        "department": "BUT2",
        "tutors": [
          "JMB",
          "LC"
        ]
      },
      {
        "id": 2,
        "name": "Archi réseau",
        "department": "BUT3",
        "tutors": [
          "JMB"
        ]
      },
      {
        "id": 3,
        "name": "Base de données",
        "department": "BUT1",
        "tutors": [
          "EP",
          "LC"
        ]
      },
      {
        "id": 4,
        "name": "Base de données",
        "department": "BUT1",
        "tutors": [
          "EP",
          "LC"
        ]
      },
      {
        "id": 5 ,
        "name": "Base de données",
        "department": "BUT1",
        "tutors": [
          "EP",
          "LC"
        ]
      }
    
    ]
  }
  )
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
