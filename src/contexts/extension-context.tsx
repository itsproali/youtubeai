import { createContext, useContext, useState } from "react"

interface IExtensionState {
  extensionContainer: any
  extensionIsOpen: boolean
  extensionTheme: string | null
  extensionLoading: boolean
  extensionPanel: string
  extensionVideoId: string
  extensionData: any
}

interface IExtensionAction {
  setExtensionContainer: (container: any) => void
  setExtensionIsOpen: (isOpen: boolean) => void
  setExtensionTheme: (theme: string | null) => void
  setExtensionLoading: (loading: boolean) => void
  setExtensionPanel: (panel: string) => void
  setExtensionVideoId: (videoId: string) => void
  setExtensionData: (data: any) => void
  resetExtensionState: () => void
}

interface IExtensionContext extends IExtensionState, IExtensionAction {}

interface IExtensionProviderProps {
  children: React.ReactNode
}

const initialState: IExtensionState = {
  extensionContainer: null,
  extensionIsOpen: false,
  extensionTheme: null,
  extensionLoading: false,
  extensionPanel: "Summary",
  extensionVideoId: "",
  extensionData: null
}

export const ExtensionContext = createContext<IExtensionContext | undefined>(
  undefined
)

export function useExtension() {
  const context = useContext(ExtensionContext)

  if (!context) {
    throw new Error("useExtension must be used within an ExtensionProvider")
  }

  return context
}

export function ExtensionProvider({ children }: IExtensionProviderProps) {
  const [extensionContainer, setExtensionContainer] = useState<any>(
    initialState.extensionContainer
  )
  const [extensionIsOpen, setExtensionIsOpen] = useState<boolean>(
    initialState.extensionIsOpen
  )
  const [extensionTheme, setExtensionTheme] = useState<string | null>(
    initialState.extensionTheme
  )
  const [extensionLoading, setExtensionLoading] = useState<boolean>(
    initialState.extensionLoading
  )
  const [extensionPanel, setExtensionPanel] = useState<string>(
    initialState.extensionPanel
  )
  const [extensionVideoId, setExtensionVideoId] = useState<string>(
    initialState.extensionVideoId
  )
  const [extensionData, setExtensionData] = useState<any>(
    initialState.extensionData
  )

  function resetExtensionState() {
    setExtensionContainer(initialState.extensionContainer)
    setExtensionData(initialState.extensionData)
    setExtensionIsOpen(initialState.extensionIsOpen)
    setExtensionLoading(initialState.extensionLoading)
    setExtensionPanel(initialState.extensionPanel)
    setExtensionTheme(initialState.extensionTheme)
    setExtensionVideoId(initialState.extensionVideoId)
  }

  const contextValue: IExtensionContext = {
    extensionContainer,
    extensionData,
    extensionIsOpen,
    extensionLoading,
    extensionPanel,
    extensionTheme,
    extensionVideoId,
    setExtensionContainer,
    setExtensionData,
    setExtensionIsOpen,
    setExtensionLoading,
    setExtensionPanel,
    setExtensionTheme,
    setExtensionVideoId,
    resetExtensionState
  }

  return (
    <ExtensionContext.Provider value={contextValue}>
      {children}
    </ExtensionContext.Provider>
  )
}
