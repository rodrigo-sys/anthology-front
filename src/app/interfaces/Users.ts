import { Role } from "./enums";
export interface User{
    id:number
    username:string;
    email:string;
    password:string

}


export interface UserRequest{
    username:string;
    email:string;
    password:string

}
export interface UserUpdateRequest{
     username:string;
    email:string;
    password:string
}

export interface UserResponse{
    id:number;
    username:string;
    email:string;
    role:Role;
    password:string

}

