import { ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { FontFilter } from './FontFilter'
import { FontList } from './FontList'
import { FONTS } from '../constants/fonts'

import { Button } from '@/components/ui/button'
import { Command, CommandInput } from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useFontStore } from '@/stores/font'


const SelectFont = () => {
  const [open, setOpen] = useState(false)
  const { selectedFont  } = useFontStore()
  const [openFilter, setOpenFilter] = useState(false)
  const [language, setLanguage] = useState<string>('')

  const handleLanguageSelect = (value: string) => {
    setLanguage(value)
  }
  return (
    <div className="flex w-full flex-col gap-2">
      <Label>Font Family</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className="flex items-center gap-2">
              {selectedFont?.name}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <div className="flex items-center justify-between border-b-2">
              <CommandInput className='border-0' placeholder="Search font..."/>
              <FontFilter 
                onLanguageSelect={handleLanguageSelect}
                openFilter={openFilter}
                setOpenFilter={setOpenFilter}
                activeLanguage={language}
              />
            </div>
            <FontList
              fonts={FONTS}
              setOpen={setOpen}
              language={language}
              setLanguage={setLanguage}
            />
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default SelectFont