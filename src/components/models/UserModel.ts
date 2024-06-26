


export type UserModel = {
  verified: boolean,
  user_id: number,
  user_name: string,
  user_email: string,

  shared: UserModel_sharedFsElement[],

  used_space: number,
  available_space: number,
}


export type UserModel_sharedFsElement = {
  hashed_link: string,
  base_type: string,
  file_field: string,
  abs_path_to_entity: string,
}