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
  //const navigate = useNavigate();
  const { roomId } = useParams();
  const reactNavigator = useNavigate();
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on('connect_error', (err) => handleErrors(err));
      socketRef.current.on('connect_failed', (err) => handleErrors(err));

      function handleErrors(e) {
        console.log('socket error', e);
        toast.error('Socket connection failed, try again later.');
        reactNavigator('/');
    }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        userName: location.state?.userName
      });

      //listening for join event
      socketRef.current.on(ACTIONS.JOIN, ({clients, userName, socketId}) => {
        if(userName !== location.state?.userName){
           toast.success(`${userName} has join`);
           console.log(`${userName}`)
        }
        setClients(clients);
        console.log(clients)
      }
      );

    };

    init();
  }, []);


  if (!location.state) {
    return <Navigate to="/" />;
  }


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
