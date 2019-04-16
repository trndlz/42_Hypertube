import React from "react";

export class Loader extends React.Component {
	render() {
		return (
			<div className="cs-loader" style={{ height: "100vh" }}>
				<div className="cs-loader-inner">
					<label>●</label>
					<label>●</label>
					<label>●</label>
					<label>●</label>
					<label>●</label>
					<label>●</label>
				</div>
			</div>)

	}
}

export default Loader;