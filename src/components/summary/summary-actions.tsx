import { CheckIcon, ClipboardCopyIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "~components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "~components/ui/select"
import TooltipWrapper from "~components/ui/tooltip-wrapper"
import { useSummary } from "~contexts/summary-context"
import { models, prompts } from "~lib/constants"
import { useCopyToClipboard } from "~lib/hooks/user-copy"

const SummaryActions = () => {
  const {
    generateSummary,
    summaryContent,
    summaryIsGenerating,
    summaryModel,
    summaryPrompt,
    setSummaryPrompt,
    setSummaryModel
  } = useSummary()

  const { copyToClipboard, isCopied } = useCopyToClipboard({ timeout: 2000 })

  const handleCopy = () => {
    if (isCopied || !summaryContent || summaryIsGenerating) return
    copyToClipboard(summaryContent)
  }

  return (
    <div className="flex w-full items-center justify-between sticky top-0 z-50 bg-background text-foreground pt-3.5 pb-2 px-3">
      <Select
        value={summaryModel.value}
        onValueChange={(value) =>
          setSummaryModel(models.find((model) => model.value === value))
        }>
        <SelectTrigger className="w-fit space-x-3">
          <SelectValue placeholder="Model" />
        </SelectTrigger>

        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model.value} value={model.value}>
              <div className="flex items-center">
                <div className="mr-2">{model.icon}</div>
                {model.label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex flex-row items-center space-x-2">
        <TooltipWrapper text="Regenerate Summary">
          <Button
            variant="outline"
            size="icon"
            onClick={generateSummary}
            disabled={summaryIsGenerating}>
            <ReloadIcon className="h-4 w-4 opacity-60" />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper text="Copy Summary">
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={summaryIsGenerating}>
            {isCopied ? (
              <CheckIcon className="size-4.5 opacity-60" />
            ) : (
              <ClipboardCopyIcon className="size-4.5 opacity-60" />
            )}
          </Button>
        </TooltipWrapper>

        <Select
          value={summaryPrompt.value}
          onValueChange={(value) =>
            setSummaryPrompt(prompts.find((prompt) => prompt.value === value))
          }>
          <SelectTrigger className="w-fit space-x-3">
            <SelectValue placeholder="Prompt" />
          </SelectTrigger>

          <SelectContent>
            {prompts.map((prompt) => (
              <SelectItem key={prompt.value} value={prompt.value}>
                {prompt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default SummaryActions
