import React, { useState } from 'react'
import OtpInput from './component/OtpInput'

export const _hap_fe_commonlib = () => {
  const [otp, setOtp] = useState('')

  const onchange = (value) => {
    console.log('value change', value)
    setOtp(value.target.value)
  }
  return (
    <div className=" flex flex-col bg-emerald-300" aria-label="remote">
      Hello from _hap_fe_commonLib
      {/* <Button className="bg-bold-primary text-red-600 bg-fuchsia-500" label="click Me" />
      <Input /> */}
      <OtpInput value={otp} onChange={onchange} length={6} message="text" />
    </div>
  )
}
export default _hap_fe_commonlib
