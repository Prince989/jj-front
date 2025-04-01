// ** Type Import
import { IconProps } from '@iconify/react'
import { ReactNode } from 'react'

// ** Custom Icon Import
import Icon from 'src/@core/components/icon'

interface UserIconProps extends Omit<IconProps, 'icon'> {
  icon: string | ReactNode
}

const UserIcon = ({ icon, ...rest }: UserIconProps) => {
  if (typeof icon === 'string') {
    return <Icon icon={icon} {...rest} />
  }

  return <>{icon}</>
}

export default UserIcon
