import {useEffect} from 'react'
import {useRouter} from "next/router"
export default function Verify(){
    const router = useRouter();
    useEffect(() => {
        router.push('/')
    }, [])
}