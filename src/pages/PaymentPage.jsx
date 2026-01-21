import React from 'react'

const PaymentPage = () => {
  return (
    <div>
      <h1>Select a Payment Method</h1>
      <div className=" border border-red-400">
      <p>i need icon for message</p>
      <p>Full Payment</p>
      <p>Pay once and get full course access after verification</p>
      <p>$120</p>
      <p>Instant activation after approval</p>
    </div>
    <div className="">
        <div className='flex justify-between'>
            <p>Course Fee</p>
            <p>120</p>
        </div>
        <div className='flex justify-between'>
            <p>Total payable now</p>
            <p>120</p>
        </div>
    </div>
    </div>
  )
}

export default PaymentPage
