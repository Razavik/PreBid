import { FC, useState } from 'react';
import style from './bookmarkbutton.module.css';

interface Props {
    productId: number;
    isBookmarked?: boolean;
    onToggle?: (productId: string, newState: boolean) => void;
    className?: string;
}

const BookmarkButton: FC<Props> = ({ 
    productId, 
    isBookmarked = false, 
    onToggle,
    className = '' 
}) => {
    const [isMarked, setIsMarked] = useState(isBookmarked);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newState = !isMarked;
        setIsMarked(newState);
        if (onToggle) {
            onToggle(productId.toString(), newState);
        }
    };

    return (
        <button 
            className={`${style.bookmarkButton} ${isMarked ? style.active : ''} ${className}`}
            onClick={handleClick}
            title={isMarked ? "Remove from bookmarks" : "Add to bookmarks"}
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
