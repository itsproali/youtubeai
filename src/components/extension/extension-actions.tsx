import {
  ActivityLogIcon,
  CardStackPlusIcon,
  CaretSortIcon,
  ChatBubbleIcon,
  CheckIcon,
  Link2Icon,
  Pencil2Icon
} from "@radix-ui/react-icons"

import { Button } from "~components/ui/button"
import { CollapsibleTrigger } from "~components/ui/collapsible"
import TooltipWrapper from "~components/ui/tooltip-wrapper"
import { useExtension } from "~contexts/extension-context"
import { useCopyToClipboard } from "~lib/hooks/user-copy"

const ExtensionActions = () => {
  const {
    extensionIsOpen,
    extensionPanel,
    setExtensionIsOpen,
    setExtensionPanel
  } = useExtension()

  const handleClick = (panel: string) => {
    setExtensionPanel(panel)
    setExtensionIsOpen(panel === extensionPanel ? !extensionIsOpen : true)
  }

  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 2000 })

  const handleCopy = () => {
    if (isCopied) return

    copyToClipboard(window.location.href)
  }

  return (
    <div className="border border-zinc-200 rounded-lg flex items-center justify-between py-2.5 px-3 dark:bg[#f0f0f0] dark:text-white dark:border-zinc-800">
      <CardStackPlusIcon className="h-6 w-6 opacity-50 ml-2" />
      <div className="flex items-center justify-center space-x-2">
        <div className="flex -space-x-px">
          <Button
            variant="outline"
            className="rounded-r-none focus:z-10 bg-transparent space-x-2 items-center"
            onClick={() => handleClick("summary")}>
            <Pencil2Icon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Summary</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-r-none focus:z-10 bg-transparent space-x-2 items-center"
            onClick={() => handleClick("transcript")}>
            <ActivityLogIcon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Transcript</span>
          </Button>
          <Button
            variant="outline"
            className="rounded-r-none focus:z-10 bg-transparent space-x-2 items-center"
            onClick={() => handleClick("chat")}>
            <ChatBubbleIcon className="h-4 w-4 opacity-60" />
            <span className="opacity-90">Chat</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <TooltipWrapper text="Copy Video URL">
          <Button variant="outline" size="icon" onClick={handleCopy}>
            {isCopied ? (
              <CheckIcon className="h-4.5 w-4.5 opacity-60" />
            ) : (
              <Link2Icon className="h-4.5 w-4.5 opacity-60" />
            )}
          </Button>
        </TooltipWrapper>

        <CollapsibleTrigger asChild>
          <Button variant="outline" size="icon">
            <CaretSortIcon className="h-4.5 w-4.5 opacity-60" />
          </Button>
        </CollapsibleTrigger>
      </div>
    </div>
  )
}

export default ExtensionActions
