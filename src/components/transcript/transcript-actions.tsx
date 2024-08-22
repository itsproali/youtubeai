import type { FC } from "react"

type IProps = {
  jumpCurrentTime: () => void
}

const TranscriptActions: FC<IProps> = ({jumpCurrentTime}) => {
  return <div>transcript-actions</div>
}

export default TranscriptActions
