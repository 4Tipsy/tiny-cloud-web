


const makeRenameReq = async (name: string, absPath: string, baseType: 'file'|'folder', fileField: string, newName: string): Promise<Response> => {

  const reqUrl = window.SERVER_RAW_URL + "/api/fs-service/rename-entity"


  const fsEntity = {
    'name': name,
    'abs_path': absPath,
    'base_type': baseType,
  }

  const reqBody = {
    'fs_entity': fsEntity,
    'new_name': newName,
    'file_field': fileField.toLocaleLowerCase(),
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



export default makeRenameReq