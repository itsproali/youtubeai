import type { FC } from "react"

import { ExtensionProvider } from "~contexts/extension-context"
import { SummaryProvider } from "~contexts/summary-context"
import { TranscriptProvider } from "~contexts/transcript-context"

type TProps = {
  children: React.ReactNode
}

const Providers: FC<TProps> = ({ children }) => {
  return (
    <>
      <ExtensionProvider>
        <SummaryProvider>
          <TranscriptProvider>{children}</TranscriptProvider>
        </SummaryProvider>
      </ExtensionProvider>
    </>
  )
}

export default Providers
