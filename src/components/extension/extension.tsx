import { useEffect } from "react"

import { Collapsible, CollapsibleContent } from "~components/ui/collapsible"
import { useExtension } from "~contexts/extension-context"
import { getVideoData } from "~lib/video"

import ExtensionActions from "./extension-actions"
import ExtensionPanels from "./extension-panels"

const Extension = () => {
  const {
    extensionVideoId,
    extensionTheme,
    extensionData,
    extensionIsOpen,
    extensionLoading,
    setExtensionContainer,
    setExtensionTheme,
    setExtensionVideoId,
    setExtensionLoading,
    setExtensionData,
    setExtensionIsOpen,
    setExtensionPanel
  } = useExtension()

  // ----- setting up theme
  useEffect(() => {
    const rootStyle = getComputedStyle(document.documentElement)
    const backgroundColor = rootStyle
      .getPropertyValue("--yt-spec-base-background")
      .trim()
    setExtensionTheme(backgroundColor === "#fff" ? "light" : "dark")
  }, [])

  // ----- setting up video id
  useEffect(() => {
    const videoId = new URLSearchParams(window.location.search).get("v")
    const fetchVideoData = async () => {
      if (videoId && videoId !== extensionVideoId) {
        setExtensionVideoId(videoId)
        setExtensionLoading(true)
        const data = await getVideoData(videoId)
        setExtensionData(data)
        setExtensionLoading(false)
      }
    }
    fetchVideoData()

    const intervalId = setInterval(fetchVideoData, 10000)

    return () => clearInterval(intervalId)
  }, [extensionVideoId])

  return (
    <main
      ref={setExtensionContainer}
      className={`antialiased w-full mb-3 z-10 ${extensionTheme}`}>
      <div className="w-full">
        <Collapsible
          open={extensionIsOpen}
          onOpenChange={setExtensionIsOpen}
          className="w-full space-y-2">
          <ExtensionActions />
          <CollapsibleContent className="w-full h-fit max-h-[500] border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-auto">
            <ExtensionPanels />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </main>
  )
}

export default Extension
