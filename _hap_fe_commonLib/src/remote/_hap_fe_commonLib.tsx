import React from 'react'
import Button from './component/Button'
import Input from './component/Input'

export const _hap_fe_commonlib = () => {
  return (
    <div className=" flex flex-col" aria-label="remote">
      Hello from _hap_fe_commonLib
      <Button className="bg-bold-primary text-red-600 bg-fuchsia-500" label="click Me" />
      <Input />
    </div>
  )
}
export default _hap_fe_commonlib
