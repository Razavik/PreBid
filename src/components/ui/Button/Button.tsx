import { FC, ReactNode, MouseEvent } from "react";
import classNames from "classnames";
import styles from "./button.module.css";

export enum ColorButton {
	GREEN = "greenButton",
	BLUE = "blueButton",
}

interface Props {
	colorButton: ColorButton;
	isLarge?: boolean;
	isFullWidth?: boolean;
	children: ReactNode;
	disabled?: boolean;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	type?: "button" | "submit" | "reset";
	style?: {
		fontWeight?: string;
		fontSize?: string;
		padding?: string;
	};
}

const Button: FC<Props> = ({
	colorButton,
	isLarge = false,
	isFullWidth = false,
	children,
	disabled = false,
	onClick,
	type = "button",
	style,
}) => {
	const buttonClass = classNames(styles.button, styles[colorButton], {
		[styles.largeButton]: isLarge,
		[styles.fullWidthButton]: isFullWidth,
	});

	return (
		<button
			style={style}
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
