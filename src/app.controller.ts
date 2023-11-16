import { Body, Controller, Get, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "node_modules/multer";
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
      filename : (req , file , cb) => {
        cb(null , `${file.originalname}`)
      }
    })
  }))

  
  async uploadFile() {
   // console.log(file);
    return "success";
  }


//  To Serve File
  @Get("/getFile")
  getFile(@Res() res : Response , @Body() file : FileParams)
  {
    res.sendFile(path.join(__dirname , "../uploads/" + file.fileName));
  }

}
