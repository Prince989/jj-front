// ** Type import
import { BillIcon, ChartIcon, DashboardIcon, GuideIcon, LetterIcon, ProfileIcon, ProtectionIcon, ServicesIcon, WalletIcon } from 'src/@core/components/IconV2'
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useAuth } from 'src/hooks/useAuth'

// ** Example of importing a custom icon component
// import CustomIcon from 'path/to/your/CustomIcon'

const useNavigation = (): VerticalNavItemsType => {
  // Get the authenticated user and role
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
      title: "خرید اعتبار",

      // icon: "tabler:vip", // String icon example
      icon: <WalletIcon />,
      path: "/cards"
    },
    {
      sectionTitle: 'خدمات'
    },
    {
      title: "خدمات",
      icon: <ServicesIcon />,
      path: "/services"
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
      path: "/profile"
    },
  ]

  // Return navigation items based on user role
  if (userRole === 'user') {
    return [...commonMenuItems, ...userMenuItems]
  } else if (userRole === 'businessUser') {
    return [...commonMenuItems, ...userBusinessMenuItems]
  }

  // Return common items as fallback
  return commonMenuItems
}

export default useNavigation
