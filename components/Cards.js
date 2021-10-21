/* eslint-disable @next/next/no-img-element */
import { data } from 'autoprefixer'
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore'

import { projectData } from '../dummydata'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { async } from '@firebase/util'

const Cards = () => {
  const { data: session } = useSession()
  const [memmoryData, setMemmoryData] = useState([])
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'memmories'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setMemmoryData(snapshot.docs)
        },
      ),
    [],
  )

  return (
    <div className="grid grid-cols-1  lg:grid-cols-2 rounded-3xl lg:mt-0">
      {memmoryData.map((memmory) => {
        return (
          <div
            key={data.id}
            className=" w-[300px] bg-white text-black m-10 rounded-md"
          >
            <div className="p-3">
              <div className="flex items-center mb-3">
                {/* Image of who posts */}
                <img
                  src={memmory.data().profileImg}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                {/* Name of who posts */}
                <p className="ml-2 italic font-semibold">
                  {memmory.data().name}
                </p>
              </div>
              <img
                src={memmory.data().memmoryImage}
                alt=""
                className="border-red-500 rounded-2xl border-2 p-2"
              />
              <p className="font-semibold text-black ml-2 mt-5">
                {memmory.data().title}
              </p>
              <p className="overflow-ellipsis ml-2">
                {memmory.data().description}
              </p>
            </div>

            {memmory.data().profileImg == session?.user?.image && (
              <p
                onClick={async () => {
                  await deleteDoc(doc(db, 'memmories', memmory.data().docRefId))
                }}
                className="text-black text-sm text-center mb-4 cursor-pointer"
              >
                DELETE
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Cards
