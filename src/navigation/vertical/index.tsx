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
      path: "/dashboard"
    }
  ]

  // Define role-specific menu items
  const userMenuItems = [
    {
      title: 'اطلاعات هویتی',
      icon: <ProfileIcon />,
      badgeColor: 'error',
      path: "/profile"
    },
    {
      sectionTitle: 'اعتبار'
    },
    {
      title: 'اعتبارسنجی',

      // icon: 'tabler:messages', // String icon example
      icon: <ChartIcon />,
      path: '/validation'
    },
    {
      title: "اقساط",

      // icon: "tabler:vip", // String icon example
      icon: <WalletIcon />,
      path: "/installment"
    },
    {
      sectionTitle: 'خدمات'
    },
    {
      title: "خدمات",
      icon: <ServicesIcon />,
      path: "/services/dentistry-panel"
    },
    {
      sectionTitle: 'سایر'
    },
    {
      title: "تراکنش ها",

      // icon: "tabler:file-dollar",
      icon: <BillIcon />,
      path: "/transactions"
    },
    {
      title: "پیام ها",

      // icon: "tabler:file-dollar",
      icon: <LetterIcon />,
      path: "/messages"
    },
    {
      title: "راهنما و آموزش",

      // icon: "tabler:help-circle",
      icon: <GuideIcon />,
      path: "/help"
    },
    {
      title: "قوانین و مقررات",

      // icon: "tabler:lock-square",
      icon: <ProtectionIcon />,
      path: "/privacy"
    },
  ]

  const userBusinessMenuItems = [
    {
      title: 'پذیرش',
      icon: <ProfileIcon />,
      path: "/admission"
    },
  ]

  const sponserUserMenuItems = [
    {
      title: 'گزارشات',
      icon: <ChartIcon />,
      path: "/sponsor-reports"
    },
  ]

  const roshaOpMenuItems = [
    {
      title: 'داشبورد روشا',
      icon: <ChartIcon />,
      path: "/rosha-dashboard"
    },
  ]

  // Return navigation items based on user role
  if (userRole === 'user') {
    return [...commonMenuItems, ...userMenuItems]
  } else if (userRole === 'businessUser') {
    return [...commonMenuItems, ...userBusinessMenuItems]
  } else if (userRole === 'sponserUser') {
    return [...commonMenuItems, ...sponserUserMenuItems]
  } else if (userRole === 'roshaOp') {
    return [...commonMenuItems, ...roshaOpMenuItems]
  }

  // Return common items as fallback
  return commonMenuItems
}

export default useNavigation
