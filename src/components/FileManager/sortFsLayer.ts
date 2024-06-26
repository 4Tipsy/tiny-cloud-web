


// modules
import FsEntityModel from "../models/FsEntityModel"
import { SortByType } from "./FileManager"


function sortFsLayer(foldersFirst: boolean, sortBy: SortByType, fsLayer: FsEntityModel[]): FsEntityModel[] {

  if (sortBy === "type") {
    const folders = fsLayer.filter(e => e.base_type === 'folder')
    const files = fsLayer.filter(e => e.base_type === 'file')

    files.sort((a, b) => a.mime_type!.localeCompare(b.mime_type!))
    fsLayer = [...folders, ...files]
  }

  if (sortBy === "name") {
    fsLayer.sort((a, b) => a.name.localeCompare(b.name))
  }

  if (sortBy === "smaller") {
    const folders = fsLayer.filter(e => e.base_type === 'folder')
    const files = fsLayer.filter(e => e.base_type === 'file')

    files.sort((a, b) => a.size_in_mb! - b.size_in_mb!)
    fsLayer = [...folders, ...files]
  }

  if (sortBy === "bigger") {
    const folders = fsLayer.filter(e => e.base_type === 'folder')
    const files = fsLayer.filter(e => e.base_type === 'file')

    files.sort((a, b) => b.size_in_mb! - a.size_in_mb!)
    fsLayer = [...folders, ...files]
  }



  if (foldersFirst) {
    fsLayer.sort((a, b) => {
      if (a.base_type === "folder" && b.base_type === "file") {
        return -1
      }
      if (a.base_type === "file" && b.base_type === "folder") {
        return 1
      }
      return 0
    })
  }



  return fsLayer

}



export default sortFsLayer