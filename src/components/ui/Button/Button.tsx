import { FC, ReactNode } from "react";
import classNames from "classnames"; // Рекомендуется использовать эту библиотеку для управления классами
import classes from "./button.module.css";

export enum ColorButton {
	GREEN = "greenButton",
	BLUE = "blueButton",
}

interface Props {
	colorButton: ColorButton;
	isLarge?: boolean;
	children: ReactNode;
	paddingStyle?: {
		topBottom: number;
		leftRight: number;
	};
	disabled?: boolean;
	onClick?: () => void;
}

const Button: FC<Props> = ({
	colorButton,
	isLarge = false,
	children,
	paddingStyle,
	disabled = false,
	onClick,
}) => {
	const buttonClass = classNames(classes.button, classes[colorButton], {
		[classes.largeButton]: isLarge,
	});

	const stylePadding = paddingStyle
		? { padding: `${paddingStyle.topBottom}px ${paddingStyle.leftRight}px` }
		: undefined;

	return (
		<button
			style={stylePadding}
			onClick={onClick}
			className={buttonClass}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
