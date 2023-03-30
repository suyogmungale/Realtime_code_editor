import React, { useState, useRef, useEffect } from 'react';
import { initSocket } from '../socket';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import ACTIONS from '../Action';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { toast } from 'react-hot-toast';


const EditorPage = () => {
   const socketRef = useRef(null);
   const location = useLocation();
  // const navigate = useNavigate();
   const { roomId } = useParams();
   const reactNavigator = useNavigate();
  const [clients, setClients] = useState([ { socketId: 'Dg5jQJjzGxxTUktEAAAq', username: 'suyog mungale' },
  { socketId: 'nvB5fVdBW4UgMOTCAAAr', username: 'devraj' }]);

  useEffect(() => {
    const init = async () =>{
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
    }


      socketRef.current.emit(ACTIONS.JOIN,{
        roomId,
        username:location.state?.username,
      });

      //Listening for joined
      // socketRef.current.on(ACTIONS.JOINED, 
      //   (clients,username,socketId) => {
      //     if(username !== location.state?.username){
      //       toast.success(`${username} has joined the room`)
      //       console.log(`${username}`)
      //     }
      //     setClients(clients);
      // })

    }
    init();
  }, [])
  

  return (
    <div className="mainWrap">
      <div className="side">
        <div className="sideInner">
          <div className="logo">
            <img src="/code-sync.png" alt="logo" className="logoImage" />
          </div>
          <h3>Connected</h3>
          <div className="clientList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy ROOM ID</button>
        <button className="btn leaveBtn">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
};

export default EditorPage;
