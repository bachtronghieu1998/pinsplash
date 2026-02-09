"use client";
import React from "react";
import IconLogo from "../../public/logo.svg";
import SearchIcon from "../../public/search-line.svg";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";

interface HeaderProps {}
const Header: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex row items-center justify-center p-4 gap-4">
        <Image
          src={IconLogo}
          alt="Logo"
          loading="eager"
          className="cursor-pointer"
          onClick={() => router.push(routes.home())}
        />
        <div className="relative flex items-center justify-between grow">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md p-2 w-full text-black"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2">
            <Image src={SearchIcon} alt="Search icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
