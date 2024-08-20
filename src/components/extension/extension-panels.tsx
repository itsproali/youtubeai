import { useExtension } from "~contexts/extension-context"

import Chat from "./chat"
import Summary from "../summary/summary"
import Transcript from "./transcript"

const ExtensionPanels = () => {
  const { extensionPanel, extensionIsOpen } = useExtension()
  return (
    <div>
      {extensionPanel === "summary" ? (
        <Summary />
      ) : extensionPanel === "transcript" ? (
        <Transcript />
      ) : extensionPanel === "chat" ? (
        <Chat />
      ) : null}
    </div>
  )
}

export default ExtensionPanels
