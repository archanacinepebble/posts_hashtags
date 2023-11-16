import { Body, Controller, Get, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {Response} from "express";
import  * as path from "path";

interface FileParams {
  fileName : string;
}

@Controller()
export class AppController {

  @Get()
  getHello(): string {
    return "Hello World";
  }


  @Post("/upload")
  @UseInterceptors(FileInterceptor('file' , {
    storage : diskStorage({
      destination : "./uploads",
      filename : (res, file, cb) => {
        cb(null , `${file.originalname}`)
      }
    })
  }))

  
  async uploadFile() {
   // console.log(file);
    return "success";
  }


//  To Serve Hashtags

  @Get("/getFile")
  getFHashTags(@Res() res : Response , @Body() file : FileParams)
  {
    res.sendFile(path.join(__dirname , "../uploads/" + file.fileName));
  }

  @Post("/upload_hash")
  @UseInterceptors(FileInterceptor('hash' , {
    storage : diskStorage({
      destination : "./uploads_hashtags",
      filename : (res, hash, cb) => {
        cb(null , `${hash.originalname}`)
      }
    })
  }))

  
  async uploadHashTags() {
   // console.log(file);
    return "success";
  }


//  To Serve File
  @Get("/getFileHash")
  getFile(@Res() res : Response , @Body() hash : FileParams)
  {
    res.sendFile(path.join(__dirname , "../uploads_hashtags/" + hash.fileName));
  }

}
