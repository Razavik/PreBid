import { FC, Fragment } from "react";
import style from "./footerup.module.css";

interface BlockLinks {
	id: string;
	title: string;
	links: {
		href: string;
		desc: string;
	}[];
}

interface Links {
	blockLinks: BlockLinks[];
}

const FooterUp: FC<Links> = ({ blockLinks }) => {
	return (
		<div className={style.footerUp}>
			{blockLinks.map((block, index) => (
				<Fragment key={block.id}>
					<div className={style.block}>
						<p>{block.title}</p>
						<ul>
							{block.links.map((link, indexLink) => (
								<li key={block.id + "-" + indexLink}>
									<a href={link.href}>{link.desc}</a>
								</li>
							))}
						</ul>
					</div>
					{index < blockLinks.length - 1 && (
						<hr className={style.vertLine} />
					)}
				</Fragment>
			))}
		</div>
	);
};

export default FooterUp;
