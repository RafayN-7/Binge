import React from 'react'

const Footer = () => {
  return (
    <div className='text-[#737373] md:px-10 pb-5 py-15 '>


        
       {/*  <p className="pb-5 py-15 ">For Questions or complaints: Contact Us.</p> */}
        

        <div className="grid grid-cols-2 md:grid-cols-4 text-sm pb-10 max-w-5xl">
            <ul className="flex flex-col space-y-2">
                <li>FAQ</li>
                <li>Investor Relations</li>
                <li>Privacy</li>
                <li>Speed Test</li>
            </ul>

            <ul className="flex flex-col space-y-2">
                <li>Help Center</li>
                <li>Jobs</li>
                <li>Cookie Preferences</li>
                <li>Legal Notices</li>
            </ul>

            <ul className="flex flex-col space-y-2">
                <li>Account</li>
                <li>Ways to Watch</li>
                <li>Cooperate Information</li>
                <li>Only Netflix</li>
            </ul>

            <ul className="flex flex-col space-y-2">
                <li>Media Center</li>
                <li>Terms of Use</li>
                <li>Contact Us</li>
            </ul>
        </div>
                <div className='py-2 justify-center items-center flex text-[#FF5733]'>
        <p>This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p>
        </div>
    </div>
  )
}

export default Footer