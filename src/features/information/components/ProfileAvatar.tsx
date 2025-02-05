import { usePersonalInfoStore } from '../store/personal-info-store'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface ProfileAvatarProps {
  showImage: boolean
  onToggleImage: (checked: boolean) => void
}

const ProfileAvatar = ({ showImage, onToggleImage }: ProfileAvatarProps) => {
  const { info } = usePersonalInfoStore()
  const defaultImage = '/images/default-avatar.png'

  return (
    <div className="col-span-4 flex flex-col items-center space-y-4">
      <Avatar className="h-48 w-48">
        <AvatarImage src={showImage ? info.avatarUrl : defaultImage} alt="Profile picture" />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="showPicture"
          checked={showImage}
          onCheckedChange={(checked) => onToggleImage(checked as boolean)}
        />
        <Label htmlFor="showPicture">Show picture</Label>
      </div>
    </div>
  )
}

export default ProfileAvatar 