import { useState } from "react"

export const useCopyToClipboard = ({ timeout = 2000 }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      return
    }

    if (!value || value.length === 0) {
      return
    }

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, timeout)
    })
  }

  return {
    copyToClipboard,
    isCopied
  }
}
