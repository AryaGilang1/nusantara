import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { IoCart, IoHeart } from "react-icons/io5"
import { Separator } from "./ui/separator"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Alert } from "./forms/Alert"
import { useState } from "react"


export const Header = () => {
    const [userLogOut, setUserLogOut] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUserLogOut(true);

        navigate('/login');
    };



    return (
        <header className="flex w-[100%] justify-between border-b-2 py-3 px-8 h-16 items-center">
            {/* brand */}
            <p className="text-2xl font-bold hover:cursor-pointer">Diagram Chart</p>
            {/* searchnar */}

            <div className="flex space-x-2">
                <Link to='/input-form'>
                    <Button >Add Data</Button>
                </Link>
                <Button onClick={handleLogout}>Log Out</Button>
            </div>
            <Alert onClick={() => setUserLogOut(false)} open={userLogOut} onOpenChange={setUserLogOut} dialog="Mohon ulangin jaringan anda bermasalah atau username/password anda salah" dialogTitle="Gagal Masuk" dialogCancel="Kembali" />
        </header>
    )
}
