import React, { useEffect, useState } from 'react'
import "./Brands.css"

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Brands = () => {
    ///get api
    const [data, setdata] = useState([])
    const getFunc = () => {
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands")
            .then((resp) => resp.json())
            .then((elem) => setdata(elem?.data))
    }
    useEffect(() => {
        getFunc()
    }, [])








    ///modal
    const [openMadal, setOpenModal] = useState(false)
    const modalFunction = () => {
        setOpenModal(true)
    }


    ///post api
    const [title, setTitle] = useState()
    const [pic, setPic] = useState()
    const token = localStorage.getItem("token")
    const formData = new FormData()


    const addFunction = (e) => {
        formData.append("title", title)
        formData.append("images", pic)
        e.preventDefault()
        fetch("https://autoapi.dezinfeksiyatashkent.uz/api/brands", {
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
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${id}`, {
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
        formData.append("title", title)
        formData.append("images", pic)
        console.log(pic)
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/brands/${idBtn}`, {
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
                        <input onChange={(e) => setTitle(e?.target?.value)} type="text" placeholder='titlr' required />
                        <input type="file" multiple onChange={(e) => setPic(e?.target?.files[0])} required accept="image/png, image/jpeg" />
                        <button className='btn'>Qoshilsin</button>
                    </form>
                </div>
                : editmodal ?
                    <div className='modal'>
                        <h1>Edit qilish</h1>
                        <form onSubmit={editFunc}>


                            <input onChange={(e) => setTitle(e?.target?.value)} type="text" placeholder='title' required />

                            <input type="file" multiple onChange={(e) => setPic(e?.target?.files[0])} required accept="image/png, image/jpeg" />

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

                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.title}</td>

                                <td> <img src={`https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/${item?.image_src}`} alt="" /></td>

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

export default Brands

