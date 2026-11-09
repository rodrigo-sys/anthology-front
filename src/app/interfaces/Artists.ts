export interface Artist{
    id:number
    idUser:number
    stageName:string
    biography:string
    instagram:string
    spotify:string
    youtube:string 

}

export interface ArtistRequest{
     idUser:number
    stageName:string
    biography:string
    instagram:string
    spotify:string
    youtube:string 
    
}
export interface ArtistUpdateRequest{
     biography:string
    instagram:string
    spotify:string
    youtube:string 
}
export interface ArtistResponse{
      id:number
    stageName:string
    biography:string
    instagram:string
    spotify:string
    youtube:string 
}