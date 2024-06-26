



const makeCreateFolderReq = async (newFolderName: string, fsPath: string, fileField: string): Promise<Response> => {


  const reqUrl = window.SERVER_RAW_URL + "/api/fs-service/create-folder"

  let absPath: string
  if (fsPath === "/") {
    absPath = "/" + newFolderName
  } else {
    absPath = fsPath + "/" + newFolderName
  }


  const fsEntity = {
    'name': newFolderName,
    'abs_path': absPath,
    'base_type': 'folder',
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



export default makeCreateFolderReq