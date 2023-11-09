import style from './ReviewForm.module.scss';

import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import clsx from 'clsx';

import { ModalWindow } from '@/shared/ui/modalWindow';
import { Button } from '@nextui-org/button';
import { postReview } from '@/shared/api/server/postReview';
import { GETLocationGeoDataResponse } from '@/shared/api/server/types';
import { getLocationGeoData } from '@/shared/api/server/getLocationGeoData';
import { AutocompleteSelector } from '@/features/autocompleteSelector';

interface IReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IFormData {
  userName: string;
  rating: number;
  reviewText: string;
  locationName: string;
}

export function ReviewForm({ isOpen, onClose }: IReviewFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<IFormData>({});
  const [locationGeoData, setLocationGeoData] = useState<GETLocationGeoDataResponse>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const labelId = useId();

  async function onSubmit(formData: IFormData) {
    setIsLoading(true);
    try {
      //TODO receive list of data and check from it
      if (locationGeoData.length > 0) {
        const response = await postReview({
          ...formData,
          locationGeoData: { ...locationGeoData[0] },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function locationNameInputHandler(inputValue: string) {
    if (inputValue) {
      const data = await getLocationGeoData(inputValue);
      if (data) setLocationGeoData(data);
      else setLocationGeoData([]);
    }
  }

  return (
    <ModalWindow isOpen={isOpen} onClose={onClose} title={'Оставить отзыв'}>
      <form
        className={style.reviewForm}
        action=""
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={style.formGroup}>
          <label htmlFor={labelId + 'name-input'}>{'Имя'}</label>
          <input
            {...register('userName', {
              required: 'Обязательное поле' as unknown as string,
              maxLength: {
                value: 15,
                message: 'Максимум 15 символов' as unknown as string,
              },
              minLength: {
                value: 2,
                message: 'Минимум 2 символа' as unknown as string,
              },
            })}
            type="text"
            placeholder={'Юля...'}
            className={clsx(style.inputElement, style.withCustomFocus)}
            id={labelId + 'name-input'}
          />
        </div>
        <div className={style.errorMessage}>
          {errors?.userName && (
            <p className={style.errorMessageText}>{errors?.userName?.message}</p>
          )}
        </div>
        <AutocompleteSelector
          registerForm={register('locationName', {
            required: 'Обязательное поле' as unknown as string,
          })}
          data={locationGeoData}
          setData={(searchString) => {
            locationNameInputHandler(searchString);
          }}
        />
        <div className={style.errorMessage}>
          {errors?.locationName && (
            <p className={style.errorMessageText}>{errors?.locationName?.message}</p>
          )}
        </div>
        <div className={style.formGroup}>
          <label htmlFor={labelId + 'rating-input'}>Рейтинг:</label>
          <select
            {...register('rating')}
            className={clsx(
              style.inputElement,
              style.inputElementSelect,
              style.withCustomFocus
            )}
            id={labelId + 'rating-input'}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className={style.formGroup}>
          <label htmlFor={labelId + 'review-input'}>Отзывы</label>
          <textarea
            {...register('reviewText', {
              required: 'Обязательное поле' as unknown as string,
              maxLength: {
                value: 500,
                message: 'Максимум 500 символов' as unknown as string,
              },
              minLength: {
                value: 10,
                message: 'Минимум 10 символов' as unknown as string,
              },
            })}
            placeholder={'Опишите ваш опыт...'}
            className={clsx(
              style.inputElement,
              style.reviewFormTextarea,
              style.withCustomFocus
            )}
            id={labelId + 'review-input'}
          />
        </div>
        <div className={style.errorMessage}>
          {errors?.reviewText && (
            <p className={style.errorMessageText}>{errors?.reviewText?.message}</p>
          )}
        </div>
        <Button
          className="style.px-unit-5"
          color="primary"
          type="submit"
          // disabled={!isValid}
        >
          Оставить отзыв
        </Button>
      </form>
    </ModalWindow>
  );
}
