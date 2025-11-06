import {CardHeader, CardTitle, Card, CardDescription} from "../ui/card.tsx";
import {useBookingStore} from "../../stores/bookingStore.ts";

export default function BookingWizard() {
    const step = useBookingStore((state) => state.step);

    return (
        <div className = 'max-w-4xl mx-auto p-4'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-3xl'>Купить Билет</CardTitle>
                    <CardDescription className='font-light text-md'>
                        Пять шагов, без формы «Откуда/Куда» - только существующие маршруты
                        {step}
                    </CardDescription>

                </CardHeader>
            </Card>
        </div>
    )
}