import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectedTravelesList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'




function CreateTrip() {

    const [place, setPlace] = useState();

    const [formData, setFormData] = useState([]);

    const handleInputChange = (name, value) => {

        

        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])


    return (

        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️</h2>
            <p className='text-gray-500 mt-3 text-xl'>Tell us about your dream trip and we'll craft a personalized itinerary just for you.</p>

            <div className='mt-20 flex flex-col gap-10'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => { setPlace(v); handleInputChange('location', v); }
                        }}
                    />
                </div>

                <div>
                    <h2 className='text-xl my-3 font-medium'>How manydays are you planning for your trip?</h2>
                    <Input placeholder='Ex : 3' type='number'
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)} />
                </div>

            </div>

            <div className='mt-10'>
                <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectBudgetOptions.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('budget', item.title)}
                            className={`flex flex-col items-center justify-center p-5 border rounded-lg cursor-pointer hover:shadow-lg transition-all
                            ${formData?.budget == item.title && 'shadow-lg border-black'}
                            `}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='text-lg font-bold'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-10'>
                <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your trip?</h2>
                <div className='grid grid-cols-3 gap-5 mt-5'>
                    {SelectedTravelesList.map((item, index) => (
                        <div key={index}
                            onClick={() => handleInputChange('traveler', item.people)}
                            className={`flex flex-col items-center justify-center p-5 border rounded-lg cursor-pointer hover:shadow-lg transition-all
                            ${formData?.traveler == item.people && 'shadow-lg border-black'}
                            `}>
                            <h2 className='text-4xl'>{item.icon}</h2>
                            <h2 className='text-lg font-bold'>{item.title}</h2>
                            <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div className='my-10 justify-end flex'>
                <Button>Generate Trip</Button>
            </div>

        </div>
    )

}

export default CreateTrip