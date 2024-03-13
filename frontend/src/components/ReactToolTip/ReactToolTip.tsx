import React from 'react';
import './ReactToolTip.css';

interface ReactToolTipProps {
	title?: string;
	children?: React.ReactNode;
	position?: string;
	containerClass?: string;
	theme?: string;
	isDom?: boolean;
	widthRef?: number | null;
}

const ReactToolTip: React.FC<ReactToolTipProps> = ({
	title = 'sample',
	children = <div />,
	position = 'bottom',
	containerClass = '',
	theme = 'light',
	isDom,
	widthRef = 0,
}) => {
	let newPosition = position === 'right' ? 'left' : 'right';
	const style: React.CSSProperties = {
		[newPosition]: widthRef ? `${widthRef + 10}px` : '',
	};

	return (
		<div className={`tooltip ${containerClass}`}>
			{children}
			<div
				style={style}
				className={`tooltiptext ${
					theme === 'dark' ? 'dark' : 'light'
				} tooltip-${position}`}
			>
				{isDom ? (
					<div className="title" dangerouslySetInnerHTML={{ __html: title }} />
				) : (
					title
				)}
				{/* <span className="arrow"></span> */}
			</div>
		</div>
	);
};

export default ReactToolTip;

/* 
<ReactToolTip theme="dark" position="right">
              <a
                href="http://google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                inline text
              </a>
            </ReactToolTip>
*/
