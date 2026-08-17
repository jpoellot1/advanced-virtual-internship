'use client'
import Image from 'next/image'
import Logo from "../Assets/logo.png"
import { AiOutlineHome } from "react-icons/ai";
import { RiBallPenLine } from "react-icons/ri";
import { GoSearch } from "react-icons/go";
import { CiBookmark, CiSettings } from "react-icons/ci";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useHandleLogout } from '../components/handleLogout';
import { useAuth } from '../components/useAuth';
import { useAppDispatch, useAppSelector } from '../Redux/lib/hooks';
import { openAuthModal } from '../Redux/authModalSlice';
import { closeSidebar } from '../Redux/sidebarSlice';


export default function SideBar() {
    const logout = useHandleLogout()
    const {user} =useAuth()
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector((state) => state.sidebar.isOpen)

  return (
    <>
        <div className={`sidebar__overlay ${!isOpen ? 'sidebar__overlay--hidden' : ""}`} onClick={() => dispatch(closeSidebar())}/>
        <div className={`sidebar ${!isOpen ? 'sidebar--closed' : 'sidebar--opened'}`}>
            <div className="sidebar__logo">
                <Image src={Logo} alt="logo" loading="eager"></Image>
            </div>
            <div className="sidebar__wrapper">
                <div className="sidebar__top">
                    <a href="/for-you" className="sidebar__link--wrapper">
                        <div className="sidebar__link--line"></div>
                        <div className="sidebar__icon--wrapper">
                            <AiOutlineHome />
                        </div>
                        <div className="sidebar__link--text">For you</div>
                    </a>
                    <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                        <div className="sidebar__link--line"></div>
                        <div className="sidebar__icon--wrapper">
                            <CiBookmark />
                        </div>
                        <div className="sidebar__link--text">My Library</div>
                    </div>
                    <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                        <div className="sidebar__link--line"></div>
                        <div className="sidebar__icon--wrapper">
                            <RiBallPenLine />
                        </div>
                        <div className="sidebar__link--text">Highlights</div>
                    </div>
                    <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                        <div className="sidebar__link--line"></div>
                        <div className="sidebar__icon--wrapper">
                            <GoSearch />
                        </div>
                        <div className="sidebar__link--text">Search</div>
                    </div>
                </div>
                <div className="sidebar__bottom">
                    <a href="/settings" className="sidebar__link--wrapper">
                        <div className="sidebar__link--line"></div>
                        <div className="sidebar__icon--wrapper">
                            <CiSettings />
                        </div>
                        <div className="sidebar__link--text">Settings</div>
                    </a>
                    <div className="sidebar__link--wrapper sidebar__link--not-allowed">
                        <div className="sidebar__link--line"></div>
                        <div className="sidebar__icon--wrapper">
                            <IoMdHelpCircleOutline/>
                        </div>
                        <div className="sidebar__link--text">Help & Support</div>
                    </div>
                    {user ? (
                        <div className="sidebar__link--wrapper" onClick={logout}>
                            <div className="sidebar__link--line"></div>
                            <div className="sidebar__icon--wrapper">
                                <MdLogout />
                            </div>
                            <div className="sidebar__link--text" >Logout</div>
                        </div>
                    ):(
                        <div className="sidebar__link--wrapper" onClick={() => dispatch(openAuthModal('login'))}>
                            <div className="sidebar__link--line"></div>
                            <div className="sidebar__icon--wrapper">
                                <MdLogout />
                            </div>
                            <div className="sidebar__link--text" >Login</div>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    </>
)
}
