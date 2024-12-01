import { FC } from "react";
import style from "./footerdown.module.css";

interface FooterDownInfo {
	copyright: string;
	socialLinks: {
		path: string;
		links: {
			href: string;
			file: string;
		}[];
	};
}

const FooterDown: FC<FooterDownInfo> = ({ copyright, socialLinks }) => {
	return (
		<div className={style.footerDown}>
			<p>{copyright}</p>
			<ul className={style.socialMenu}>
				{socialLinks.links.map((link) => (
					<li>
						<a href={link.href}>
							<img
								src={socialLinks.path + link.file}
								alt="social"
							/>
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FooterDown;
