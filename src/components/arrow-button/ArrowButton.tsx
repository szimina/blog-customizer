import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { setMenuVisible } from '../select/helpers/setMenuVisible';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TArrowButton = {
	onChange: (value: boolean) => void;
	menuStatus: boolean;
};
export const ArrowButton = ({ onChange, menuStatus }: TArrowButton) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={setMenuVisible(
				menuStatus,
				styles.container,
				styles.container_open
			)}
			onClick={() => {
				onChange(!menuStatus);
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={setMenuVisible(menuStatus, styles.arrow, styles.arrow_open)}
			/>
		</div>
	);
};
