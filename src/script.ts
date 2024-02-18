const insertButton = document.getElementById('insert-button')
const uploadFileInput = document.getElementById(
  'upload-file-input'
) as HTMLInputElement

insertButton?.addEventListener('click', (event) => {
  event.preventDefault()
  uploadFileInput?.click()
  uploadFileInput?.addEventListener('input', () => {
    const wrapperClass = document.getElementById('wrapper')
    const uploadButton = document.createElement('button')
    uploadButton.classList.add(
      ...'flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'.split(
        ' '
      )
    )

    uploadButton.innerText = 'Upload'
    uploadButton.addEventListener('click', async () => {
      try {
        if (!uploadFileInput.files) {
          //Notify user that an error happened.
          return
        }
        const fileBufferArray = await uploadFileInput.files[0].arrayBuffer()
        const fileBlob = new Blob([fileBufferArray])
        console.log(fileBlob.arrayBuffer())
        const formData = new FormData()
        formData.append('File', fileBlob)
        const res = await fetch('http://localhost:3001/file/up_file', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'content-type': 'form-data'
          }
        })
        console.log(res)
      } catch (error) {
        console.log('Error happened.', error)
      }
    })
    wrapperClass?.appendChild(uploadButton)
  })
})
