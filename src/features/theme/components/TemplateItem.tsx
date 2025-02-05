import { TemplateItemProps } from '../types'

import Image from '@/components/ui/image'

export const TemplateItem = ({ template, onClick, width = 120 }: TemplateItemProps) => {
  return (
    <div 
      className='relative flex cursor-pointer flex-col overflow-hidden rounded-md shadow-lg'
      onClick={() => onClick(template)}
    >
      <Image  
        width={width} 
        src={template.smallWebpThumbnailUrl} 
        className='flex-1 transform rounded-t-md object-contain transition-all duration-300 hover:scale-110'
      />            
      {width > 120 && (
        <div className='bottom-1 right-1 w-full rounded-b-md border-t bg-gray-100 p-1 text-sm capitalize'>
          {template.name}
        </div>
      )}
    </div>
  )
} 