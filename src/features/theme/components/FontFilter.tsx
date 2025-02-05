import { Check, SlidersHorizontal } from 'lucide-react'

import { LANGUAGES } from '../constants/fonts'
import { FontFilterProps } from '../types'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/utils/cn'

export const FontFilter = ({ onLanguageSelect, openFilter, setOpenFilter, activeLanguage }: FontFilterProps) => (
  <Popover open={openFilter} onOpenChange={setOpenFilter}>
    <PopoverTrigger asChild>
      <Button 
        variant="ghost" 
        className={cn(
          'h-8 w-8 p-0 hover:bg-transparent',
          activeLanguage && 'border-primary text-primary'
        )}
      >
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="p-3" side='bottom' align='end'>
      <div className="space-y-2">
        <h4 className="text-sm font-medium leading-none">Ngôn ngữ</h4>
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              <CommandItem 
                key='all' 
                value='' 
                className='cursor-pointer'
                onSelect={(value) => {
                  setOpenFilter(false)
                  onLanguageSelect(value)
                }}
              >
                All
              </CommandItem>
              {LANGUAGES.map((language) => (
                <CommandItem
                  key={language}
                  value={language}
                  className='cursor-pointer'
                  onSelect={(value) => {
                    setOpenFilter(false)
                    onLanguageSelect(value)
                  }}
                >
                  {language}
                  {activeLanguage === language && (
                    <Check className="ml-2 h-4 w-4" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </PopoverContent>
  </Popover>
) 