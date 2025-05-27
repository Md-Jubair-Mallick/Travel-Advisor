import { type FC, useMemo, useState } from "react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { AlertCircle, Search, X } from "lucide-react"
import { useSearch } from "@/hooks"
// import type { z } from "zod"
// import SuggestionCard from "./SuggestionCard"
import type { SearchInput } from "@/types"
import SuggestionCard from "./SuggestionCard"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import clsx from "clsx"
import { PlaceDetails } from "@/api"


const suggestions = [
  "New York", "London", "Paris", "Tokyo", "Dubai",
  "San Francisco", "Singapore", "Rome", "Bangkok"
]

type SearchBarProps = {
  className?: string,
  setIsOpen: (isOpen: boolean) => void,
  setCoordinates: (coords: { lat: number, lng: number }) => void
}

const SearchBar: FC<SearchBarProps> = ({ className, setIsOpen, setCoordinates }) => {
  const form = useSearch()
  const inputValue = form.watch("query")
  const [focused, setFocused] = useState<boolean>(false)


  const filteredSuggestions = useMemo(() => {
    return suggestions.filter(item =>
      item.toLowerCase().includes(inputValue?.toLowerCase())
    )
  }, [inputValue])

  const onSubmit = async (data: SearchInput) => {
    try {
      const result = await PlaceDetails({ type: 'auto-complete', query: data.query });
      if (!result) {
        console.warn("No data returned");
        return;
      }
      const response = result?.data?.Typeahead_autocomplete?.results[0]?.detailsV2?.geocode;
      setCoordinates({
        lat: response?.latitude || 0,
        lng: response?.longitude || 0,
      });

    } catch (error) {
      console.error("Failed to fetch:", error);
    }
    setIsOpen(false);
  };


  return (
    <Form {...form} >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={clsx("flex gap-4 items-center justify-end w-full max-w-2xl", className)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem >
              <div className={clsx("flex items-center gap-2 rounded-full border px-4 py-1 ")}>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Search places..."
                    className="border-none focus-visible:ring-0"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 100)}
                  />
                </FormControl>

                {/* Clear button and search button */}
                {inputValue && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => form.reset({ query: "" })}
                  >
                    <X />
                  </Button>
                )}

                {/* Search button and submit */}
                <Button type="submit" size="icon" variant="ghost">
                  <Search />
                </Button>
              </div>

              {/* Show error using ui Alert */}
              {form.formState.errors.query?.message && (
                <Alert variant="destructive" className="mt-2 absolute top-20 w-auto">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    <FormMessage />
                  </AlertDescription>
                </Alert>
              )}

              {/* Show search suggestion using custom SuggestionCard component */}
              {focused && inputValue && filteredSuggestions?.length > 0 && (
                <SuggestionCard
                  filteredSuggestions={filteredSuggestions}
                  form={form}
                  onSubmit={onSubmit}
                />
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default SearchBar
