"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const insertButton = document.getElementById('insert-button');
const uploadFileInput = document.getElementById('upload-file-input');
const uploadButtonClickHandler = (inputElement, button) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!inputElement.files) {
            console.log('Input is empty.');
            return;
        }
        const formData = new FormData();
        formData.append('File', inputElement.files[0]);
        const res = yield fetch('http://localhost:3001/file/up_file', {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
        if (res.status === 200) {
            console.log('File uploaded successfully');
            button.disabled = true;
            //TODO:Toast success.
        }
    }
    catch (error) {
        console.log('File upload failed.');
        //TODO:Toast failure.
    }
});
const createUploadButton = (wrapperElement, inputElement) => {
    const uploadButton = document.createElement('button');
    uploadButton.classList.add(...'flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'.split(' '));
    uploadButton.innerText = 'Upload';
    uploadButton.id = 'upload-button';
    uploadButton.addEventListener('click', () => {
        uploadButtonClickHandler(inputElement, uploadButton);
    });
    console.log('Event listener added.');
    wrapperElement === null || wrapperElement === void 0 ? void 0 : wrapperElement.appendChild(uploadButton);
    console.log('upload button created.');
};
const removeUploadButton = (wrapperElement, uploadButton, eventListener) => {
    uploadButton.removeEventListener('click', () => eventListener);
    console.log('Listener removed.');
    wrapperElement.removeChild(uploadButton);
    console.log('Button Removed.');
};
insertButton.addEventListener('click', (event) => {
    event.preventDefault();
    uploadFileInput.click();
    uploadFileInput.addEventListener('input', () => {
        const wrapper = document.getElementById('wrapper');
        const inputField = document.getElementById('input-field');
        inputField.value = uploadFileInput.value;
        if (!wrapper)
            return;
        if (!document.getElementById('upload-button')) {
            createUploadButton(wrapper, uploadFileInput);
        }
        else {
            const uploadButton = document.getElementById('upload-button');
            removeUploadButton(wrapper, uploadButton, () => uploadButtonClickHandler(uploadFileInput, uploadButton));
            createUploadButton(wrapper, uploadFileInput);
        }
    });
});
