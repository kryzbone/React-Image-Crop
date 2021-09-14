import React, {useCallback, useRef, useState} from 'react'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button';
import Cropper from 'react-easy-crop'
import {base64ToCanvas, extractFileExtFromBase64, downloadBase64File} from './utils'
import './App.css';

function App() {
  const fileInput = useRef()
  const canvasRef = useRef()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [image, setImage] = useState()
  const [preview, setPreview] = useState()



  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(image)
    const canvas = canvasRef.current
    base64ToCanvas(canvas, image, croppedAreaPixels)
  }


  const handleUpload = () => {
    fileInput.current.click()
  }

  const inputChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const save = () => {
    const imgExt = extractFileExtFromBase64(image)
    const croppedImage = canvasRef.current.toDataURL("image/"+imgExt)
    const filename = "cropped-image." + imgExt
    // download file 
    downloadBase64File(croppedImage, filename)
  }

  return (
    <>
      <div className="App">
        <input type="file" ref={fileInput} onChange={inputChange} accept="image/*" style={{display:"none"}} />
        <div className="crop-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="controls">
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e, zoom) => setZoom(zoom)}
            classes={{ root: 'slider' }}
          />
        </div>      
      </div>
      <section>
        <div className="buttons">
          <Button variant="contained" onClick={handleUpload} >Upload</Button>
          <Button variant="contained" color="primary" onClick={save}>Save</Button>
        </div>
        <div className="preview">
          <canvas ref={canvasRef}></canvas>
        </div>
      </section>
    </>   
  );
}

export default App;
