import React from 'react'

const Footer = () => {
  return (
        <div>
            <div className=' flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-3 mt-40 text-sm'>
                <div>
                        <p className='px-10 py-3 w-full md:w-2/3 text-gray-600'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi officiis blanditiis tenetur voluptas quod possimus recusandae dolore accusantium velit eligendi!
                        </p>
                </div>
                <div>
                    <p className='text-xl font-medium mb-2'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>HOME</li>
                        <li>ABOUT US</li>
                        <li>Notice & Rules</li>
                        <li>PRIVACY POLICY</li>
                    </ul>
                </div>
                <div>
                    <p className='text-xl font-medium mb-4'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+1 372-288-2782</li>
                        <li>contact@stockBeacon.in</li>
                    </ul>
                </div>
            </div>
            <div>
                <hr />
                <p className='py-3 text-center text-sm'>Copyright 2025@ forever.com - All Rights Reserved. </p>
            </div>
        </div>
      )
    }

export default Footer