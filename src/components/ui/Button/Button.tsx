import { FC, ReactNode, MouseEvent } from "react";
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
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	type?: "button" | "submit" | "reset";
}

const Button: FC<Props> = ({
	colorButton,
	isLarge = false,
	children,
	paddingStyle,
	disabled = false,
	onClick,
	type = "button",
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
			type={type}
		>
			{children}
		</button>
	);
};

export default Button;
