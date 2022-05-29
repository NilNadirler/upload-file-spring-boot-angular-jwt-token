import { Byte } from "@angular/compiler/src/util"

export interface File{

    id:number
    name:string
    extension:string
    path:string
    data:Byte[]
}