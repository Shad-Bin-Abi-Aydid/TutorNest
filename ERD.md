# tutorNest ERD

This file contains the Entity-Relationship Diagram for the tutorNest project. The app is built using the SkillBridge assignment requirements as a reference while using the tutorNest project name.

## ERD Diagram (Mermaid)

```mermaid
erDiagram
    User ||--o{ TutorProfile : "has (if role='tutor')"
    User ||--o{ Booking : "books_as_student"
    User ||--o{ Booking : "teaches_as_tutor"
    TutorProfile ||--o{ TutorCategory : "offers"
    TutorProfile ||--o{ Availability : "defines"
    Category ||--o{ TutorCategory : "belongs_to"
    Booking ||--o| Review : "has (after completion)"

    User {
        int id PK
        string email UK
        string password
        enum role "STUDENT|TUTOR|ADMIN"
        enum status "ACTIVE|BLOCKED"
        string name
        datetime created_at
    }

    TutorProfile {
        int id PK
        int user_id FK
        string image
        text bio
        int experience_years
        decimal price_per_hour
        datetime created_at
    }

    Category {
        int id PK
        string name UK
        datetime created_at
    }

    TutorCategory {
        int tutor_profile_id FK
        int category_id FK
        PK(tutor_profile_id, category_id)
    }

    Availability {
        int id PK
        int tutor_profile_id FK
        enum day_of_week "MON|TUE|WED|THU|FRI|SAT|SUN"
        time start_time
        time end_time
    }

    Booking {
        int id PK
        int student_id FK
        int tutor_id FK
        int category_id FK
        datetime scheduled_at
        int duration_minutes
        enum status "CONFIRMED|COMPLETED|CANCELLED"
        datetime created_at
    }

    Review {
        int id PK
        int booking_id FK
        int rating
        text comment
        datetime created_at
    }
```

## Notes

- `User` stores authentication and role data for students, tutors, and admins. The `status` field (`ACTIVE|BLOCKED`) allows admins to deactivate accounts.
- `TutorProfile` is linked to a `User` only when the user is a tutor. The `image` field stores a profile photo URL for the tutor catalog.
- `Category` and `TutorCategory` support many-to-many tutor subject tagging.
- `Availability` stores the weekly time windows a tutor is open for bookings, used by the `/tutor/availability` management route.
- `Booking` links a student, tutor, and subject category for a scheduled session.
- `Review` optionally attaches to a completed booking.
- Student and tutor details for a review are derived from the related booking, so no separate student name or student ID field is needed in `Review`.
- Admin accounts should be seeded in the database so the admin role is available from the start.

> Use this file in your portfolio to explain how the database model supports the core app features: tutor discovery, booking, profile management, and reviews.
