import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FileResponse } from 'src/app/models/fileResponse';
import { FileServiceService } from 'src/app/service/file-service.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  fileResponse:FileResponse[]=[]
 
  selectedFile:FormData;
  
  uploader:FileUploader = new FileUploader({})



  constructor(private fileService:FileServiceService) { 

    //  this.uploader.onCompleteItem=(item: any, response:any, status:any , headers:any)=>{
                        
    //   this.fileResponse.push(response);
    //  }

  }
   
  ngOnInit(): void {
    
  this.getImages();
  
   
  }

 
  getImages(){
    this.fileService.getAll().subscribe(response=> {
      this.fileResponse= response;
    });
  }

   
  onUploadFiles(data: any):void{
    let files = data.files;
   let formData = new FormData();
   Array.from(files).forEach(f => formData.append('file', (f as any), (f as any).name));
 
   this.fileService.upload(formData).subscribe(
    event => {
      console.log(event);
     
    },
    (errorResponse=>{
      alert(errorResponse.error.message);
    }
  ));
}



onFileSelected(event:any){


  const formData:FormData = new FormData();
  formData.append('file',event.target.files[0]);

  this.selectedFile= formData;
}

deleteFile(id:any){

  this.fileService.delete(id).subscribe(
    response=> {
      alert("deleted")
     this.getImages()
 
  }, errorResponse=>{
    alert("Could not deleted")

  })
}

onUpload() {

  console.log("uploading...");
  this.fileService.upload(this.selectedFile).subscribe(response=>   this.getImages());
}

downloadFile(id:string, name:string){

  this.fileService.download(id).subscribe(response=> {

    // var resp= response?.body;
    saveAs(response['body'], name);
    // saveAs(response.data)
  });
}
}  








