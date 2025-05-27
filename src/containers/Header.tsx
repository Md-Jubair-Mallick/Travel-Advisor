import { SearchBar } from '@/components/custom'
import { Button } from '@/components/ui'
import clsx from 'clsx'
import { Search } from 'lucide-react'
import React, { type FC } from 'react'

type SearchBarProps = {
  setCoordinates: (coords: { lat: number, lng: number }) => void;
}
const Header:FC<SearchBarProps> = ({setCoordinates}) => {
    const [ isOpen , setIsOpen ] = React.useState<boolean>(false);
  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white mx-auto relative z-10">

      <h1 className="text-2xl font-bold">Travel Advisor</h1>
      
      <SearchBar
      className={clsx({'max-md:hidden' : !isOpen}, )}
      setIsOpen={setIsOpen}
      setCoordinates={setCoordinates}
      />

      <Button type="button" size="icon" variant="ghost" className={clsx({'hidden': isOpen}, 'md:hidden')} onClick={() => setIsOpen(!isOpen)}>
        <Search />
      </Button>
    </header>
  )
}

export default Header
