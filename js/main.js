// Global Variables 
let width = 500;
let height = 0;
let filter = 'none';
let streaming = false;

// DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

// Get media stream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  })
  .then(stream => {
    // Link to the Video Source
    video.srcObject = stream;
    // Play Video
    video.play();
  })
  .catch(err => console.log(`Error: ${err}`));

// Play when ready
video.addEventListener('canplay', e => {
  if (!streaming) {
    // Set Video / canvas height
    height = video.videoHeight / (video.videoWidth / width);

    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    streaming = true;
  }
}, false);

// filter event
photoFilter.addEventListener('change', e => {
  // Set filter to chosen option
  filter = e.target.value;
  // Set filter to video 
  video.style.filter = filter;

  e.preventDefault;
}, false);

// Photo Button Event
photoButton.addEventListener('click', e => {
  takePicture();

  e.preventDefault();
}, false);

// Clear event
clearButton.addEventListener('click', e => {
  // Clear photos
  photos.innerHTML = '';
  // Change filter back to None
  filter = 'none';
  // Set Video filter
  video.style.filter = filter;
  // Reset select list
  photoFilter.selectedIndex = 0;
});

// Take picture from canvas
function takePicture() {
  // Create canvas
  const context = canvas.getContext('2d');
  if (width && height) {
    //set canvas props
    canvas.width = width;
    canvas.height = height;

    // Draw an Image of the Video on the canvas
    context.drawImage(video, 0, 0, width, height);

    // Creat an Image from the canvas
    const imgUrl = canvas.toDataURL('image/png');

    // Create img element
    const img = document.createElement('img');

    // Set img src
    img.setAttribute('src', imgUrl);

    // Set image to filter
    img.style.filter = filter;

    // Add image to photos
    photos.appendChild(img);
  }
}