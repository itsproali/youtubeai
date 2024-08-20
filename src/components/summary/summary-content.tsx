import Markdown from "~components/shared/markdown"
import { Button } from "~components/ui/button"
import { useSummary } from "~contexts/summary-context"

import SummarySkeleton from "./summary-skeleton"

const SummaryContent = () => {
  const {
    generateSummary,
    summaryContent,
    summaryIsError,
    summaryIsGenerating,
    summaryModel,
    summaryPrompt,
    setSummaryContent,
    setSummaryPrompt,
    setSummaryModel
  } = useSummary()

  if (!summaryContent && summaryIsGenerating) {
    return (
      <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
        <SummarySkeleton />
      </div>
    )
  }

  if (!summaryContent && !summaryIsGenerating) {
    return (
      <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
        <Button
          onClick={generateSummary}
          variant="outline"
          className="w-full h-12">
          <span className="text-sm">Generate Summary</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center w-full p-3 bg-white dark:bg-[#0f0f0f]">
      <div className="h-[600px] w-full px-3 opacity-80">
        <Markdown markdown={summaryContent} className="pb-6" />
      </div>
    </div>
  )
}

export default SummaryContent
