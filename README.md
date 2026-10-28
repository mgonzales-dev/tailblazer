
# Assignment 4: TailBlazer — Lost Animal Reporting System

For this assignment, I built a website using React, CSS, and Bootstrap to create a reporting system in which users can submit lost animal reports and view animals using an interactive map or gallery. The map is rendered using Leaflet with markers showing lost animals.

Users are able to submit animal reports using a form to fill out information. Form verification is used for all fields except pictures and descriptions. Users can upload an image and, using ImgBB API, the image is hosted and an URL is returned to display it after submission. A Leaflet map is used to let user select the last known location. The coordinates are then reverse-geocoded using Nonimatim API and a readable address is displayed back.

JSONBin API is used to host all submitted reports. On the home page, the Leaflet map is populated with markers for lost animals. Clicking on the markers shows a popup with some details and a view more button that will open a details modal. The gallery is an optional view for the map and clicking on the cards opens the same details modal. The details modal shows the picture of the animal (a placeholder image is used when no image was uploaded), details, and a Leaflet map with a marker for the last known location. A button for marking the animal as "found" will prompt the user to input the password they provided to prove ownership. 
## Features
- Interactive map using Leaflet
  - Clickable markers open detailed popups with report information
- Create reports
  - Upload animal image with live preview
  - Select last seen location directly on the map
  - Reverse geocoding using Nonimatim to display readable address
  - Form validation
- Report browsing and filtering
  - Filter reports by status
  - Filter reports by animal type
  - Responsive card-based gallery view
- Details modal
  - Image, key details, and contact information
  - Embedded map showing last known location
  - Password-protected "Mark as found" functionality
- Image hosting and data persistence
  - Images uploaded via ImgBB
  - Report data stored using JSONBin
  - Async/await used for all API interactions
- UI built React Bootstrap and CSS
- Custom Logo
## Usage

After extracting, there is a provided `.env_example` with the following:
```
VITE_JSONBIN_BIN_ID=
VITE_JSONBIN_API_KEY=
VITE_IMGBB_API_KEY=
```
Create an account on [ImgBB](https://imgbb.com/) and create an API key. Then create a [JSONBin.io](https://jsonbin.io) account, create an API key and a new bin with a blank reports JSON:
```
{
    "reports": []
}
```
 Copy and paste the API keys and bin id into the provided `.env_example` and rename to `.env`.
```
VITE_JSONBIN_BIN_ID= your JSONBin API key
VITE_JSONBIN_API_KEY= your JSONBin bin ID
VITE_IMGBB_API_KEY= your ImgBB API key
```
After that just run: 
```
npm install
npm run dev
```
And let's find those animals!
## Unimplemented Features

Passwords are currently stored as plain text and not hashed.


## Citations

Code Snippets:
- React: https://react.dev/
- React Bootstrap: https://react-bootstrap.github.io/docs/
- Leaflet:
  - https://react-leaflet.js.org/docs/
  - https://leafletjs.com/reference-2.0.0.html
- Regex Generator: https://regex-generator.olafneumann.org
- Class demos:
  - https://www.youtube.com/playlist?list=PLg7lel5LdVjzKYyjdlLqoqomDCwP3pmWU
  - https://github.com/bobbychansfu/cmpt272_code

 APIs:
- JSONBin: https://jsonbin.io
- ImgBB: https://imgbb.com/
- Nominatim: https://nominatim.org/

README Editor:
  - https://readme.so/editor