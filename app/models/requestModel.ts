import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class RequestModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    constructor(id: number, userId: number, latitude: number, longitude: number) {
        this.id = id;
        this.userId = userId;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default RequestModel;
