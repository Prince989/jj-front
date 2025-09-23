// ** Type import
import { BillIcon, ChartIcon, DashboardIcon, GuideIcon, LetterIcon, ProfileIcon, ProtectionIcon, ServicesIcon, WalletIcon } from 'src/@core/components/IconV2'
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from 'src/hooks/useAuth'


const useNavigation = (): VerticalNavItemsType => {
  // Get the authenticated user and role
  // Also should add role in the acl.ts file. src/configs/acl.ts <----. ATTENTION .----->
  const { user } = useAuth()
  const userRole = user?.role?.name

  // Define common menu items that both roles can see
  const commonMenuItems = [
    {
      title: 'داشبورد',

      // icon: 'tabler:smart-home', // String icon example
      icon: <DashboardIcon />,
      path: "/dashboard",
      action: 'read',
      subject: 'dashboard'
    }
  ]

  // Define role-specific menu items
  const userMenuItems = [
    {
      title: 'اطلاعات هویتی',
      icon: <ProfileIcon />,
      badgeColor: 'error',
      path: "/profile",
      action: 'read',
      subject: 'profile'
    },
    {
      sectionTitle: 'اعتبار',
      action: 'read',
      subject: 'credit'
    },
    {
      title: 'اعتبارسنجی',

      // icon: 'tabler:messages', // String icon example
      icon: <ChartIcon />,
      path: '/validation',
      action: 'read',
      subject: 'validation'
    },
    {
      title: "اقساط",

      // icon: "tabler:vip", // String icon example
      icon: <WalletIcon />,
      path: "/installment",
      action: 'read',
      subject: 'installment'
    },
    {
      sectionTitle: 'خدمات',
      action: 'read',
      subject: 'services'
    },
    {
      title: "خدمات",
      icon: <ServicesIcon />,
      path: "/services/dentistry-panel",
      action: 'read',
      subject: 'services'
    },
    {
      sectionTitle: 'سایر',
      action: 'read',
      subject: 'other'
    },
    {
      title: "تراکنش ها",

      // icon: "tabler:file-dollar",
      icon: <BillIcon />,
      path: "/transactions",
      action: 'read',
      subject: 'transactions'
    },
    {
      title: "پیام ها",

      // icon: "tabler:file-dollar",
      icon: <LetterIcon />,
      path: "/messages",
      action: 'read',
      subject: 'messages'
    },
    {
      title: "راهنما و آموزش",

      // icon: "tabler:help-circle",
      icon: <GuideIcon />,
      path: "/help",
      action: 'read',
      subject: 'help'
    },
    {
      title: "قوانین و مقررات",

      // icon: "tabler:lock-square",
      icon: <ProtectionIcon />,
      path: "/privacy",
      action: 'read',
      subject: 'privacy'
    },
  ]

  const userBusinessMenuItems = [
    {
      title: 'پذیرش',
      icon: <ProfileIcon />,
      path: "/admission",
      action: 'read',
      subject: 'admission'
    },
  ]

  const sponserUserMenuItems = [
    {
      title: 'گزارشات',
      icon: <ChartIcon />,
      path: "/sponsor-reports",
      action: 'read',
      subject: 'sponsor-reports'
    },
  ]

  const roshaOpMenuItems = [
    {
      title: 'داشبورد',
      icon: <DashboardIcon />,
      path: "/rosha-dashboard",
      action: 'read',
      subject: 'rosha-dashboard'
    },
  ]

  // Return navigation items based on user role
  console.log("1", userRole)
  console.log("2", userRole === 'roshaOp')
  if (userRole === 'user') {
    return [...commonMenuItems, ...userMenuItems]
  } else if (userRole === 'businessUser') {
    return [...commonMenuItems, ...userBusinessMenuItems]
  } else if (userRole === 'sponserUser') {
    return [...commonMenuItems, ...sponserUserMenuItems]
  } else if (userRole === 'roshaOp') {
    return [...roshaOpMenuItems]
  }

  // Return common items as fallback
  return commonMenuItems
}

export default useNavigation
