import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleClasses,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [classState, setClass] = useState(
		defaultArticleClasses as CSSProperties
	);

	const applyClassChange = (selected: ArticleStateType) => {
		setClass({
			'--font-family': selected.fontFamilyOption.value,
			'--font-size': selected.fontSizeOption.value,
			'--font-color': selected.fontColor.value,
			'--container-width': selected.contentWidth.value,
			'--bg-color': selected.backgroundColor.value,
		} as CSSProperties);
	};

	return (
		<div className={clsx(styles.main)} style={classState}>
			<ArticleParamsForm applyClassChange={applyClassChange} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
