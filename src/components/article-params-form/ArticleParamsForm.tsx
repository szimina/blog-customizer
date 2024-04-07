import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import {
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from '../separator';

import { useRef, useState } from 'react';
import { ArrowButton } from '../arrow-button';
import { Text } from '../text';
import { useClose } from '../select/hooks/useClose';
import clsx from 'clsx';

type TArticleParamsForm = {
	applyClassChange: (selected: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ applyClassChange }: TArticleParamsForm) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const refMenuElement = useRef<HTMLDivElement>(null);
	const [classState, setClass] = useState(defaultArticleState);

	const toggleMenu = (value: boolean) => {
		setIsMenuOpen(value);
	};

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef: refMenuElement,
	});

	const handleFontFamily = (selected: OptionType) => {
		setClass({ ...classState, fontFamilyOption: selected });
	};

	const handleFontSize = (selected: OptionType) => {
		setClass({ ...classState, fontSizeOption: selected });
	};

	const handleFontColor = (selected: OptionType) => {
		setClass({ ...classState, fontColor: selected });
	};

	const handleBackgroundColor = (selected: OptionType) => {
		setClass({ ...classState, backgroundColor: selected });
	};

	const handlecontentWidth = (selected: OptionType) => {
		setClass({ ...classState, contentWidth: selected });
	};

	const setDefault = () => {
		setClass(defaultArticleState);
	};

	const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		applyClassChange(classState);
		setIsMenuOpen(false);
	};

	const resetForm = () => {
		setDefault();
		applyClassChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onChange={toggleMenu} menuStatus={isMenuOpen} />
			<aside
				ref={refMenuElement}
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={submitForm} onReset={resetForm}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						задайте параметры
					</Text>
					<Select
						selected={classState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={handleFontFamily}
					/>
					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={classState.fontSizeOption}
						title='размер шрифта'
						onChange={handleFontSize}></RadioGroup>
					<Select
						selected={classState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={handleFontColor}
					/>
					<Separator />
					<Select
						selected={classState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={handleBackgroundColor}
					/>
					<Select
						selected={classState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={handlecontentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
