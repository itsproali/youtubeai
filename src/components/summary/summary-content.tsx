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
    return <SummarySkeleton />
  }

  if (!summaryContent && !summaryIsGenerating) {
    return (
      <div className="min-h-96">
        <Button onClick={generateSummary}>
          <span>Generate Summary</span>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div>{summaryContent}</div>
    </div>
  )
}

export default SummaryContent
