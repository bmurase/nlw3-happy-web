import L from 'leaflet';
import React from 'react';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { useHistory } from 'react-router-dom';
import mapMarkerImg from '../images/map-marker.svg';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
})

const CreateOrphanage: React.FC = () => {
  const { goBack } = useHistory();
  return (
    <div id="page-create-orphanage">
      <aside>
        <img src={mapMarkerImg} alt="Happy"/>

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>

      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-23.4090972,-51.9474355]}
              zoom={15}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              
              <Marker interactive={false} icon={happyMapIcon} position={[-23.4090972,-51.9474355]} />
            </MapContainer>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name"/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <button className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário</label>
              <input id="opening_hour"/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className="active">Sim</button>
                <button type="button">Não</button>
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