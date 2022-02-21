import * as utl from './js/util.js';
import * as pm from './js/placemark.js';
import * as tpl from './js/template.js';

const ymaps = window.ymaps;

let map;
let cluster;

function init() {
  map = new ymaps.Map('map', {
    center: [55.76, 37.64],
    behaviors: ['dblclickzoom', 'drag'],
    zoom: 11,
  });
  map.events.add('balloonopen', (e) => {
    balloonOpenHandler(e.originalEvent.currentTarget.balloon._balloon._position);
  });
  map.events.add('click', (e) => {
    const coords = e.get('coords');
    map.balloon.open(coords, {
      content: tpl.templateForm,
    });
  });

  const clusterLayout = ymaps.templateLayoutFactory.createClass(
    tpl.templateClusterLayout
  );
  cluster = new ymaps.Clusterer({
    gridSize: 100,
    clusterDisableClickZoom: true,
    clusterOpenBalloonOnClick: true,
    clusterBalloonContentLayout: 'cluster#balloonCarousel',
    clusterBalloonItemContentLayout: clusterLayout,
    clusterBalloonPanelMaxMapArea: 0,
    clusterBalloonContentLayoutWidth: 200,
    clusterBalloonContentLayoutHeight: 130,
    clusterBalloonPagerSize: 3,
  });
  map.geoObjects.add(cluster);
  pm.setExistingPlacemarks(cluster, balloonOpenHandler);
}

function balloonOpenHandler(coords) {
  const form = document.querySelector('.review');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const reviewData = utl.getFormInput(form);
    if (!reviewData) return;

    utl.saveData(coords, reviewData);

    let placemark = pm.findPlacemark(coords, cluster);
    if (!placemark) {
      placemark = pm.createPlacemark(coords, cluster, balloonOpenHandler);
    }
    pm.updatePlacemarkContent(placemark);
    map.balloon.close();
  });
}

ymaps.ready(init);
