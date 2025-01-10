import { FC } from "react";
import styles from "./AuctionItems.module.css";

interface AuctionItemsProps {
    results: number;
}

export const AuctionItems: FC<AuctionItemsProps> = ({ results }) => {
    return (
        <div className={styles.auctionItems}>
            {results === 0 ? (
                <p className={styles.noResults}>Аукционы не найдены</p>
            ) : null}
        </div>
    );
};
