// eslint-disable-next-line
import { type } from "@testing-library/user-event/dist/type";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react"
import { Video } from './Video';
import * as videoService from './VideoService';
import {toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router-dom';
//import { getVideos } from './VideoService';


type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

/*interface Params {
    id?: string ;
}*/

const VideoForm = () => {
// Estado inicial con los campos vacíos, no pueden ser null
const initialState = {
    title: "",
    description: "",
    url: "",
};
    const [video, setVideo] = useState<Video>(initialState);

    const navigate = useNavigate();
    const params = useParams();//aca va : <Params>
    console.log(params);
    

    const handleInputChange = (e: InputChange) => {
        setVideo({ ...video, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement> ) => {
        e.preventDefault();

        if (!params.id) {
            
            await videoService.createVideo(video);
            toast.success('New video added')
            setVideo(initialState);
        } else {
            await videoService.updateVideo(params.id, video)
        }
        
        navigate('/')
    };

    const getVideo = async (id: string) => {
        const res = await videoService.getVideo(id);
        const {title, description, url} = res.data;
        setVideo({title, description, url})
    }

    useEffect(() => {
        if (params.id) getVideo(params.id);
    }, [])

    return (
        <div className="row">
            <div className="col-md-4-offset-md-4">
               <div className="card">
                    <div className="card-body">
                        <h3>New Video</h3>
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
                            {
                            params.id ? (
                               <button className="btn btn-info">Update</button>
                                ) : (
                                <button className="btn btn-primary">Create</button>
                                )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default VideoForm