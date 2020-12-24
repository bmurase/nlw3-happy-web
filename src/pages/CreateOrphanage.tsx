import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';

import '../styles/pages/create-orphanage.css';

import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

const CreateOrphanage: React.FC = () => {
  const { push } = useHistory();
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(true);

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setPosition(position.coords);
    })
  }, []);

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();
    
    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', openingHours);
    data.append('open_on_weekends', String(openOnWeekends));
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));

    images.forEach(image => {
      data.append('images', image)
    });

    await api.post('orphanages', data);

    alert('Cadastro realizado com sucesso!');
    push('/app');
  }, [
    name, 
    about, 
    instructions, 
    openingHours, 
    openOnWeekends, 
    position,
    images,
    push,
  ]);

  const handleSelectImages = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }, []);

  const Markers = () => {
    useMapEvents({
      click(e) {
        setPosition({ latitude: e.latlng.lat, longitude: e.latlng.lng });
      }
    })

    return (
      <Marker interactive={false} icon={mapIcon} position={[ position.latitude, position.longitude ]}/>
    )
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-23.4090972,-51.9474355]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              
              <Markers />
              {/* <Marker interactive={false} icon={mapIcon} position={[-23.4090972,-51.9474355]} /> */}
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="about" 
                maxLength={300} 
                value={about} 
                onChange={event => setAbout(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name}/>
                  )
                })}

                <label className="new-image" htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input 
                multiple 
                onChange={handleSelectImages} 
                type="file" 
                id="image[]" 
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions" 
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input 
                id="opening_hours"
                value={openingHours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende aos fins de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={openOnWeekends ? 'active' : ''} 
                  onClick={() => setOpenOnWeekends(true)}>
                    Sim
                </button>

                <button 
                  type="button" 
                  className={openOnWeekends ? '' : 'active'} 
                  onClick={() => setOpenOnWeekends(false)}>
                    Não
                </button>
              </div>
            </div>
          </fieldset>

          <button type="submit" className="confirm-button">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateOrphanage;