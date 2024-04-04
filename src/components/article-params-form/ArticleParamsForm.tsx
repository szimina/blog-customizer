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
} from 'src/constants/articleProps';
import { Separator } from '../separator';

import { useRef, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { ArrowButton } from '../arrow-button';
import { setMenuVisible } from '../select/helpers/setMenuVisible';

type TArticleParamsForm = {
	applyClassChange: (selected: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ applyClassChange }: TArticleParamsForm) => {
	const [isOpen, setMenu] = useState(false);
	const refMenuElement = useRef<HTMLDivElement>(null);
	const [classState, setClass] = useState(defaultArticleState);

	const toggleMenu = (value: boolean) => {
		setMenu(value);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: refMenuElement,
		onChange: setMenu,
	});

	const handleClassChange = (selected: Partial<ArticleStateType>) => {
		setClass({ ...classState, ...selected });
	};

	const setDefault = () => {
		setClass(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onChange={toggleMenu} menuStatus={isOpen} />
			<aside
				ref={refMenuElement}
				className={setMenuVisible(
					isOpen,
					styles.container,
					styles.container_open
				)}>
				<form className={styles.form}>
					<h2 className={styles.header}>задайте параметры</h2>
					<div
						style={{
							height: 50,
						}}></div>
					<Select
						selected={classState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={(value) => handleClassChange({ fontFamilyOption: value })}
					/>
					<div
						style={{
							height: 50,
						}}></div>

					<RadioGroup
						name='размер шрифта'
						options={fontSizeOptions}
						selected={classState.fontSizeOption}
						title='размер шрифта'
						onChange={(value) =>
							handleClassChange({ fontSizeOption: value })
						}></RadioGroup>
					<div
						style={{
							height: 50,
						}}></div>
					<Select
						selected={classState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={(value) => handleClassChange({ fontColor: value })}
					/>
					<div
						style={{
							height: 50,
						}}></div>

					<Separator />
					<div
						style={{
							height: 50,
						}}></div>

					<Select
						selected={classState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={(value) => handleClassChange({ backgroundColor: value })}
					/>
					<div
						style={{
							height: 50,
						}}></div>

					<Select
						selected={classState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(value) => handleClassChange({ contentWidth: value })}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => {
								setDefault();
								applyClassChange(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							type='button'
							onClick={() => {
								applyClassChange(classState);
								setMenu(false);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
