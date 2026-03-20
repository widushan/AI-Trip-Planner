import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIosSend } from "react-icons/io";



function InfoSection({ trip }) {

    return (

        <div>
            <img src="/Travelling.jpg" className='w-full h-[350px] object-cover rounded-xl' />

            <div className='flex justify-between items-center'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                    <div className='flex gap-5'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📅 {trip.userSelection?.noOfDays} Days</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💰 {trip.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🙋‍♂️ No Of Travelers: {trip.userSelection?.traveler}</h2>
                    </div>
                </div>
                <Button><IoIosSend /></Button>
            </div>

        </div>

    )

}


export default InfoSection