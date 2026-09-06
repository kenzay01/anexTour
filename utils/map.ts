export const OFFICE_COORDS = {
  lat: 50.50760087095094,
  lng: 30.498426694487343,
} as const;

/** Stable embed without Google Place Details (avoids "Не вдалося завантажити дані про місце") */
export const MAP_EMBED_URL =
  `https://yandex.ua/map-widget/v1/?ll=${OFFICE_COORDS.lng}%2C${OFFICE_COORDS.lat}&z=17&pt=${OFFICE_COORDS.lng},${OFFICE_COORDS.lat},pm2rdm&lang=uk_UA`;

export const GOOGLE_MAPS_LINK =
  `https://www.google.com/maps/search/?api=1&query=${OFFICE_COORDS.lat},${OFFICE_COORDS.lng}`;
