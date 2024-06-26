


const makeUploadFileReq = async (name: string, absPath: string, fileField: string, file: File): Promise<Response> => {


  const reqUrl = window.SERVER_RAW_URL + "/api/fs-service/upload-file"


  const fsEntity = {
    'name': name,
    'abs_path': absPath,
    'base_type': 'file',
  }

  const reqBody = {
    fs_entity: fsEntity,
    file_field: fileField.toLocaleLowerCase(),
  }


  const formData = new FormData()
  formData.append('request', JSON.stringify(reqBody) )
  formData.append('file', file)



  const reqOptions: RequestInit = {
    method: "POST",
    body: formData,
    credentials: "include",
  }



  
  const res = await fetch(reqUrl, reqOptions)
  return res
}




export default makeUploadFileReq