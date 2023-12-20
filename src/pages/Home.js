
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../firebase"
import { logout as logoutHandle } from "../store/auth"
import { useNavigate } from "react-router-dom"
import UpdateProfile from "../components/UpdateProfile"
import Sidebar from "../components/Sidebar"



export default function Home() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const handleLogout = async () => {
        await logout()
        dispatch(logoutHandle())
        navigate('/login', {
            replace: true
        })
    }

    return (
        <>
            <Sidebar>
                <div className="max-w-xl mx-auto py-5">
                    <h1 className="flex gap-x-4 items-center ">Oturumun açık  ({user.email})
                        <button onClick={handleLogout} className="  h-8 rounded px-4 text-sm text-white bg-indigo-700">Çıkış yap</button>
                    </h1>

                    <UpdateProfile />

                    <div className="max-w-md py-20">
                        <div className="flex items-center  justify-between">
                            <div >
                                <p className="text-xl">{user.displayName}</p>
                                <p className="text-lg">{user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </>
    )

}