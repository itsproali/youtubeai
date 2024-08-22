import { createContext, useContext, useMemo, useState } from "react"

import type { ITranscript } from "~interface/common.interface"
import { cleanJSONTranscript } from "~lib/video"

import { useExtension } from "./extension-context"

interface ITranscriptContext {
  transcriptSearch: string
  setTranscriptSearch: (search: string) => void
  transcriptJSON: ITranscript[]
}

const TranscriptContext = createContext<ITranscriptContext | undefined>(
  undefined
)

export const useTranscript = () => {
  const context = useContext(TranscriptContext)

  if (!context) {
    throw new Error("useTranscript must be used within an TranscriptProvider")
  }
  return context
}

export const TranscriptProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [transcriptSearch, setTranscriptSearch] = useState<string>("")
  const { extensionData, extensionLoading } = useExtension()

  const transcriptJSON = useMemo(() => {
    if (!extensionLoading && extensionData && extensionData.transcript) {
      return cleanJSONTranscript(extensionData?.transcript)
    }
    return []
  }, [extensionData, extensionLoading])

  const value = { transcriptSearch, setTranscriptSearch, transcriptJSON }

  return (
    <TranscriptContext.Provider value={value}>
      {children}
    </TranscriptContext.Provider>
  )
} 
