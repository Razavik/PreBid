import React, { useState } from "react";
import style from "./calculator.module.css";
import Button, { ColorButton } from "@ui/Button/Button";
import closeButton from "@assets/img/icons/closeButton.svg";

interface CalculatorProps {
	isOpen: boolean;
	onClose: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ isOpen, onClose }) => {
	const [bidAmount, setBidAmount] = useState<string>("0");

	if (!isOpen) return null;

	return (
		<div className={style.overlay} onClick={onClose}>
			<div className={style.modal} onClick={(e) => e.stopPropagation()}>
				<button className={style.closeButton} onClick={onClose}>
					<img src={closeButton} alt="Close" />
				</button>
				<h2 className={style.title}>Калькулятор стоимости</h2>
				<div className={style.content}>
					<div className={style.inputGroup}>
						<label>Укажите ставку</label>
						<input
							type="number"
							value={bidAmount}
							onChange={(e) => setBidAmount(e.target.value)}
							min={0}
							step={100}
						/>
						<span className={style.hint}>Минимальный шаг 100$</span>
						<Button colorButton={ColorButton.GREEN} isFullWidth>
							Рассчитать стоимость
						</Button>
					</div>
					<div className={style.totalCostWrapper}>
						<h3>Приблизительная стоимость</h3>
						<div className={style.totalCost}>22000$</div>
					</div>
					<ul className={style.feesList}>
						<li className={style.feeItem}>
							<span>Региональный сбор</span>
							<span>100$</span>
						</li>
						<li className={style.feeItem}>
							<span>Оформление, включая EX</span>
							<span>100$</span>
						</li>
						<li className={style.feeItem}>
							<span>Аукционный сбор</span>
							<span>100$</span>
						</li>
						<li className={style.feeItem}>
							<span>Доставка</span>
							<span>100$</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Calculator;
