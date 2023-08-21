import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../federatedComponents'
interface LayoutProps {
  label?: string
}

export const Layout: React.FC<LayoutProps> = ({ label = 'test' }) => {
  const { t, i18n } = useTranslation()

  const onChangeLanguage = (lngg: string) => {
    localStorage.setItem('la', lngg)
    i18n.changeLanguage(lngg)
  }

  return (
    <div className="bg-fuchsia-500 transition-[direction_0.3s_ease]" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <p data-testid="app">Hello World {label} </p>
      <Button label={t('welcome')} className="bg-red-500  w-[25rem] h-[25rem]" />
      <div className="bg-emerald-400">
        <button
          className="bg-orange-200 mx-4"
          onClick={() => {
            onChangeLanguage('ar')
          }}
        >
          Arabic
        </button>
        <button className="bg-orange-200 mx-4" onClick={() => onChangeLanguage('en')}>
          English
        </button>
        <button className="bg-orange-200 mx-4" onClick={() => onChangeLanguage('ml')}>
          Malayalam
        </button>
        <button className="bg-orange-200 mx-4" onClick={() => onChangeLanguage('kn')}>
          kannada
        </button>
      </div>
    </div>
  )
}

export default Layout
