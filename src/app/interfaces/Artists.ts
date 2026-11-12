export interface Artist{
    id:number
    userId:number
    stageName:string
    biography:string
    instagram:string
    spotify:string
    youtube:string

}

export interface ArtistRequest{
    userId:number
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
