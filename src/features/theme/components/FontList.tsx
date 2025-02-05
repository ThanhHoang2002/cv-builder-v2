import { Check, X } from 'lucide-react'

import { FontListProps } from '../types'

import { Badge } from '@/components/ui/badge'
import { CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { useFontStore } from '@/stores/font'
import { cn } from '@/utils/cn'

export const FontList = ({ fonts, setOpen, language, setLanguage }: FontListProps) => {
  const { selectedFont, updateSelectedFont } = useFontStore()
  const filteredFonts = fonts.filter(font => 
    language !== '' ? font.languages.includes(language) : true
  )

  return (
    <>
      <div className="px-3 py-2 text-sm text-muted-foreground">
        {language ? (
          <div className="flex items-center gap-2">
            <span>Showing {filteredFonts.length} fonts supporting</span>
            <Badge variant="secondary" className="font-normal">
              {language}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => setLanguage('')}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          </div>
        ) : (
          <span>Showing all {filteredFonts.length} fonts</span>
        )}
      </div>
      <CommandList>
        <CommandEmpty>No font found.</CommandEmpty>
        <CommandGroup>
          {filteredFonts.map((font) => (
            <CommandItem
              key={font.name}
              value={font.name}
              onSelect={() => {
                updateSelectedFont(font)
                setOpen(false)
              }}
              className='flex cursor-pointer items-center justify-between'
            >
              <div className="flex flex-col">
                <span>{font.name}</span>
                <span className="text-xs text-muted-foreground">
                  {font.languages.length} languages supported
                </span>
              </div>
              <Check
                className={cn(
                  'h-4 w-4',
                  selectedFont?.name === font.name ? 'opacity-100' : 'opacity-0'
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </>
  )
} 