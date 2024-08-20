import { cn, convertToHtml } from "~lib/utils"

type IProps = {
  markdown: string
  className?: string
}

const Markdown = ({ markdown, className }: IProps) => {
  const htmlContent = convertToHtml(markdown)

  return (
    <div
      className={cn("prose dark:prose-dark", className)}
      dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
  )
}

export default Markdown
