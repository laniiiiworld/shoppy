export async function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: 'POST',
    body: data,
  })
    .then((response) => response.text())
    .then((data) => JSON.parse(data).url);
}
