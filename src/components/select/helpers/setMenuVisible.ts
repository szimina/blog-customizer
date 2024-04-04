export const setMenuVisible = (
	bool: boolean,
	classNameBasic: string,
	classNameWhenOpen: string
) => {
	if (bool) {
		return `${classNameBasic} ${classNameWhenOpen}`;
	}
	return classNameBasic;
};
