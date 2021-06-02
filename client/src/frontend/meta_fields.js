import React, { useEffect, useState } from 'react';
// import ReactCountryFlag from "react-country-flag";
import call from './service';           //here you can use axios
import FilePreview from './previewFile';
import toastDisplay from './toastNotification';
import validate from './main.js';
import axios from 'axios';

const docsFormArray = [
  { "key": "document", "name": "Document", "dbId": ":2:1" },
]

const ShareHolderDetails = () => {
  //---------------------------------------------------------------------------------------------------------------------
  // States and variables
  const [modalStatus, setmodalStatus] = useState(true);
  const [showLoader, setshowLoader] = useState(false);
  const [refresh, setrefresh] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});
  // const [countryData, setcountryData] = useState([]);
  const [showPreviewModal, setshowPreviewModal] = useState(false);
  const [fileData, setfileData] = useState({});
  const [values, setValues] = useState({});

  // const userId =user_id
  // const userEmail = email
  // const userTypeId = type_id

  const astrix = <span className="required-field text-danger">*</span>

  //---------------------------------------------------------------------------------------------------------------------


  //---------------------------------------------------------------------------------------------------------------------
  // UseEffects
  // useEffect(() => {
  //   call('get', 'getallCountry').then((result) => {
  //     setcountryData(result)
  //   }).catch((e) => {
  //     console.log('error in getallCountry', e);
  //   });
  // }, []);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmitting) {
      handleSubmit();
    } else if (isSubmitting) {
      setIsSubmitting(false)
      toastDisplay("Form Validation Error", "warn")
    }
  }, [error]);


  //---------------------------------------------------------------------------------------------------------------------


  //---------------------------------------------------------------------------------------------------------------------
  // Functions
  const handleFile = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.files[0] }));
    setError(error => ({ ...error, [event.target.name]: "" }))
  }

  const handleChange = (event) => {
    event.persist();
    setValues({ ...values, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: "" });
  };

  const preHandleSubmit = (event) => {
    if (event) event.preventDefault();
    setError(validate(values));
    setIsSubmitting(true);
  };

  function handleSubmit(type) {
    setshowLoader(true)

    let formData = new FormData();
    // values.userId = userId
    // values.userEmail = userEmail
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });


    // componentDidMount =() =>{
    //   axios.post("").then(response =>{
    //     console.log(response)
    //   });
    // };

    // axios({
    //   url: '',
    //   method: 'POST',
    //   data: payload
    // });
    //   .then(() => {
    //     console.log('data sent');
    //   })
    //   .catch(()=> {
    //     console.log('internal server error');
    //   });;

    call('POST', 'userdocument', formData).then((result) => {
      console.log('post request result:', result);
      toastDisplay(result, "success");
      setshowLoader(false)
      setrefresh(refresh + 1)
    }).catch(err => {
      setshowLoader(false)
      console.log("conn:", err)
      toastDisplay(err, "error");
    })
  }

  //---------------------------------------------------------------------------------------------------------------------


  //---------------------------------------------------------------------------------------------------------------------
  // JSX Return
  return (
    <>
      {showLoader }
      { modalStatus ?
        <div className="accordionWrapper row pr-0 pt-0">
          <div className="container-fluid accordionItem open">
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="green mt-3">
                      Upload Document
                      <button type="button" onClick={() => setmodalStatus(false)} className="close pt-0 mb-4" data-dismiss="modal" >
                        <i class="fas fa-times fa-sm text-danger "></i>
                      </button>
                    </h3>
                    <hr />
                  </div>
                  <div className="col-md-12">
                    <div className="row pt-2">

                      <div className="form-group col-md-1">
                        <label>Remark {astrix} </label>
                        <input type="text" className={" form-control" + (!error.name ? '' : ' border-danger')} placeholder="" name="name" value={values.name} onChange={handleChange} />
                        {error.name && <p className="text-danger error-contract">{error.name}</p>}
                      </div>

                      <div className="col-md-12">
                        {docsFormArray.map((item) => {
                          return (<>
                            <div className="form-group pb-0 mb-0" id={item.key}>
                              <div className="other-documents pb-0 mb-0">
                                {/* <div style={{ "min-width": "300px" }}>
                                  <label className="mb-0" >
                                    <span className="file-icon"></span>
                                    {item.name}
                                  </label>
                                </div> */}
                                <div className="text-center pr-0" style={{ "min-width": "200px" }}>
                                  <div className="file-browse">
                                    {/* <button type="button" className="btn btn-primary btn-sm">Select Document</button> */}
                                    <input type="file" accept=".docx,.pdf" id="file_1" name={item.key} onChange={handleFile} />
                                    {error[item.key] && <p className="error-contract p-0 m-0">{error[item.key]}</p>}
                                  </div>
                                </div>
                                <div style={{ "min-width": "500px" }}>
                                  {(values[item.key]) ? <div className="filePath text-left"><div className="file-name">{`${values[item.key].name}`}</div></div> : ""}
                                </div>
                              </div>
                              <hr className="" />
                            </div>
                          </>)
                        })}
                      </div>

                      <div className="form-group col-md-12">
                        <button type="button" className="btn-primary btn mt-3 text-center btn-sm" onClick={() => preHandleSubmit()}>Submit</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> :
        <div className="accordionWrapper row pr-0 pt-0">
          <div className="container-fluid accordionItem open">
            <h3 className="green mt-3">
              Upload Document
              <button type="button" onClick={() => setmodalStatus(true)} className="close pt-0 mb-4" data-dismiss="modal" >
                <i class="fas fa-folder-open  fa-sm text-primary"></i>
              </button>
            </h3>
          </div>
        </div>}

      {showPreviewModal &&
        <FilePreview
          // userTokenDetails={userTokenDetails}
          fileData={fileData}
          showPreviewModal={showPreviewModal}
          setshowPreviewModal={setshowPreviewModal} />}
    </>)
}

export default ShareHolderDetails