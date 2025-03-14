/* eslint-disable @typescript-eslint/no-unused-vars */
// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'
import NotificationDropdown, {
  NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import ShortcutsDropdown, { ShortcutsType } from 'src/@core/layouts/components/shared-components/ShortcutsDropdown'

// ** Hook Import
import { useAuth } from 'src/hooks/useAuth'
import { Button, Typography } from '@mui/material'
import { useMemo } from 'react'
import { color } from '@mui/system'
import Link from 'next/link'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const notifications: NotificationsType[] = [
  {
    meta: 'Today',
    avatarAlt: 'Flora',
    title: 'Congratulation Flora! 🎉',
    avatarImg: '/images/avatars/4.png',
    subtitle: 'Won the monthly best seller badge'
  },
  {
    meta: 'Yesterday',
    avatarColor: 'primary',
    subtitle: '5 hours ago',
    avatarText: 'Robert Austin',
    title: 'New user registered.'
  },
  {
    meta: '11 Aug',
    avatarAlt: 'message',
    title: 'New message received 👋🏻',
    avatarImg: '/images/avatars/5.png',
    subtitle: 'You have 10 unread messages'
  },
  {
    meta: '25 May',
    title: 'Paypal',
    avatarAlt: 'paypal',
    subtitle: 'Received Payment',
    avatarImg: '/images/misc/paypal.png'
  },
  {
    meta: '19 Mar',
    avatarAlt: 'order',
    title: 'Received Order 📦',
    avatarImg: '/images/avatars/3.png',
    subtitle: 'New order received from John'
  },
  {
    meta: '27 Dec',
    avatarAlt: 'chart',
    subtitle: '25 hrs ago',
    avatarImg: '/images/misc/chart.png',
    title: 'Finance report has been generated'
  }
]

const shortcuts: ShortcutsType[] = [
  {
    title: 'Calendar',
    url: '/apps/calendar',
    icon: 'tabler:calendar',
    subtitle: 'Appointments'
  },
  {
    title: 'Invoice App',
    url: '/apps/invoice/list',
    icon: 'tabler:file-invoice',
    subtitle: 'Manage Accounts'
  },
  {
    title: 'User App',
    icon: 'tabler:users',
    url: '/apps/user/list',
    subtitle: 'Manage Users'
  },
  {
    url: '/apps/roles',
    icon: 'tabler:lock',
    subtitle: 'Permissions',
    title: 'Role Management'
  },
  {
    subtitle: 'CRM',
    title: 'Dashboard',
    url: '/dashboards/crm',
    icon: 'tabler:device-analytics'
  },
  {
    title: 'Settings',
    icon: 'tabler:settings',
    subtitle: 'Account Settings',
    url: '/pages/account-settings/account'
  },
  {
    icon: 'tabler:help',
    title: 'Help Center',
    url: '/pages/help-center',
    subtitle: 'FAQs & Articles'
  },
  {
    title: 'Dialogs',
    icon: 'tabler:square',
    subtitle: 'Useful Popups',
    url: '/pages/dialog-examples'
  }
]

const plans = [
  {
    title: "اشتراک رایگان 3 روزه",
    color: "white"
  },
  {
    title: "اتمام اشتراک",
    color: "white"
  },
  {
    title: "اشتراک برنزی",
    color: "#CD7F32",
  },
  {
    title: "اشتراک نقره ای",
    color: "#C0C0C0",
  },
  {
    title: "اشتراک طلایی",
    color: "#d4af37"
  },
]

const AppBarContent = (props: Props) => {
  // ** Props

  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const auth = useAuth()

  const compareDate = (date: string) => {
    const now = new Date()
    const planDate = new Date(date);

    if (now.getTime() > planDate.getTime())
      return 0
    else
      return 1
  }

  const plan = useMemo(() => {
    console.log(auth.user?.expirePlan == null, "this is expire");
    if (auth.user?.expirePlan == null)
      return plans[0]
    if (!compareDate(auth.user.expirePlan))
      return plans[1]

    return plans.find(p => p.title.includes(auth.user?.activePlan?.text ?? "")) ?? plans[1];
  }, [auth.user])

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {
        hidden && !settings.navHidden ?
          <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
              <Icon fontSize='1.5rem' icon='tabler:menu-2' />
            </IconButton>
            {/* {auth.user && <Autocomplete hidden={hidden} settings={settings} />} */}
          </Box>
          : <></>
      }
      <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <Typography noWrap variant='h6' sx={{ fontWeight: "700" }}>
          اشتراک من:
        </Typography>
        <Typography noWrap variant='h6' sx={{ fontWeight: "400" }}>
          {plan.title}
        </Typography>
        {
          plan.title.includes("رایگان") || plan.title.includes("اتمام اشتراک") ?
            <Link href={'/plans'}>
              <Button variant='contained' size='small' color='primary'>
                خرید اشتراک
              </Button>
            </Link>
            :
            <></>
        }
        <Icon icon={"tabler:diamond"} color={plan.color} />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        {auth.user && (
          <>
            {/* <ShortcutsDropdown settings={settings} shortcuts={shortcuts} /> */}
            {/* <NotificationDropdown settings={settings} notifications={notifications} /> */}
            <UserDropdown settings={settings} />
          </>
        )}
      </Box>
    </Box>
  )
}

export default AppBarContent
