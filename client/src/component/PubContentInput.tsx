import { useState } from 'react';
import { uploadData } from '../utils/fetchAPIData';
import { useNavigate } from 'react-router-dom';
import './app.css'
function PubContentInput() {
  const [textArea, setTextArea] = useState({
    uploadType: '',
    textData: '',
  });
  const navigate = useNavigate();
  async function handleBtnClick(e: any) {
    e.preventDefault();
    //send data for the submission.
    const userAddrs = sessionStorage.getItem('usrAddr') as string;
    const result = await uploadData(userAddrs, textArea.textData);
    console.log(result);
    setTextArea({
      uploadType: '',
      textData: '',
    });
    navigate('/');
  }
  return (
    <>
      <div className='page'>
        <div className='pub-input'>
          <div>
            <div>
              {/* <h3 ="text-lg font-medium leading-6 text-gray-900">Your Public Address</h3> */}
              <p style={{margin:'auto'}}>First slect from dropdown menu what you want to upload.</p>
            </div>
          </div>
          <div>
            <form action="#" method="POST">
              <div >
                <div>
                  <div >
                    <div>
                      <label htmlFor="content-type" >
                        Content Type
                      </label>
                      <br></br>
                      <select
                        id="content-type"
                        name="content-type"
                        // autoComplete="country-name"
                        value={textArea.uploadType}
                        onChange={(e) => setTextArea({ ...textArea, uploadType: e.target.value })}
                      >
                        <option>Text</option>
                        <option>Picture</option>
                        <option>Video</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="about" >
                      Text
                    </label>
                    <div >
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        value={textArea.textData}
                        onChange={(e) => setTextArea({ ...textArea, textData: e.target.value })}
                        placeholder="you@example.com"
                        defaultValue={''}
                      />
                    </div>
                    <p>Write a short paragraph.</p>
                  </div>
               

                  <div>
                    <label >Upload Picture</label>
                    <div >
                      <div >
                        <svg
                         
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                          className='img'
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div >
                          <label
                            htmlFor="file-upload"
                            
                          >
                            <span>Upload a file</span>
                            <br></br>
                            <input id="file-upload" name="file-upload" type="file"  />
                          </label>
                          <p >or drag and drop</p>
                        </div>
                        <p >PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div >
                  <button
                    type="submit"
                    onClick={handleBtnClick}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PubContentInput;
