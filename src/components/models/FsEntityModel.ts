




type FsEntityModel = {
  name: string,
  shared: boolean,
  abs_path: string,
  base_type: "folder" | "file",
  size_in_mb: number | undefined,
  mime_type: string | undefined,
}




export default FsEntityModel