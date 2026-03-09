import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'




function CreateTrip() {

    return (

        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
            <p className='text-gray-500 mt-3 text-xl'>Tell us about your dream trip and we'll craft a personalized itinerary just for you.</p>

            <div className='mt-20'>
                <div>
                    <h2 className='text-xl my-3 font-medium'>What is your destination?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
                    />
                </div>
            </div>
        </div>

    )

}

export default CreateTrip