import ListTemplate from '@/features/theme/components/ListTemplate'
import SelectFont from '@/features/theme/components/SelectFont'

const Theme = () => {
  return (
    <div className='flex flex-col gap-4'>
      <ListTemplate/>
      <div className='grid grid-cols-2 px-2'> <SelectFont/></div>
    </div>
  )
}

export default Theme