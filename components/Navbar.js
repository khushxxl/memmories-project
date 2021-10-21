/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const { data: session } = useSession()

  return (
    <div className="cursor-pointer flex flex-col items-start justify-between mx-10 mt-3">
      <div>
        <h1 className="text-2xl font-extrabold ml-14 md:ml-0">Memmories</h1>
      </div>

      {session && (
        <div className="cursor-pointer items-center">
          <button
            className="text-md bg-white text-black rounded-md p-2 font-semibold mt-2 text-center items-center flex ml-24 md:ml-0"
            onClick={signOut}
          >
            Sign Out
          </button>
          {/* <h1 className=" "></h1> */}
          <div className="flex items-center mt-2">
            {/* Image of who posts */}
            <img
              src={session.user.image}
              alt=""
              className="w-10 h-10 border-red-600 border-2 rounded-full"
            />
            {/* Name of who posts */}
            <p className="ml-2 italic font-semibold">{session.user.name}</p>
          </div>
        </div>
      )}
      {!session && (
        <div className="cursor-pointer items-center">
          <Link href="auth/signin">
            <button className="text-md bg-white text-black rounded-md p-2 font-semibold mt-2 text-center items-center flex ml-20 md:ml-0">
              Sign In
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar

// session ? (
//
// ) : (

// )
