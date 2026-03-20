import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectBudgetOptions, SelectedTravelesList } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import { generateTravelPlan } from '@/service/AIModel';
import { AI_PROMPT } from '@/constants/options';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';



function CreateTrip() {

    const [place, setPlace] = useState();

    const [formData, setFormData] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (name, value) => {



        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        console.log(formData)
    }, [formData])

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => GetUserProfile(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    })


    const OnGenerateTrip = async () => {

        const user = localStorage.getItem('user');

        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
            toast.error("Please fill all fields and ensure the number of days is less than 5.");
            return;
        }

        setLoading(true);

        const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData?.location?.label)
            .replace('{noOfDays}', formData?.noOfDays)
            .replace('{traveler}', formData?.traveler)
            .replace('{budget}', formData?.budget);

        // console.log(FINAL_PROMPT)

        const result = await generateTravelPlan(FINAL_PROMPT);
        console.log(result);
        setLoading(false);
        SaveTrip(result);
    }


    const SaveTrip = async (TripData) => {
        setLoading(true);
        const userStr = localStorage.getItem('user');
        const user = userStr ? JSON.parse(userStr) : null;
        const docId = Date.now().toString()
        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            userEmail: user?.email ? user?.email : '',
            tripData: TripData,
            id: docId,
        });
        setLoading(false);
        navigate('/view-trip/' + docId);
    }


    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'application/json'
            }
        }).then((res) => {
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            setOpenDialog(false);
            OnGenerateTrip();
        }).catch((err) => {
            console.log(err);
        })
    }


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
                <Button
                    disabled={loading}
                    onClick={OnGenerateTrip}>
                    {loading ?
                        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> :
                        "Generate Trip"
                    }
                </Button>
            </div>


            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex flex-col items-center gap-2 text-lg font-bold mt-7">
                            <img src="/Voygo.png" alt="logo" />
                            Please Login to Continue
                        </DialogTitle>
                        <DialogDescription className="text-center text-gray-500">
                            Login to continue with your trip planning
                        </DialogDescription>
                    </DialogHeader>
                    <Button
                        onClick={() => login()} className='mt-5 w-full flex gap-4 items-center'>
                        <FcGoogle className='h-7 w-7' />
                        Sign In with Google
                    </Button>
                </DialogContent>
            </Dialog>


        </div>
    )

}

export default CreateTrip