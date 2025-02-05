import _ from 'lodash'
import { ZoomIn } from 'lucide-react'
import { useState, useCallback } from 'react'

import { Slider } from '@/components/ui/slider'
import { useZoomRangeStore } from '@/stores/zoomRangeSlider'

const Cv_interact = () => {
  const { range, updateRange } = useZoomRangeStore()
  const [showSlider, setShowSlider] = useState<boolean>(false)

  const debouncedSliderChange = useCallback(
    _.debounce((r: number) => {
      updateRange(r)
    }, 300),
    []
  )

  const handleSliderChange = (value: number[]) => {
    debouncedSliderChange(value[0])
  }

  return (
    <div
      className='absolute bottom-4 left-3 flex flex-row items-center justify-center gap-2 rounded-full bg-slate-100 px-2 py-3'
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <div className='relative left-1 h-fit w-fit rounded-md'>
        <ZoomIn />
      </div>
      <div
        className={`transition-all duration-500 ${showSlider ? 'max-w-[200px] scale-100 opacity-100' : 'max-w-0 scale-95 opacity-0'}`}
        style={{ overflow: 'hidden' }}
      >
        <Slider
          className='mr-3 w-[100px]'
          defaultValue={[range]}
          max={3}
          min={1}
          step={0.2}
          onValueChange={handleSliderChange}
        />
      </div>
    </div>
  )
}

export default Cv_interact
