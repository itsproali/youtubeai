import type { FC } from "react"

import { ExtensionProvider } from "~contexts/extension-context"
import { SummaryProvider } from "~contexts/summary-context"

type TProps = {
  children: React.ReactNode
}

const Providers: FC<TProps> = ({ children }) => {
  return (
    <>
      <ExtensionProvider>
        <SummaryProvider>{children}</SummaryProvider>
      </ExtensionProvider>
    </>
  )
}

export default Providers
