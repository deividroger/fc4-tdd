import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";
import { CreatePropertyDTO } from "../dtos/create_property_dto";
import { v4 as uuid } from "uuid";

export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) {}

  async findPropertyById(id: string): Promise<Property | null> {
    return this.propertyRepository.findById(id);
  }
  async createProperty(dto:CreatePropertyDTO): Promise<Property> {
    const property = new Property(
      uuid(), 
      dto.name,
      dto.description,
      dto.maxGuests,
      dto.basePricePerNight
    );
    await this.propertyRepository.save(property);
    return property;
  }
}
