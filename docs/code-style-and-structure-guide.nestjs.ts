/**
 *  @description
 *  The following is intended to be a documentation of the style and structure I like to follow
 *  when writing Nest.js applications. Comments are for guideance only, they are not expected.
 */

//* Controller and Service Imports */
//* Nest imports */
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation } from "@nestjs/swagger";
//* 3rd party imports */
import { Repository } from "typeorm";
//* Project Service imports */
import { LocationService } from "./location.service";
//* Project Model imports */
import { CreateLocationDTO } from "../models/location.model";
//* Project Entity imports */
import { Location } from "./location.entity";

//* Controllers */
@Controller("locations")
export class LocationController {
    //* Member Variables */

    //* Constructors */
    constructor(private locationService: LocationService) {}

    //* Group by endpoint then REST method */
    @Get()
    @ApiOperation({
        summary: "Get all locations",
        description:
            "This endpoint returns an array containing all map locations.",
    })
    getAllLocations() {
        return this.locationService.getLocations();
    }

    @Post()
    @ApiOperation({
        summary: "Create a new Location",
        description:
            "This endpoint creates a new map location and returns an array containing all map locations.",
    })
    @ApiBody({ type: CreateLocationDTO })
    addNewLocation(@Body() location: Location): Promise<Location> {
        // returns a list of all locations
        return this.locationService.addNewLocation(location);
    }

    @Get("/:locationId")
    @ApiOperation({
        summary: "Get location by id",
        description: "This endpoint returns an location by id.",
    })
    getLocationById(@Param("locationId") locationId: string) {
        return this.locationService.getLocationById(locationId);
    }
}

//* Services */
@Injectable()
export class LocationService {
    //* Member Variables */

    //* Constructors */
    constructor(
        @InjectRepository(Location)
        private locationRepository: Repository<Location>
    ) {}

    //* Public Functions */
    getLocations(): Promise<Location[]> {
        return this.locationRepository.find();
    }

    getLocationById(id: string): Promise<any> {
        return this.locationRepository.findOneBy({ id });
    }

    async findOrCreate(
        lat: number,
        lng: number,
        name: string
    ): Promise<Location> {
        const location: Location = await this.locationRepository.findOneBy({
            lat,
            lng,
        });
        if (!location) {
            const newLocation: Location = {
                id: crypto.randomUUID(),
                name: name,
                lat: lat,
                lng: lng,
            };
            return this.addNewLocation(newLocation);
        } else return location;
    }

    async addNewLocation(location: CreateLocationDTO): Promise<Location> {
        const newLocation = await this.locationRepository.save(location);
        return newLocation;
    }
    //* Private Functions */

    //* Cleanup Functions */

    //* Private Utility Functions */
}
