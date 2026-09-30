export declare const Role: {
    readonly STUDENT: "STUDENT";
    readonly TUTOR: "TUTOR";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly BLOCKED: "BLOCKED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const DayOfWeek: {
    readonly MON: "MON";
    readonly TUE: "TUE";
    readonly WED: "WED";
    readonly THU: "THU";
    readonly FRI: "FRI";
    readonly SAT: "SAT";
    readonly SUN: "SUN";
};
export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];
export declare const BookingStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type BookingStatus = (typeof BookingStatus)[keyof typeof BookingStatus];
//# sourceMappingURL=enums.d.ts.map