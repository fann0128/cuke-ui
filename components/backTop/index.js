import React from "react";
import PropTypes from "prop-types";
import cls from "classnames";

import { UpIcon } from "../icon";
import "./styles.less";

const scrollToTop = () => {
	const c = document.documentElement.scrollTop || document.body.scrollTop;
	if (c > 0) {
		window.requestAnimationFrame(scrollToTop);
		document.body.scrollTop = c - c / 8;
		document.documentElement.scrollTop = c - c / 8;
	}
};

export default class BackTop extends React.PureComponent {
	state = {
		visible: false
	};
	static propsTypes = {
		prefixCls: PropTypes.string.isRequired,
		visibilityHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		onClick: PropTypes.func
	};
	static defaultProps = {
		prefixCls: "cuke-back-top",
		visibilityHeight: 400,
		onClick: () => {}
	};
	onClick = () => {
		this.props.onClick();
		scrollToTop();
	};
	constructor(props) {
		super(props);
	}
	render() {
		const { visible } = this.state;
		const {
			className,
			prefixCls,
			visibilityHeight,
			children,
			...attr
		} = this.props;

		return (
			<div
				className={cls(prefixCls, className, {
					[`${prefixCls}-open`]: visible,
					[`${prefixCls}-close`]: !visible
				})}
				{...attr}
			>
				<div className={`${prefixCls}-inner`} onClick={this.onClick}>
					{children || (
						<div className={`${prefixCls}-inner-icon`}>
							<UpIcon />
						</div>
					)}
				</div>
			</div>
		);
	}
	bindScroll = () => {
		if (window.onscroll) {
			window.onscroll();
		} else {
			const c = document.documentElement.scrollTop || document.body.scrollTop;
			this.setState({ visible: c >= this.props.visibilityHeight });
		}
	};
	componentDidMount() {
		window.addEventListener("scroll", this.bindScroll);
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.bindScroll);
	}
}