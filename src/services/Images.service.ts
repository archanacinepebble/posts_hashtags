import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppDataSource } from 'src/utilites/DataSource';
import { Images } from 'src/entities/Images';
import { CreateImagesParams, UpdateImagesParams } from 'src/utilites/types';
import { Connection } from 'mysql'
import { FilterDto } from 'src/dtos/filter.dto';
@Injectable()
export class ImagesService {

    resultPerPage = 1;

    constructor(@InjectRepository(Images) private imagesRepository: Repository<Images>,
    @InjectConnection() private readonly connection: Connection
    ){}


    findImages()
    {
        return this.imagesRepository.find();
    }


    createImages(imagesDetails: CreateImagesParams) 
    {
        const newImage = this.imagesRepository.create({ ...imagesDetails, createdAt: new Date()});
        return this.imagesRepository.save(newImage);
    }


    updateImage(id: number, updateImageDetails: UpdateImagesParams) 
    {
     return this.imagesRepository.update({ id }, {...updateImageDetails});
    }


     deleteImage(id: number)
    {
    return this.imagesRepository.delete(id);
    }


     findUsersByRawQuery() 
    {
     return this.connection.query('SELECT * FROM image_paths;');
    }


    findImagessByPaginationsUsingDataSource(filterDto: FilterDto) 
    {
        let query = 'SELECT * FROM image_paths';
        query += " ORDER BY createdAt "+filterDto.order+" LIMIT "+filterDto.offset+","+filterDto.limit;
        return AppDataSource.query(query);
    }


     findImagesByPaginationsUsingDataSource(filterDto: FilterDto) 
    {
         let query = 'SELECT * FROM image_paths';
        query += " ORDER BY createdAt "+filterDto.order+" LIMIT "+filterDto.offset+","+filterDto.limit;
       return AppDataSource.query(query);
    }
}
