import { useBookingStore } from '../../stores/bookingStore.ts';
import { useShallow } from 'zustand/react/shallow';
import { z } from 'zod';
import validator from 'validator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface Step2Props {
  onPrevious?: () => void;
  onNext?: () => void;
}
export default function Step3({ onPrevious, onNext }: Step2Props) {
  const { t } = useTranslation('step3');
  const onSubmit = (data) => console.log(data);

  const {
    passengerCount,
    needOrderData,
    needBirth,
    needDoc,
    needDocExpire,
    needCitizenship,
    needGender,
    needMiddlename,
  } = useBookingStore(
    useShallow((state) => ({
      passengerCount: state.passengerCount,
      needOrderData: state.routeThere?.need_orderdata,
      needBirth: state.routeThere?.need_birth,
      needDoc: state.routeThere?.need_doc,
      needDocExpire: state.routeThere?.need_doc_expire_date,
      needCitizenship: state.routeThere?.need_citizenship,
      needGender: state.routeThere?.need_gender,
      needMiddlename: state.routeThere?.need_middlename,
    })),
  );

  const FormSchema = z
    .object({
      email: z.email(),
      phone: z.string().refine((v) => validator.isMobilePhone(v, 'any')),

      name: z.array(z.string().optional()),
      surname: z.array(z.string().optional()),
      birthDate: z.array(z.date().optional()), //posilat string
      docType: z.array(z.enum(['1', '2', '3']).optional()), //posilat string
      docNumber: z.array(z.string().optional()),
      docExpire: z.array(z.date().optional()),
      citizenship: z.array(z.string().optional()),
      gender: z.array(z.enum(['M', 'F']).optional()),
      middlename: z.array(z.string().optional()),
    })
    .superRefine((data, ctx) => {
      //
      // 1️⃣ Birth date validation
      //
      if (needBirth) {
        data.birthDate.forEach((date, i) => {
          if (!date) {
            ctx.addIssue({
              code: 'custom',
              message: 'Birth date is required',
              path: ['birthDate', i],
            });
          }
        });
      }

      if (needOrderData) {
        data.name.forEach((name, i) => {
          if (!name || name.length < 2) {
            ctx.addIssue({
              code: 'custom',
              message: 'Name is required',
              path: ['name', i],
            });
          }
        });

        data.surname.forEach((surname, i) => {
          if (!surname || surname.length < 2) {
            ctx.addIssue({
              code: 'custom',
              message: 'Surname is required',
              path: ['surname', i],
            });
          }
        });
      }

      if (needDoc) {
        data.docNumber.forEach((doc, i) => {
          if (!doc || doc.length < 3) {
            ctx.addIssue({
              code: 'custom',
              message: 'Document number is required',
              path: ['docNumber', i],
            });
          }
        });
        data.docType.forEach((doc, i) => {
          if (!doc) {
            ctx.addIssue({
              code: 'custom',
              message: 'Document type is required',
              path: ['docNumber', i],
            });
          }
        });
      }

      if (needDocExpire) {
        data.docExpire.forEach((exp, i) => {
          if (!exp) {
            ctx.addIssue({
              code: 'custom',
              message: 'Expiration date is required',
              path: ['docExpire', i],
            });
          }
        });
      }

      if (needCitizenship) {
        data.citizenship.forEach((ctz, i) => {
          if (!ctz) {
            ctx.addIssue({
              code: 'custom',
              message: 'Citizenship is required',
              path: ['citizenship', i],
            });
          }
        });
      }

      if (needGender) {
        data.gender.forEach((g, i) => {
          if (!g) {
            ctx.addIssue({
              code: 'custom',
              message: 'Gender is required',
              path: ['gender', i],
            });
          }
        });
      }

      if (needMiddlename) {
        data.middlename.forEach((m, i) => {
          if (!m || m.length < 2) {
            ctx.addIssue({
              code: 'custom',
              message: 'Middle name is required',
              path: ['middlename', i],
            });
          }
        });
      }
    });

  const { register, handleSubmit, form } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  useEffect(() => {
    console.log(passengerCount);
  }, [passengerCount]);
  return (
    <div className="max-w-7xl mx-auto pt-8">
      <button type="button" className="h-6 w-10 bg-blue-400" onClick={onPrevious}>
        Prev
      </button>
      <button type="button" className="h-6 w-10 bg-blue-400" onClick={onNext}>
        Next
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">{t('title')}</CardTitle>
            <input {...register('email')} placeholder={t('email')} />
            <input {...register('phone')} placeholder={t('phone')} />
            <button type={'submit'} form={form} className="w-10 h-10 bg-amber-400"></button>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 mx-auto">
            {needOrderData &&
              Array.from({ length: Number(passengerCount) }).map((_, i) => (
                <Card className=" rounded-2xl shadow-sm border border-gray-100 overflow-hidden bg-stone-100">
                  <CardContent key={i} className="flex justify-between p-6 gap-8">
                    <input {...register(`name.${i}`)} placeholder={t('name')} />
                    <input {...register(`surname.${i}`)} placeholder={t('last_name')} />
                    {}
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
