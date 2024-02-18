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
insertButton === null || insertButton === void 0 ? void 0 : insertButton.addEventListener('click', (event) => {
    event.preventDefault();
    uploadFileInput === null || uploadFileInput === void 0 ? void 0 : uploadFileInput.click();
    uploadFileInput === null || uploadFileInput === void 0 ? void 0 : uploadFileInput.addEventListener('input', () => {
        const wrapperClass = document.getElementById('wrapper');
        const uploadButton = document.createElement('button');
        uploadButton.classList.add(...'flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'.split(' '));
        uploadButton.innerText = 'Upload';
        uploadButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!uploadFileInput.files) {
                    //Notify user that an error happened.
                    return;
                }
                const fileBufferArray = yield uploadFileInput.files[0].arrayBuffer();
                const fileBlob = new Blob([fileBufferArray]);
                console.log(fileBlob.arrayBuffer());
                const formData = new FormData();
                formData.append('File', fileBlob);
                const res = yield fetch('http://localhost:3001/file/up_file', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'content-type': 'form-data'
                    }
                });
                console.log(res);
            }
            catch (error) {
                console.log('Error happened.', error);
            }
        }));
        wrapperClass === null || wrapperClass === void 0 ? void 0 : wrapperClass.appendChild(uploadButton);
    });
});
