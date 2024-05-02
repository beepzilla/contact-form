import React, { useState } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import ContactModel from './ContactModel'; // Ensure this and its dependencies are correctly moved over
import './Contact.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [disabled, setDisabled] = useState(false);
  const [messageModel] = useLoader(GLTFLoader, ['/message.glb']);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const response = await axios.post('/api/send', formData);
      console.log('Message sent:', response.data);
      alert('Message Sent.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setDisabled(false);
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
      setDisabled(false);
    }
  };

  return (
    <div className="section">
      <Canvas
        style={{
          height: '100vh',
          width: '50vw',
        }}
        camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 8] }}
      >
        <ContactModel messageModel={messageModel} />
      </Canvas>

      <Loader
        containerStyles={{
          background: 'radial-gradient(circle farthest-corner at center top,#071021,#19324a)',
        }}
        innerStyles={{
          backgroundColor: 'salmon',
          width: '50vw',
        }}
        barStyles={{
          backgroundColor: 'lightgreen',
        }}
        dataInterpolation={(p) => `Loading ${Math.round(p)}%`}
        initialState={(active) => active}
        dataStyles={{
          color: '#fafafa',
          fontSize: '25px',
          fontFamily: 'Raleway',
          fontWeight: '500',
        }}
      />

      <div className="container">
        <div className="right">
          <h2 className="title">Contact Me</h2>
          <p className="tag">
            Leave a message for me. I will be more than happy to hear from you :)
          </p>
          <hr />
          <form onSubmit={handleSubmit} method="POST">
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <input type="text" name="name" placeholder="Name" className="form-control" required value={formData.name} onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <input type="email" name="email" placeholder="Email" className="form-control" required value={formData.email} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input type="text" name="subject" placeholder="Subject" className="form-control" required value={formData.subject} onChange={handleChange} />
              <textarea name="message" placeholder="Message" className="form-control" rows="3" required value={formData.message} onChange={handleChange} />
            </div>
            <button type="submit" className="primary-btn submit" disabled={disabled}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
