import { BookingMapper } from "./booking_mapper";
import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";

describe("Teste de booking", () => {
  it("deve converter BookingEntity em Booking corretamente", () => {
    const bookingEntity: BookingEntity = {
      id: "1",
      property: {
        id: "prop-1",
        name: "Casa Bonita",
        description: "Uma casa bonita para alugar",
        maxGuests: 4,
        basePricePerNight: 100,
        bookings: [],
      } as PropertyEntity,
      guest: {
        id: "user-123",
        name: "Maria",
      } as UserEntity,
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-01-20"),
      guestCount: 2,
      totalPrice: 500,
      status: "CONFIRMED",
    };

    const booking = BookingMapper.toDomain(bookingEntity);

    expect(booking).toBeInstanceOf(Booking);
    expect(booking.getId()).toBe("1");
    expect(booking.getProperty().getId()).toBe("prop-1");
    expect(booking.getGuest().getId()).toBe("user-123");
    expect(booking.getDateRange().getStartDate()).toEqual(new Date("2024-01-15"));
    expect(booking.getDateRange().getEndDate()).toEqual(new Date("2024-01-20"));
    expect(booking.getGuestCount()).toBe(2);
    expect(booking.getTotalPrice()).toBe(500);
    expect(booking.getStatus()).toBe("CONFIRMED");
  });

  it("deve lançar erro ao faltar campos obrigatórios no BookingEntity", () => {
    const invalidBookingEntity = {
      id: "1",
    } as BookingEntity;

    expect(() => BookingMapper.toDomain(invalidBookingEntity)).toThrow();
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const property = new Property(
      "prop-1",
      "Casa Bonita",
      "Uma casa bonita para alugar",
      4,
      100
    );
    const user = new User("user-123", "Maria");
    const dateRange = new DateRange(
      new Date("2024-01-15"),
      new Date("2024-01-20")
    );
    const booking = new Booking("1", property, user, dateRange, 2);

    const bookingEntity = BookingMapper.toPersistence(booking);

    expect(bookingEntity.id).toBe("1");
    expect(bookingEntity.property.id).toBe("prop-1");
    expect(bookingEntity.guest.id).toBe("user-123");
    expect(bookingEntity.startDate).toEqual(new Date("2024-01-15"));
    expect(bookingEntity.endDate).toEqual(new Date("2024-01-20"));
    expect(bookingEntity.guestCount).toBe(2);
    expect(bookingEntity.totalPrice).toBe(500);
    expect(bookingEntity.status).toBe("CONFIRMED");
  });
});