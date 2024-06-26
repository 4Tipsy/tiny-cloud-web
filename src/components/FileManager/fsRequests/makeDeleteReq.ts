




const makeDeleteReq = async (name: string, absPath: string, baseType: ('folder'|'file'), fileField: string): Promise<Response> => {


  const reqUrl = window.SERVER_RAW_URL + "/api/fs-service/delete-entity"



  const fsEntity = {
    'name': name,
    'abs_path': absPath,
    'base_type': baseType,
  }

  const reqBody = {
    fs_entity: fsEntity,
    file_field: fileField.toLocaleLowerCase(),
  }

  const reqOptions: RequestInit = {
    method: "POST",
    body: JSON.stringify(reqBody),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }



  const res = await fetch(reqUrl, reqOptions)
  return res
}




export default makeDeleteReq