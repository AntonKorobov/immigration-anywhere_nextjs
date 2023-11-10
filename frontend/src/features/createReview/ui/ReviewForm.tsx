import style from './ReviewForm.module.scss';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { ModalWindow } from '@/shared/ui/modalWindow';
import { Button, Input, Select, SelectItem, Textarea } from '@nextui-org/react';
import { GETLocationGeoDataResponse } from '@/shared/api/server/types';
import { getLocationGeoData } from '@/shared/api/server/getLocationGeoData';
import { AutocompleteSelector } from '@/features/autocompleteSelector';
import { usePostReview } from '@/shared/api/server/usePostReview';
import { Spinner } from '@nextui-org/react';

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
    reset,
    formState: { errors },
  } = useForm<IFormData>({});

  const { postReview, isPostingReview } = usePostReview();
  const [locationGeoData, setLocationGeoData] = useState<GETLocationGeoDataResponse>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);

  async function onSubmit(formData: IFormData) {
    if (locationGeoData.length > 0) {
      const response = await postReview({
        ...formData,
        locationGeoData: { ...locationGeoData[0] },
      });
      if (response.isSuccess) {
        onClose();
        reset();
        setIsSuccessModalOpen(true);
      } else {
        setIsFailModalOpen(true);
      }
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
    <>
      <ModalWindow
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
        title={'Оставить отзыв'}
      >
        <form
          className={style.reviewForm}
          action=""
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register('userName', {
              required: 'Обязательное поле',
              maxLength: {
                value: 15,
                message: 'Максимум 15 символов',
              },
              minLength: {
                value: 2,
                message: 'Минимум 2 символа',
              },
            })}
            type="text"
            label="Имя"
            placeholder="Юля..."
            isInvalid={Boolean(errors.userName)}
            errorMessage={errors.userName?.message}
            labelPlacement={'outside'}
            variant="faded"
            fullWidth={true}
            radius="sm"
          />
          <AutocompleteSelector
            registerForm={register('locationName', {
              required: 'Обязательное поле',
            })}
            data={locationGeoData}
            setData={(searchString) => {
              locationNameInputHandler(searchString);
            }}
            isInvalid={Boolean(errors.locationName)}
            errorMessage={errors.locationName?.message}
            label="Город/Населенный пункт"
            placeholder="Поиск локации"
          />
          <Select
            {...register('rating', {
              required: 'Обязательное поле',
            })}
            label="Рейтинг:"
            placeholder="Выберите рейтинг"
            isInvalid={Boolean(errors.rating)}
            errorMessage={errors.rating?.message}
            labelPlacement="outside"
            radius="sm"
            variant="faded"
            defaultSelectedKeys={'5'}
          >
            {['1', '2', '3', '4', '5'].map((rating) => (
              <SelectItem key={rating} value={rating}>
                {rating}
              </SelectItem>
            ))}
          </Select>
          <Textarea
            {...register('reviewText', {
              required: 'Обязательное поле',
              maxLength: {
                value: 500,
                message: 'Максимум 500 символов',
              },
              minLength: {
                value: 10,
                message: 'Минимум 10 символов',
              },
            })}
            label="Отзыв"
            placeholder="Опишите ваш опыт..."
            isInvalid={Boolean(errors.reviewText)}
            errorMessage={errors.reviewText?.message}
            disableAnimation
            disableAutosize
            classNames={{
              input: 'h-40',
              helperWrapper: 'static mt-1',
            }}
            labelPlacement="outside"
            variant="faded"
          />
          <div className={style.submitButtonWrapper}>
            <Button
              className="style.px-unit-5"
              color="primary"
              type="submit"
              disabled={isPostingReview}
            >
              {isPostingReview ? (
                <>
                  <Spinner color="white" size="sm" />
                  <p>Отправка отзыва</p>
                </>
              ) : (
                'Оставить отзыв'
              )}
            </Button>
          </div>
        </form>
      </ModalWindow>

      <ModalWindow
        title="Что-то пошло не так"
        isOpen={isFailModalOpen}
        onClose={() => setIsFailModalOpen(false)}
      >
        <p>Отзыв не был создан</p>
      </ModalWindow>

      <ModalWindow
        title="Спасибо за отзыв"
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      >
        <p>Отзыв был создан успешно</p>
      </ModalWindow>
    </>
  );
}
