import Editor from '../components/Editor'
import FormInput from '../components/FormInput'
import ProfileAvatar from '../components/ProfileAvatar'
import { usePersonalInfoStore } from '../store/personal-info-store'

import { Label } from '@/components/ui/label'

const PersonalInfoSection = () => {
  const { info, updateInfo } = usePersonalInfoStore()

  return (
    <>
      <div className="grid grid-cols-12 gap-8">
        <ProfileAvatar 
          showImage={info.showImage} 
          onToggleImage={(checked) => updateInfo('showImage', checked)} 
        />

        <div className="col-span-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="firstName"
              label="First Name"
              placeholder="Enter your first name"
              value={info.firstName}
              onChange={(e) => updateInfo('firstName', e.target.value)}
            />
            <FormInput
              id="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              value={info.lastName}
              onChange={(e) => updateInfo('lastName', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              value={info.phone}
              onChange={(e) => updateInfo('phone', e.target.value)}
            />
            <FormInput
              id="email"
              label="Email Address"
              placeholder="Enter your email"
              type="email"
              value={info.email}
              onChange={(e) => updateInfo('email', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              id="dob"
              label="Date of Birth"
              type="date"
              value={info.dob}
              onChange={(e) => updateInfo('dob', e.target.value)}
            />
            <FormInput
              id="nationality"
              label="Nationality"
              placeholder="Enter your nationality"
              value={info.nationality}
              onChange={(e) => updateInfo('nationality', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Profile</Label>
        <Editor
          value={info.profile}
          onChange={(content) => updateInfo('profile', content)}
        />
      </div>
    </>
  )
}

export default PersonalInfoSection 