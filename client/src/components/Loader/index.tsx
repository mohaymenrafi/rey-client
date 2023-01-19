import React from "react";
import { Puff } from "react-loader-spinner";
import { theme } from "../../styles/theme";

const Loader = () => {
	return (
		<Puff
			height="80"
			width="80"
			radius={1}
			color={theme.col.darkBlue}
			ariaLabel="puff-loading"
			wrapperStyle={{
				justifyContent: "center",
				padding: "20px ",
				minHeight: "calc(100vh - 398px)",
				alignItems: "center",
			}}
			wrapperClass=""
			visible={true}
		/>
	);
};

export default Loader;
