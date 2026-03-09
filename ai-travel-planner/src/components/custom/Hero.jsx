import React from 'react'
import { Button } from '../ui/button'



function Hero() {

    return (

        <div className='flex flex-col items-center gap-9 mx-60'>
            <h1 className='font-extrabold text-[50px] text-center mt-15'>
                <span className='text-[#5c9df1]'>Discover Your Next Adventure with AI.</span><br /> Personalized Itineraries at Your Fingertips.
            </h1>
            <p className='text-center mt-5 text-xl text-gray-500'>Voygo leverages cutting-edge artificial intelligence to craft unique travel experiences tailored to your interests, budget, and style.</p>
            <Button className='text-lg'>Get Started. It's Free</Button>
        </div>

    )

}

export default Hero