import React from 'react'
import { RiVideoUploadFill } from 'react-icons/ri'
import  {Link,  useNavigate}  from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import logo from "../assets/logo.png"
function Navbar() {
  const navigate = useNavigate();
  return (
    <div className='w-full bg-[#141414] text-white py-4 flex item-center justify-between px-8 max-sm:px-4'>
       <p></p>
      <div className="text-white cursor-pointer flex items-center gap-2" onClick={()=>navigate('/')}>
        <img src={logo} className='w-12 max-sm:w-8' />
        <h1 className=' font-Mont font-semibold text-3xl max-sm:text-lg'>WhatsMyRank.com</h1>
      </div>
       <Link to="/upload" data-tooltip-id="upload-clip" data-tooltip-content="Upload Clip!"> <RiVideoUploadFill className='w-8 max-sm:w-6 h-full' /></Link>
       <Tooltip id="upload-clip" />
    </div>
  )
}

export default Navbar
