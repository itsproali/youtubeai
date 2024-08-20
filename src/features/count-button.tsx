import { useReducer } from "react"

import { Button } from "~components/ui/button"

export const CountButton = () => {
  const [count, increase] = useReducer((c) => c + 1, 0)

  return (
    <Button onClick={() => increase()} type="button">
      Count:
      <span className="inline-flex items-center justify-center w-8 h-4 ml-2 text-xs font-semibold rounded-full">
        {count}
      </span>
    </Button>
  )
}
