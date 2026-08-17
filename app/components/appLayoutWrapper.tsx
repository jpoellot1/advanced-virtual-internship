'use client'
import { usePathname } from "next/navigation"
import SearchBar from "../searchBar/searchBar";
import SideBar from "../sideBar/sideBar";

export default function AppLayoutWrapper({children,}:{children: React.ReactNode}) {
    const pathname = usePathname();

    const excludedPaths = [
        '/',
        '/choose-plan'
    ]

    const shouldHideAppShell = excludedPaths.includes(pathname)

    if (shouldHideAppShell) {
        return <main>{children}</main>
    }

  return (
    <>
        <SideBar />
        <SearchBar />
        <main>{children}</main>
    </>
  )
}