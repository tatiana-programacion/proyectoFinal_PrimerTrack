import './AdminImages.scss';
import imageAdd from "../../img/add.svg"
import imageRemove from "../../img/remove.svg"
import { useState } from 'react';

const AdminImages = (props) => {
    const [newUrl, setNewUrl] = useState("");
    const [urls, setUrls] = useState([]);
    const [urlError, setUrlError] = useState(false);

    const handleAddUrl = (e) => {
        e.preventDefault();
        if(isValidUrl(newUrl)){
            setUrls([ newUrl, ...urls])
            props.onSelectImagenes([ newUrl, ...urls]);
            setNewUrl("");
            setUrlError(false);
        }else{
            setUrlError(true);
        }
    }

    const handleRemoveUrl = (e) => {
        e.preventDefault();
        setUrls(urls.filter(item => item !== e.target.name))
    }

    const isValidUrl = urlString => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ 
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ 
      '(\\#[-a-z\\d_]*)?$','i'); 
        return !!urlPattern.test(urlString);
  }

    return(
        <div className="admin-images">
            <h2>Cargar imágenes</h2>
            <div>
                <input type="text" placeholder='Insertar https://' value={newUrl} onChange={e => setNewUrl(e.target.value)}/>
                <button onClick={handleAddUrl}><img src={imageAdd} alt="addImage"/></button>
            </div>
            {
                urlError && 
                <div className="error">
                    <p>Por favor introduzca una url válida</p>
                </div>
            }
            {
                urls.map((url, index) => {
                    return <div key={index}>
                        <input type="text" placeholder='Insertar https://' value={url} disabled/>
                        <button onClick={handleRemoveUrl}><img src={imageRemove} name={url} value={url} alt="removeImage"/></button>
                    </div>
                })
            }
            {
                props.errorImagenes && 
                <div className="error">
                    <p>{props.errorImagenes}</p>
                </div>
            }
        </div>
    )
}

export default AdminImages;