import { error } from "console"
import { OpenAI } from "openai"

import type { PlasmoMessaging } from "@plasmohq/messaging"

import { openai_api_key } from "~lib/constants"

const llm = new OpenAI({
  apiKey: openai_api_key
})

const createCompletion = async (
  model: string,
  prompt: string,
  context: any
) => {
  const parsed = context?.transcript?.events
    ?.filter((x: { segs: any }) => x.segs)
    .map((x: { segs: any[] }) =>
      x.segs.map((y: { utf8: any }) => y.utf8).join("")
    )
    .join(" ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/\s+/g, " ")

  const user_content = `${prompt}\n\nVideo Title: ${context?.metadata?.title}\nVideo Transcript: ${parsed}`

  return llm.beta.chat.completions.stream({
    messages: [{ role: "user", content: user_content }],
    model: model || "gpt-3.5-turbo",
    stream: true
  })
}

const handler: PlasmoMessaging.PortHandler = async (req, res) => {
  let cumulativeData = ""

  const prompt = req?.body?.prompt
  const model = req?.body?.model
  const context = req?.body?.context

  try {
    const completion = await createCompletion(model, prompt, context)
    completion.on("content", (delta, snapshot) => {
      cumulativeData += delta
      res.send({ message: cumulativeData, error: "", isEnd: false })
    })

    completion.on("end", () => {
      res.send({ message: "END", error: "", isEnd: true })
    })
  } catch (error) {
    res.send({ error: "Something went wrong" })
  }
}

export default handler
