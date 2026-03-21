import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google'
import { useNavigation } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'



function Header() {

    const user = JSON.parse(localStorage.getItem('user'));

    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        console.log(user)
    }, [])

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => GetUserProfile(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    })

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
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }


    return (

        <div className='p-2 shadow-sm  flex justify-between items-center px-5'>
            <img src='/Voygo.png' className='w-30' />
            <div>
                {user ?
                    <div className='flex items-center gap-8'>
                        <a href="/my-trips">
                            <Button variant='outline' className='rounded-full'>My Trips</Button>
                        </a>


                        <Popover>
                            <PopoverTrigger asChild>
                                <img src={user?.picture} className='w-10 h-10 rounded-full cursor-pointer' />
                            </PopoverTrigger>
                            <PopoverContent>
                                <h2 className='cursor-pointer'
                                    onClick={() => {
                                        googleLogout();
                                        localStorage.clear();
                                        window.location.href = '/';
                                    }}>Log Out</h2>
                            </PopoverContent>
                        </Popover>
                    </div>
                    :
                    <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
                }
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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

export default Header