import {CardHeader, CardTitle, Card, CardDescription, CardContent} from "../ui/card.tsx";
import {useBookingStore} from "../../stores/bookingStore.ts";
import {Step} from "../../types/step.ts";
import {Stepper} from "../partials/Stepper.tsx";
import Step1 from "../booking/Step1.tsx";

export default function BookingWizard() {
    const step = useBookingStore((state) => state.step);
    const steps: Step[] = [
        { id: "route", label: "Маршрут" },
        { id: "date", label: "Дата и рейс" },
        { id: "passengers", label: "Пассажиры" },
        { id: "seats", label: "Места" },
        { id: "payment", label: "Оплата" },
    ];

    return (
        <div className = 'max-w-[100rem] mx-auto p-4'>
            <Card>
                <CardHeader>
                    <CardTitle className='text-3xl'>Купить Билет</CardTitle>
                    <CardDescription className='font-light text-md'>
                        Пять шагов, без формы «Откуда/Куда» - только существующие маршруты
                        {step}
                    </CardDescription>
                    <CardContent className='mt-12 px-0'>
                        <Stepper steps={steps} current={step}/>
                        <Step1/>
                    </CardContent>

                </CardHeader>
            </Card>
        </div>
    )
}