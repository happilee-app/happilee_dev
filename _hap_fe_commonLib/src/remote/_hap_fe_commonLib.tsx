import React from 'react'
import { Input } from './component/Input/Input'
import Button from './component/Button'

export const _hap_fe_commonlib: React.FC = () => {
  return (
    <div className=" flex flex-col" aria-label="remote">
      Hello from _hap_fe_commonLib
      <Button className="bg-bold-primary text-white" />
      <Input />
    </div>
  )
}
export default _hap_fe_commonlib
