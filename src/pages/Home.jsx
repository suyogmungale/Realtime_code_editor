import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState();
    const navigate = useNavigate();

    const createNewRoom = (e) =>{
        e.preventDefault();
        const id = uuidv4();
        setRoomId(id);
        toast.success('Created new room')
    }

    const joinRoom = () => {
        if(!roomId || !userName){
            toast.error('room id or and username require')
            return;
        }
            navigate(`/editor/${roomId}`,{
                state:{
                    userName
                }
            })
    }

    const enterInput = (e) => {
       
        if(e.code === 'Enter'){
            joinRoom();

        }

    }

    return (
        <div className='homePageWraper'>
            <div className='fromWraper'>
                <img src="/code-sync.png" alt="logo" className='homePageLogo' />
                <h4 className='mainLable'>Paste invitation ROOM Id</h4>
                <div className='inputGroup'>
                    <input  
                    type="text" 
                    className='inputBox'
                    placeholder='ROOM ID' 
                    onChange={(e) => setRoomId(e.target.value)}
                    value={roomId}
                    onKeyUp={enterInput}
                     />


                    <input
                     type="text" 
                     className='inputBox'
                      placeholder='USERNAME' 
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                      onKeyUp={enterInput}
                      />

                    <button className='btn joinBtn' onClick={joinRoom}>Join</button>
                    <span className='creatInfo'>
                        if you don't have then create &nbsp;
                        <a href="" className='createNewBtn'
                        onClick={createNewRoom}>
                        new room
                        </a>
                    </span>
                </div>
            </div>
            <footer>
                <h4>build with 💚&nbsp; by <a href='https://github.com/suyogmungale'>suyog mungale</a></h4>
            </footer>
        </div>
    )
}

export default Home