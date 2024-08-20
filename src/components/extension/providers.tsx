import type { FC } from "react"

import { ExtensionProvider } from "~contexts/extension-context"

type TProps = {
  children: React.ReactNode
}

const Providers: FC<TProps> = ({ children }) => {
  return (
    <>
      <ExtensionProvider>{children}</ExtensionProvider>
    </>
  )
}

export default Providers
