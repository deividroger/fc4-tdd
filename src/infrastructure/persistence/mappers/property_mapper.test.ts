
// it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity")

import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("Testes para property", ()=>{
  it("deve converter PropertyEntity em Property corretamente", ()=>{
    const propertyEntity = {
      id: "1",
      name: "Casa Bonita",
      description: "Uma casa bonita para alugar",
      maxGuests: 4,
      basePricePerNight: 150.00
    } as PropertyEntity;

    const propertyDomain = PropertyMapper.toDomain(propertyEntity);

    expect(propertyDomain.getId()).toBe(propertyEntity.id);
    expect(propertyDomain.getName()).toBe(propertyEntity.name);
    expect(propertyDomain.getDescription()).toBe(propertyEntity.description);
    expect(propertyDomain.getMaxGuests()).toBe(propertyEntity.maxGuests);
    expect(propertyDomain.getBasePricePerNight()).toBe(propertyEntity.basePricePerNight);
  });

  it("deve converter Property para PropertyEntity corretamente", ()=>{
    const propertyDomain = new Property(
      "1",
      "Casa Bonita",
      "Uma casa bonita para alugar",
      4,
      150.00
    );

    const propertyEntity = PropertyMapper.toPersistence(propertyDomain);

    expect(propertyEntity.id).toBe(propertyDomain.getId());
    expect(propertyEntity.name).toBe(propertyDomain.getName());
    expect(propertyEntity.description).toBe(propertyDomain.getDescription());
    expect(propertyEntity.maxGuests).toBe(propertyDomain.getMaxGuests());
    expect(propertyEntity.basePricePerNight).toBe(propertyDomain.getBasePricePerNight());
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", ()=>{
    const propertyEntity = {
      id: "1",
      name: "",
      description: "Uma casa bonita para alugar",
      maxGuests: 4,
      basePricePerNight: 150.00
    } as PropertyEntity;

    expect(() => {
      PropertyMapper.toDomain(propertyEntity);
    }).toThrowError("O nome é obrigatório");
  });
});