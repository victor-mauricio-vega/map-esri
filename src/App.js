import React, { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Graphic from '@arcgis/core/Graphic';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import '@arcgis/core/assets/esri/themes/light/main.css';

const Map = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    const webMap = new WebMap({
      basemap: 'streets-navigation-vector'
    });

    const view = new MapView({
      container: mapDiv.current,
      map: webMap,
      center: [-74.0486, 4.6745],
      zoom: 15
    });

    const basemapGallery = new BasemapGallery({
      view: view
    });

    view.ui.add(basemapGallery, 'top-right');

    // Point que indica la posicion
    const point = { 
      type: "point",
      longitude: -74.0486,
      latitude: 4.6745
    };

    // simbolo de referencia
    const markerSymbol = {
      type: "simple-marker",
      color: [246, 6, 6], 
      outline: {
        color: [255, 255, 255], 
      }
    };

    // cuadro que indica la empresa mas una breve descripción
    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol,
      attributes: {
        Name: "ESRI Colombia"
      },
      popupTemplate: {
        title: "{Name}",
        content: "Ubicación del edificio de ESRI Colombia en el Chicó."
      }
    });

    // se añande simbolo 
    view.graphics.add(pointGraphic); 

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return (
    <div style={{ height: '80vh', width: '80vw',}} ref={mapDiv}></div>
  );
};

const App = () => {
  return (
    <div>
      <h1>Mapa de Bogotá D.C</h1>
      <Map/>
    </div>
  );
};

export default App;
