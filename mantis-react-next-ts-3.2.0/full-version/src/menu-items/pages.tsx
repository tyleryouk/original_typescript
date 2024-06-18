// third-party
import { FormattedMessage } from 'react-intl';

// assets
import DollarOutlined from '@ant-design/icons/DollarOutlined';
import LoginOutlined from '@ant-design/icons/LoginOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import RocketOutlined from '@ant-design/icons/RocketOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { DollarOutlined, LoginOutlined, PhoneOutlined, RocketOutlined };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages: NavItemType = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  children: [
    {
      id: 'authentication',
      title: <FormattedMessage id="authentication" />,
      type: 'collapse',
      icon: icons.LoginOutlined,
      children: [
        {
          id: 'login',
          title: <FormattedMessage id="login" />,
          type: 'item',
          url: '/pages/login',
          target: true
        },
        {
          id: 'register',
          title: <FormattedMessage id="register" />,
          type: 'item',
          url: '/pages/register',
          target: true
        },
        {
          id: 'forgot-password',
          title: <FormattedMessage id="forgot-password" />,
          type: 'item',
          url: '/pages/forget-pass',
          target: true
        },
        {
          id: 'reset-password',
          title: <FormattedMessage id="reset-password" />,
          type: 'item',
          url: '/pages/reset-pass',
          target: true
        },
        {
          id: 'check-mail',
          title: <FormattedMessage id="check-mail" />,
          type: 'item',
          url: '/pages/check-mail',
          target: true
        },
        {
          id: 'code-verification',
          title: <FormattedMessage id="code-verification" />,
          type: 'item',
          url: '/pages/verify-code',
          target: true
        }
      ]
    },
    {
      id: 'maintenance',
      title: <FormattedMessage id="maintenance" />,
      type: 'collapse',
      icon: icons.RocketOutlined,
      isDropdown: true,
      children: [
        {
          id: 'error-404',
          title: <FormattedMessage id="error-404" />,
          type: 'item',
          url: '/pages/404',
          target: true
        },
        {
          id: 'error-500',
          title: <FormattedMessage id="error-500" />,
          type: 'item',
          url: '/pages/500',
          target: true
        },
        {
          id: 'coming-soon',
          title: <FormattedMessage id="coming-soon" />,
          type: 'item',
          url: '/pages/coming-soon',
          target: true
        },
        {
          id: 'under-construction',
          title: <FormattedMessage id="under-construction" />,
          type: 'item',
          url: '/pages/under-construction',
          target: true
        }
      ]
    },
    {
      id: 'contact-us',
      title: <FormattedMessage id="contact-us" />,
      type: 'item',
      url: '/contact-us',
      icon: icons.PhoneOutlined,
      target: true
    },
    {
      id: 'pricing',
      title: <FormattedMessage id="pricing" />,
      type: 'item',
      url: '/pages/pricing',
      icon: icons.DollarOutlined
    }
  ]
};

export default pages;
