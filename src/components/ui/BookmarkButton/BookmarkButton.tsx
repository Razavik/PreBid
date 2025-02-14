import { FC } from "react";
import style from "./bookmarkbutton.module.css";

interface Props {
	isFavorite: boolean;
	onClick: () => void;
	className?: string;
}

const BookmarkButton: FC<Props> = ({
	isFavorite,
	onClick,
	className = "",
}) => {
	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onClick();
	};

	return (
		<button
			className={`${style.bookmarkButton} ${isFavorite ? style.active : ""} ${className}`}
			onClick={handleClick}
			title={isFavorite ? "Remove from bookmarks" : "Add to bookmarks"}
		>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M5 5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21L12 17.5L5 21V5Z"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</button>
	);
};

export default BookmarkButton;
