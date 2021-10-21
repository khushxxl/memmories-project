/* eslint-disable @next/next/no-img-element */
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore'
import { useSession } from 'next-auth/react'
import { db, storage } from '../firebase'
import { useState } from 'react'
import { useRef } from 'react'
import { getDownloadURL, ref, uploadString } from '@firebase/storage'

const InputSection = () => {
  const { data: session } = useSession()
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [docId, setDocId] = useState(null)

  const [error, setError] = useState('')

  const filePickerRef = useRef()
  const titleRef = useRef()
  const descRef = useRef()

  function attachImage(e) {
    const reader = new FileReader()
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(reader.result)
    }
  }

  const addData = async () => {
    if (titleRef == '' && titleRef == null) {
      setError('Fill All Fields')
      return
    }
    if (descRef == '' && descRef == null) {
      setError('Fill All Fields')
      return
    }
    if (loading) return
    setLoading(true)
    const docRef = await addDoc(collection(db, 'memmories'), {
      name: session.user.name,
      timestamp: serverTimestamp(),
      title: titleRef.current.value,
      description: descRef.current.value,
      profileImg: session.user.image,
    })

    setDocId(docRef.id)

    const imageRef = ref(storage, `memmories/${docRef.id}/image`)
    await uploadString(imageRef, selectedFile, 'data_url').then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef)
        await updateDoc(doc(db, 'memmories', docRef.id), {
          memmoryImage: downloadUrl,
          docRefId: docRef.id,
        })
      },
    )

    titleRef == ''
    descRef == ''

    setLoading(false)
    setSelectedFile(null)
  }

  return (
    <div className=" w-[300px] h-[370px] bg-white ml-10 rounded-2xl mb-48">
      <div className="w-full max-w-xs rounded-2xl">
        {session && (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                ref={titleRef}
                type="text"
                placeholder="Add Title Here"
              />
            </div>
            <div className="mb-6 items-start">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="desc"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border border-red-500 rounded w-full text-center justify-start py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="desc"
                type="text"
                ref={descRef}
                placeholder="Add Description here"
              ></textarea>
            </div>
            <div>
              <input
                type="file"
                hidden
                ref={filePickerRef}
                onChange={attachImage}
              />
            </div>

            <div>
              {selectedFile ? (
                <img
                  src={selectedFile}
                  onClick={() => setSelectedFile(null)}
                  alt=""
                  className="w-full object-contain cursor-pointer mb-10"
                />
              ) : (
                <div className="text-black items-center place-items-center text-center mb-10">
                  <p onClick={() => filePickerRef.current.click()}>
                    No Files Selected
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center flex-col  justify-between text-center">
              <button
                className="bg-black text-white mb-3 hover:bg-blue-700 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline text-center"
                type="button"
                onClick={() => filePickerRef.current.click()}
              >
                Add Image
              </button>
              <button
                className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline text-center"
                type="button"
                onClick={addData}
                disabled={!selectedFile}
              >
                {loading ? 'Adding....' : 'Add'}
              </button>
            </div>
            <div>
              <p className="text-black text-center p-4">{error}</p>
            </div>
          </form>
        )}
        {!session && (
          <div>
            <p className="text-black text-center p-4">
              Sign in to post your Memmory❤️
            </p>
          </div>
        )}
        <p className="text-center text-gray-500 text-xs">
          &copy; 2021 Memmories. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default InputSection
