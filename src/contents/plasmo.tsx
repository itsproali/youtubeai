import cssText from "data-text:~style.css"
import type {
  PlasmoCSConfig,
  PlasmoGetInlineAnchor,
  PlasmoGetShadowHostId
} from "plasmo"

import Extension from "~components/extension/extension"
import Providers from "~components/extension/providers"

const targeted_element_id = "#secondary.style-scope.ytd-watch-flexy"

export const config: PlasmoCSConfig = {
  matches: ["https://www.youtube.com/watch?v=*"]
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector(targeted_element_id),
  insertPosition: "afterbegin"
})

export const getShadowHostId: PlasmoGetShadowHostId = () => "plasmo-inline"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

// skip button functionality
const skipButtonSelector = ".ytp-skip-ad-button"

// Function to auto-click the button
const clickSkipButton = () => {
  const button = document.querySelector(
    skipButtonSelector
  ) as HTMLElement | null
  if (button) {
    button.click()
  }
}

// Use MutationObserver to track DOM changes and detect the button
const observer = new MutationObserver(() => {
  clickSkipButton()
})

// Start observing the body element for changes
observer.observe(document.body, { childList: true, subtree: true })
clickSkipButton()

const PlasmoMainUI = () => {
  return (
    <Providers>
      <Extension />
    </Providers>
  )
}

export default PlasmoMainUI
