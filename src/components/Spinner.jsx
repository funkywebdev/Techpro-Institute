import React from 'react'

const Spinner = ({ text = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="w-12 h-12 border-4 border-[#15256E] border-t-transparent rounded-full animate-spin mb-4"></div>
  </div>
);

export default Spinner