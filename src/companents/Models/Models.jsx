import React, { useEffect, useState } from 'react'
import "./Models.css"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Models = () => {
    const [brand, setBrandid] = useState()
    const [brandid, setbrandid] = useState(null)
    ///get api
    const [data, setdata] = useState([])
    const getFunc = () => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models")
            .then((resp) => resp.json())
            .then((elem) => {
                console.log(elem)
                setdata(elem?.data)
            })
    }
    useEffect(() => {
        getFunc()
    }, [])



    /// get brands

    const getFunctionbrand = () => {

        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
            .then((resp) => resp.json())
            .then((elem) => {
                setBrandid(elem?.data)
            })
    }

    useEffect(() => {
        getFunc()
        getFunctionbrand()
    }, [])



    ///modal
    const [openMadal, setOpenModal] = useState(false)
    const modalFunction = () => {
        setOpenModal(true)
    }


    const hamdleChange = (e) => {
        setbrandid(e.target.value)
    }

    ///post api
    const [name, setName] = useState()


    const token = localStorage.getItem("token")
    const formData = new FormData()


    const addFunction = (e) => {
        e.preventDefault()
        formData.append("name", name)
        formData.append("brand_id", brandid)

        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/models", {
            method: "Post",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((respon) => respon.json())
            .then((dat) => {
                if (dat?.success === true) {

                    toast.success(dat?.message)

                    setOpenModal(false)

                    getFunc()

                }
                else {
                    toast.error(data?.message)
                }
            })

    }

    ///delete api


    const deleteFunc = (id) => {
        console.log(id, "id")
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${id}`, {
            method: "Delete",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => res.json())
            .then((data) => {

                if (data?.success === true) {
                    toast.success(data?.message)


                    getFunc()

                }
                else {
                    toast.error(data?.message)
                }

            })


    }

    //put modal

    const [editmodal, setEditmodal] = useState(false)
    const [idBtn, setIdbtn] = useState()
    const editmodalFunc = (id) => {
        setIdbtn(id);
        setOpenModal(false);
        setEditmodal(true);
    }

    // edit api


    const editFunc = (e) => {
        e.preventDefault()
        formData.append("name", name)
        formData.append("brand_id", brand)


        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/models/${idBtn}`, {
            method: "PUT",
            body: formData,
            headers: {
                "Authorization": `Bearer ${token}`
            },

        }).then((response) => response.json())
            .then((elem) => {
                if (elem?.success === true) {
                    toast.success(elem?.message)
                    setEditmodal(false)

                    getFunc()

                }
                else {
                    toast.error(elem?.message)
                }
            })
    }

    return (
        <>
            <button className='qoshish' onClick={modalFunction} >Qoshish</button>
            {openMadal ?
                <div className='modal'>
                    <h1>Modalga xush kelibsiz</h1>
                    <form onSubmit={addFunction}>
                        <input onChange={(e) => setName(e?.target?.value)} type="text" placeholder='name' required />
                        <select onChange={hamdleChange} >
                            <option value="dsed">salom</option>
                            {brand?.map(el => {
                                console.log(el)
                                return <option option value={el?.id
                                }> {el?.title}</option>
                            }

                            )}
                        </select>
                        {/* <input onChange={(e) => setBrandid(e?.target?.value)} type="text" placeholder='brand' required /> */}

                        <button className='btn' >Qoshilsin</button>
                    </form>
                </div>
                : editmodal ?
                    <div className='modal'>
                        <h1>Edit qilish</h1>
                        <form onSubmit={editFunc}>


                            <input onChange={(e) => setName(e?.target?.value)} type="text" placeholder='name' required />
                            <input onChange={(e) => setBrandid(e?.target?.value)} type="text" placeholder='brand' required />



                            <button className='btn'>Edit</button>

                        </form>
                    </div>
                    : ""

            }
            <div className='settings'>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.name}</td>
                                <td>{item?.brand_title}</td>



                                <td onClick={() => editmodalFunc(item?.id)}>
                                    <button className='set_btn'> <i class='bx bx-edit-alt'></i> </button>
                                </td>

                                <td >
                                    <button onClick={() => deleteFunc(item?.id)} className='set_btn'><i class='bx bx-message-alt-x'></i></button>
                                </td>
                            </tr>


                        ))}




                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Models

