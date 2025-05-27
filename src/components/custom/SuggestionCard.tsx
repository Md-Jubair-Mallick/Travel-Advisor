import type { FC } from "react"
import { Card } from "../ui"
import { CardContent } from "../ui/card"
import type {  SuggestionCardProps } from "@/types"


const SuggestionCard: FC<SuggestionCardProps> = ({ filteredSuggestions, form, onSubmit }) => {

      const handleMouseDown = (item: string) => {
          onSubmit({ query: item })
          form.setValue("query", item)
  }
    return (
        <Card className="absolute top-16  max-w-3xl z-50">
            <ul className="">
                {filteredSuggestions?.map((item, idx) => (
                    <CardContent className="">
                        <li
                            key={idx}
                            onMouseDown={handleMouseDown.bind(null, item)}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-neutral-800"
                        >
                            {item}
                        </li>
                    </CardContent>
                ))}
            </ul>

        </Card>

    )
}

export default SuggestionCard
