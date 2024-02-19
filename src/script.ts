const insertButton = document.getElementById(
  'insert-button'
) as HTMLButtonElement
const uploadFileInput = document.getElementById(
  'upload-file-input'
) as HTMLInputElement

const uploadButtonClickHandler = async (
  inputElement: HTMLInputElement,
  button: HTMLButtonElement
) => {
  try {
    if (!inputElement.files) {
      console.log('Input is empty.')
      return
    }
    const formData = new FormData()
    formData.append('File', inputElement.files[0])
    const res = await fetch('http://localhost:3001/file/up_file', {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })
    if (res.status === 200) {
      console.log('File uploaded successfully')
      button.disabled = true
      //TODO:Toast success.
    }
  } catch (error) {
    console.log('File upload failed.')
    //TODO:Toast failure.
  }
}

const createUploadButton = (
  wrapperElement: HTMLElement,
  inputElement: HTMLInputElement
) => {
  const uploadButton = document.createElement('button')
  uploadButton.classList.add(
    ...'flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'.split(
      ' '
    )
  )
  uploadButton.innerText = 'Upload'
  uploadButton.id = 'upload-button'
  uploadButton.addEventListener('click', () => {
    uploadButtonClickHandler(inputElement, uploadButton)
  })
  console.log('Event listener added.')
  wrapperElement?.appendChild(uploadButton)
  console.log('upload button created.')
}

const removeUploadButton = (
  wrapperElement: HTMLElement,
  uploadButton: HTMLButtonElement,
  eventListener: EventListenerOrEventListenerObject
) => {
  uploadButton.removeEventListener('click', () => eventListener)
  console.log('Listener removed.')
  wrapperElement.removeChild(uploadButton)
  console.log('Button Removed.')
}

insertButton.addEventListener('click', (event) => {
  event.preventDefault()
  uploadFileInput.click()
  uploadFileInput.addEventListener('input', () => {
    const wrapper = document.getElementById('wrapper')
    const inputField = document.getElementById(
      'input-field'
    ) as HTMLInputElement
    inputField.value = uploadFileInput.value
    if (!wrapper) return
    if (!document.getElementById('upload-button')) {
      createUploadButton(wrapper, uploadFileInput)
    } else {
      const uploadButton = document.getElementById(
        'upload-button'
      ) as HTMLButtonElement
      removeUploadButton(wrapper, uploadButton, () =>
        uploadButtonClickHandler(uploadFileInput, uploadButton)
      )
      createUploadButton(wrapper, uploadFileInput)
    }
  })
})
