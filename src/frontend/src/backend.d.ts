import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    id: bigint;
    service: string;
    name: string;
    message: string;
    phone: string;
}
export interface Contact {
    id: bigint;
    name: string;
    message: string;
    phone: string;
}
export interface Feedback {
    id: bigint;
    service: string;
    name: string;
    comment: string;
    rating: bigint;
}
export interface backendInterface {
    bookAppointment(name: string, phone: string, service: string, message: string): Promise<bigint>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllContacts(): Promise<Array<Contact>>;
    getAllFeedback(): Promise<Array<Feedback>>;
    getBooking(id: bigint): Promise<Booking>;
    getContact(id: bigint): Promise<Contact>;
    getFeedbackById(id: bigint): Promise<Feedback | null>;
    submitContactForm(name: string, phone: string, message: string): Promise<bigint>;
    submitFeedback(name: string, service: string, rating: bigint, comment: string): Promise<bigint>;
}
