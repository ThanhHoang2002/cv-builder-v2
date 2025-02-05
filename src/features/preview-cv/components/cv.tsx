import { Input } from '@/components/ui/input'
import { useFontStore } from '@/stores/font'

type CvProps = {
  range: number
}

const Cv = ({ range }: CvProps) => {
  const {selectedFont} = useFontStore()
  return (
    <div
      className='flex h-fit flex-col gap-2'
      style={{
        transform: `scale(${range})`,
        transformOrigin: 'top left',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
        fontFamily: selectedFont?.name
      }}
    >
      {/* cv page */}
      <div className='h-[1225.68px] w-[866.5px] bg-slate-500 p-2'>
        <div className='h-full w-full bg-red-400'>
          <div className='text-white'>Some content here</div>
          <div className='text-white'>More content</div>
          <Input />
        </div>
      </div>
      <div className='h-[1225.68px] w-[866.5px] bg-slate-500 p-2 '>
        <div className='h-full w-full bg-red-400'>
          <div className='text-white'>Some content here</div>
          <div className='text-white'>More content</div>
          <Input />
        </div>
      </div>
    </div>
  )
}

export default Cv
