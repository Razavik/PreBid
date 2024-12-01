import { FC } from "react";
import FooterUp from "./FooterUp/FooterUp";
import FooterDown from "./FooterDown/FooterDown";
import footerLinks from "./footerLinks.json";
import Container from "@ui/Container/Container";
import style from "./footer.module.css";

const Footer: FC = () => {
	return (
		<footer className={style.footer}>
			<Container>
				<div className={style.footerContent}>
					<FooterUp blockLinks={footerLinks.footerUp} />
					<hr className={style.horline} />
					<FooterDown
						copyright="Copyright"
						socialLinks={footerLinks.footerDown}
					/>
				</div>
			</Container>
		</footer>
	);
};

export default Footer;
