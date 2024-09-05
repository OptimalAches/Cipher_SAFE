import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])

    useEffect(() => {
        //console.log("reloaded")
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast.success('Copied to clipboard!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            //console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast.success('Saved successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast.error('Invalid entry!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const editPassword = (id) => {
        //console.log("Editing password with id", id)
        setform(passwordArray.filter(i => i.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const deletePassword = (id) => {
        //console.log("Deleting password with id", id)
        let c = confirm("Do you really want to delete this entry?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

            toast.success('Deleted successfully!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password"
        }
    }
    
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="px-4 py-8 md:mycontainer md:py-8 min-h-[81vh]">

                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span><span>Cipher</span><span className="text-green-500">SAFE/&gt;</span>
                </h1>
                <p className='text-green-900 text-md text-center'>Your Own Password Manager</p>

                <div className='text-black flex flex-col my-5 gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder="Enter website URL" className='rounded-full border border-green-900 w-full px-4 py-1' type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-full border border-green-900 w-full px-4 py-1" type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-green-900 w-full px-4 py-1" type="password" name="password" id="password" />
                            <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className="p-1" width={26} src="./icons/eyecross.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center text-white font-bold gap-1 items-center bg-green-700 hover:bg-green-500 rounded-full px-4 py-2 w-fit border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/ftndcppj.json"
                            trigger="hover">
                        </lord-icon>
                        <span>Save</span>
                    </button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show!</div>}
                    {passwordArray.length !== 0 && <table className="table-fixed w-full rounded-md overflow-hidden">
                        <thead className='bg-green-700 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return (<tr key={index}>
                                    <td className='border border-white py-2'>
                                        <div className='flex justify-center items-center gap-3'>
                                            <span><a className="hover:text-orange-700" href={item.site} target="_blank">{item.site}</a></span>
                                            <span className='cursor-pointer' onClick={() => { copyText(item.site) }}><FontAwesomeIcon icon={faCopy} /></span>
                                        </div>
                                    </td>
                                    <td className='border border-white py-2 '>
                                        <div className='flex justify-center items-center gap-3'>
                                            <span>{item.username}</span>
                                            <span className='cursor-pointer' onClick={() => { copyText(item.username) }}><FontAwesomeIcon icon={faCopy} /></span>
                                        </div>
                                    </td>
                                    <td className='border border-white py-2 '>
                                        <div className='flex justify-center items-center gap-3'>
                                            <span>{item.password}</span>
                                            <span className='cursor-pointer' onClick={() => { copyText(item.password) }}><FontAwesomeIcon icon={faCopy} /></span>
                                        </div>
                                    </td>
                                    <td className='border border-white py-2 '>
                                        <div className='flex justify-center items-center gap-6'>
                                            <span className='cursor-pointer' onClick={() => { editPassword(item.id) }}><FontAwesomeIcon icon={faPenToSquare} /></span>
                                            <span className='cursor-pointer' onClick={() => { deletePassword(item.id) }}><FontAwesomeIcon icon={faTrash} /></span>
                                        </div>
                                    </td>
                                </tr>)
                            })}
                            {/* <tr>
                                <td className='border border-white py-2 text-center w-full'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                                <td className='border border-white py-2 text-center w-full'>Malcolm Lockyer</td>
                                <td className='border border-white py-2 text-center w-full'>1961</td>
                            </tr>
                            <tr>
                                <td className='border border-white py-2 text-center w-full'>Witchy Woman</td>
                                <td className='border border-white py-2 text-center w-full'>The Eagles</td>
                                <td className='border border-white py-2 text-center w-full'>1972</td>
                            </tr>
                            <tr>
                                <td className='border border-white py-2 text-center w-full'>Shining Star</td>
                                <td className='border border-white py-2 text-center w-full'>Earth, Wind, and Fire</td>
                                <td className='border border-white py-2 text-center w-full'>1975</td>
                            </tr> */}
                        </tbody>
                    </table>}
                </div>

            </div>
        </>
    )
}

export default Manager