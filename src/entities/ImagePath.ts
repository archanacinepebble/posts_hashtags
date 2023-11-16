import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'image_paths' })
export class ImagePath {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  file_path: string;

  @Column()
  HashTags: string;
}
