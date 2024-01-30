const REQUESTED_MOVIES_AMOUNT = 20

export default async function handler(req, res) {
  const apiKey = process.env.OPENAI_API_KEY

  const body = JSON.parse(req.body)
  const { likedMovies, dislikedMovies } = body

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        stream: false,
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `if someone likes the movies ${likedMovies} and dislikes the movies ${dislikedMovies}, which ${REQUESTED_MOVIES_AMOUNT} movies would you recommend to them?`,
          },
          {
            role: "system",
            content: `
            It is important that you:
            - make sure the age rating of the provided liked movies matches then ones you are recommending
            - do not recommend adult movies if kids movies are in the given liked movies
            - give your response as a javascript array
            
            it is extremely important that you only respond with the array
            `,
          },
        ],
      }),
    })

    const data = await response.json()

    if (data.error) {
      res.status(500).json({ error: data.error })
      return
    }

    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
