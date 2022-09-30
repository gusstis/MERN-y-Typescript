// eslint-disable-next-line
import { type } from "@testing-library/user-event/dist/type";
import React, { ChangeEvent, FormEvent, useState } from "react"
import { Video } from './Video';
import * as videoService from './VideoService';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom';

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const VideoForm = () => {

    const navigate = useNavigate()

// Estado inicial con los campos vacíos, no pueden ser null
    const initialState = {
        title: "",
        description: "",
        url: ""
    }
    const [video, setVideo] = useState<Video>(initialState);

    const handleInputChange = (e: InputChange) => {
        setVideo({ ...video, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
        await videoService.createVideo(video);
        toast.success('New video added')
        setVideo(initialState);
        navigate('/')
    }

    return (
        <div className="row">
            <div className="col-md-4-offset-md-4">
               <div className="card">
                    <div className="car-body">
                        <h3>New Vid</h3>

                        <form onSubmit={handleSubmit} >

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Give a title for this video"
                                    className="form-control"
                                    onChange={handleInputChange}
                                    value={video.title}
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <input  type="text"
                                        name="url"
                                        placeholder="Video Link"
                                        className="form-control"
                                        onChange={handleInputChange}
                                        value={video.url}
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="description"
                                    rows={3}
                                    className="form-control"
                                    placeholder="Give a description"
                                    onChange={handleInputChange}
                                    value={video.description}
                                ></textarea>
                            </div>
                            <button className="btn btn-primary" >
                                Create Video
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default VideoForm