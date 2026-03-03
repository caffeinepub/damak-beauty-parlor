import Text "mo:core/Text";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";



actor {
  type Booking = {
    id : Nat;
    name : Text;
    phone : Text;
    service : Text;
    message : Text;
  };

  type Contact = {
    id : Nat;
    name : Text;
    phone : Text;
    message : Text;
  };

  type Feedback = {
    id : Nat;
    name : Text;
    service : Text;
    rating : Nat; // 1-5
    comment : Text;
  };

  var nextBookingId = 1;
  var nextContactId = 1;
  var nextFeedbackId = 1;

  let bookings = Map.empty<Nat, Booking>();
  let contacts = Map.empty<Nat, Contact>();
  let feedbackMap = Map.empty<Nat, Feedback>();

  public shared ({ caller }) func bookAppointment(name : Text, phone : Text, service : Text, message : Text) : async Nat {
    let booking : Booking = {
      id = nextBookingId;
      name;
      phone;
      service;
      message;
    };

    bookings.add(nextBookingId, booking);
    nextBookingId += 1;
    booking.id;
  };

  public shared ({ caller }) func submitContactForm(name : Text, phone : Text, message : Text) : async Nat {
    let contact : Contact = {
      id = nextContactId;
      name;
      phone;
      message;
    };

    contacts.add(nextContactId, contact);
    nextContactId += 1;
    contact.id;
  };

  public shared ({ caller }) func submitFeedback(name : Text, service : Text, rating : Nat, comment : Text) : async Nat {
    let clampedRating = if (rating < 1) {
      1;
    } else if (rating > 5) {
      5;
    } else {
      rating;
    };

    let feedback : Feedback = {
      id = nextFeedbackId;
      name;
      service;
      rating = clampedRating;
      comment;
    };

    feedbackMap.add(nextFeedbackId, feedback);
    nextFeedbackId += 1;
    feedback.id;
  };

  public query ({ caller }) func getBooking(id : Nat) : async Booking {
    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking not found") };
      case (?booking) { booking };
    };
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray();
  };

  public query ({ caller }) func getContact(id : Nat) : async Contact {
    switch (contacts.get(id)) {
      case (null) { Runtime.trap("Contact not found") };
      case (?contact) { contact };
    };
  };

  public query ({ caller }) func getAllContacts() : async [Contact] {
    contacts.values().toArray();
  };

  public query ({ caller }) func getAllFeedback() : async [Feedback] {
    feedbackMap.values().toArray();
  };

  public query ({ caller }) func getFeedbackById(id : Nat) : async ?Feedback {
    feedbackMap.get(id);
  };
};
