import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/utils/cn'

interface FormInputProps {
  id: string
  label: string
  placeholder?: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({ id, label, placeholder, type = 'text', value, onChange }: FormInputProps) => {
  const [date, setDate] = useState<Date>()

  if (type === 'date') {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input 
        id={id} 
        placeholder={placeholder} 
        type={type}
        value={value}
        onChange={onChange}
        className={cn(
          'w-full',
          type === 'date' && 'cursor-pointer'
        )}
      />
    </div>
  )
}

export default FormInput 