import { createContext, useContext, useEffect, useState } from "react"

import { usePort } from "@plasmohq/messaging/hook"

import type { IModel, IPrompt } from "~interface/common.interface"
import { models, prompts } from "~lib/constants"

import { useExtension } from "./extension-context"

export interface ISummaryContext {
  summaryModel: IModel
  setSummaryModel: (model: IModel) => void
  summaryPrompt: IPrompt
  setSummaryPrompt: (prompt: IPrompt) => void
  summaryContent: string | null
  setSummaryContent: (content: string | null) => void
  summaryIsError: boolean
  setSummaryIsError: (isError: boolean) => void
  summaryIsGenerating: boolean
  setSummaryIsGenerating: (isGenerating: boolean) => void
  generateSummary: (e: any) => void
}

export const SummaryContext = createContext<ISummaryContext | undefined>(
  undefined
)

export const useSummary = () => {
  const context = useContext(SummaryContext)

  if (!context) {
    throw new Error("useSummary must be used within an SummaryProvider")
  }

  return context
}

export const SummaryProvider = ({ children }) => {
  const [summaryModel, setSummaryModel] = useState<IModel>(models[0])
  const [summaryPrompt, setSummaryPrompt] = useState<IPrompt>(prompts[0])
  const [summaryContent, setSummaryContent] = useState<string | null>(null)
  const [summaryIsError, setSummaryIsError] = useState<boolean>(false)
  const [summaryIsGenerating, setSummaryIsGenerating] = useState<boolean>(false)

  const port = usePort("completion")
  const { extensionData, extensionLoading } = useExtension()

  const generateSummary = async (e: any) => {
    e.preventDefault()

    if (summaryContent !== null) {
      setSummaryContent(null)
    }

    setSummaryIsGenerating(true)
    setSummaryIsError(false)

    port.send({
      model: summaryModel.content,
      prompt: summaryPrompt.content,
      context: extensionData
    })
  }

  useEffect(() => {
    setSummaryContent(null)
    setSummaryIsGenerating(false)
    setSummaryIsError(false)
  }, [extensionLoading])

  useEffect(() => {
    if (port.data?.message !== undefined && port.data?.isEnd === false) {
      setSummaryContent(port.data?.message)
    } else {
      setSummaryIsGenerating(false)
    }

    setSummaryIsError(false)
  }, [port?.data?.message])

  useEffect(() => {
    if (port?.data?.error !== undefined && port?.data?.error !== null) {
      setSummaryIsError(true)
      setSummaryContent(null)
    } else {
      setSummaryIsError(false)
    }
  }, [port?.data?.error])

  const value = {
    summaryModel,
    setSummaryModel,
    summaryPrompt,
    setSummaryPrompt,
    summaryContent,
    setSummaryContent,
    summaryIsError,
    setSummaryIsError,
    summaryIsGenerating,
    setSummaryIsGenerating,
    generateSummary
  }

  return (
    <SummaryContext.Provider value={value}>{children}</SummaryContext.Provider>
  )
}
