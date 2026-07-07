# Bus Booking Frontend

Frontend application for searching bus routes, booking tickets, choosing seats, and managing user tickets.
The app guides a passenger through route search, route selection, passenger details, seat selection, and payment or reservation.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- React Hook Form
- Zod
- Zustand
- Axios
- Tailwind CSS
- Radix UI / custom UI components
- i18next
- Sonner toasts

## Main Features

- Bus route search by departure city, arrival city, date, passenger count, and currency.
- One-way and return-trip booking flow.
- Route selection for outbound and return directions.
- Passenger data form with route-dependent fields.
- Discount and baggage loading for selected routes.
- Seat plan loading and seat selection.
- Order creation, reservation, payment flow, and ticket download.
- User profile with authentication and ticket history.
- Admin helpers for seat management and ticket import export.
- Localized UI with Czech, English, and Ukrainian language support.

## Implemented Work

- Built a multi-step booking wizard from route search to final ticket.
- Integrated booking API calls for points, routes, discounts, baggage, seats, orders, ticket purchase, reservation, and cancellation.
- Added persistent booking and user state with Zustand stores.
- Implemented responsive booking forms and reusable UI components.
- Added passenger discount, baggage, total price, and order summary logic.
- Added profile, login, registration, ticket list, and admin-related screens.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```
