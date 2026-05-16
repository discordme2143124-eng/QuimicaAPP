/* =========================================
   START SERVER
========================================= */
/* =========================================
   BUILDER IA
========================================= */

app.post('/api/build', async (req, res) => {

  try{

    const {

      carbonos,
      grupo,
      sustituyente,
      posicion

    } = req.body;

    const prompt = `

Construye una molécula orgánica con:

- ${carbonos} carbonos
- grupo funcional ${grupo}
- sustituyente ${sustituyente}
- posición ${posicion}

Responde EXACTAMENTE con este formato:

NOMBRE IUPAC:
(nombre)

FÓRMULA SEMIDESARROLLADA:
(formula)

EXPLICACIÓN:
(explicacion breve)

PROPIEDADES:
(propiedades importantes)

USOS:
(lista)

REACCIONES POSIBLES:
(lista)

No uses markdown.
Responde en español.
`;

    const response = await fetch(

      'https://api.groq.com/openai/v1/chat/completions',

      {

        method:'POST',

        headers:{

          'Content-Type':'application/json',

          Authorization:
            `Bearer ${process.env.GROQ_API_KEY}`
        },

        body:JSON.stringify({

          model:
            'llama-3.3-70b-versatile',

          messages:[

            {
              role:'system',
              content:
              'Eres un químico experto.'
            },

            {
              role:'user',
              content:prompt
            }
          ],

          temperature:0.2
        })
      }
    );

    const data =
      await response.json();

    const resultado =

      data?.choices?.[0]
      ?.message?.content ||

      'No se pudo generar.';

    res.json({
      resultado
    });
  }

  catch(err){

    console.error(err);

    res.status(500).json({

      error:err.message
    });
  }
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('Public'));

app.get('/', (req, res) => {

  res.sendFile(
    process.cwd() + '/Public/index.html'
  );
});

/* =========================================
   GROQ
========================================= */

app.post('/api/groq', async (req, res) => {

  try {

    const response = await fetch(

      'https://api.groq.com/openai/v1/chat/completions',

      {
        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

          Authorization:
            `Bearer ${process.env.GROQ_API_KEY}`
        },

        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();

    res.json(data);

  }

  catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
});

/* =========================================
   OPENROUTER
========================================= */

app.post('/api/openrouter', async (req, res) => {

  try {

    const response = await fetch(

      'https://openrouter.ai/api/v1/chat/completions',

      {
        method: 'POST',

        headers: {

          'Content-Type': 'application/json',

          Authorization:
            `Bearer ${process.env.OPENROUTER_API_KEY}`,

          'HTTP-Referer':
            'https://quimicaapp-production.up.railway.app',

          'X-Title':
            'QuimLab AI'
        },

        body: JSON.stringify(req.body)
      }
    );

    const data = await response.json();

    res.json(data);

  }

  catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message
    });
  }
});

/* =========================================
   TOGETHER
========================================= */

app.post('/api/together', async (req, res) => {

  try {

    const response = await fetch(

      'https://api.together.xyz/v1/chat/completions',

      {
        method:'POST',

        headers:{

          'Content-Type':'application/json',

          Authorization:
            `Bearer ${process.env.TOGETHER_API_KEY}`
        },

        body:JSON.stringify(req.body)
      }
    );

    const data =
      await response.json();

    res.json(data);
  }

  catch(err){

    console.error(err);

    res.status(500).json({

      error:err.message
    });
  }
});

/* =========================================
   START SERVER
========================================= */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `Servidor corriendo en puerto ${PORT}`
  );
});